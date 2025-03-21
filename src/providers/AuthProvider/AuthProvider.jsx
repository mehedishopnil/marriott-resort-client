import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import Swal from "sweetalert2";

// Create AuthContext
export const AuthContext = createContext();

// Initialize Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // State variables
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hotelData, setHotelData] = useState([]);
  const [hotelListData, setHotelListData] = useState([]);
  const [earningList, setEarningList] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [allUsersData, setAllUsersData] = useState([]);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Fetch specific user data from the backend
        fetch(`${import.meta.env.VITE_API_Link}/users?email=${currentUser.email}`)
          .then(async (res) => {
            if (!res.ok) {
              const responseText = await res.text();
              console.error(
                `Error fetching user: ${responseText}, Status: ${res.status}`
              );
              if (res.status === 404) {
                setUser(null); // User not found
              } else {
                throw new Error(`Unexpected response: ${res.status}`);
              }
            }
            return res.json();
          })
          .then((userData) => {
            setUser(userData[0]); // Update state with backend user data
          })
          .catch((error) => console.error("Failed to fetch user data:", error));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  // Login with email and password
  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const signedInUser = userCredential.user;

      // Fetch specific user data from backend based on email
      const userDataResponse = await fetch(
        `${import.meta.env.VITE_API_Link}/users?email=${email}`
      );
      if (!userDataResponse.ok) {
        throw new Error("Failed to fetch user data from backend");
      }

      const userData = await userDataResponse.json();
      if (userData.length > 0) {
        setUser(userData[0]);
      } else {
        console.error("No user data found for the email:", email);
      }

      // Show success alert
      Swal.fire({
        title: "Successfully Signed In",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });

      return userCredential;
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Create user and send data to backend
  const createUser = async (name, email, password, membership) => {
    setLoading(true);
    try {
      // Check if user already exists in the backend
      const userExistsResponse = await fetch(
        `${import.meta.env.VITE_API_Link}/users?email=${email}`
      );

      if (userExistsResponse.status === 404) {
        console.log("User not found, proceeding with registration");
      } else if (!userExistsResponse.ok) {
        throw new Error("Failed to check if user exists");
      } else {
        const userExistsData = await userExistsResponse.json();
        if (userExistsData.length > 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You are already registered",
          });
          return; // Stop the registration process
        }
      }

      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const createdUser = userCredential.user;

      // Send user data to backend
      const backendResponse = await fetch(
        `${import.meta.env.VITE_API_Link}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            membership,
          }),
        }
      );

      if (!backendResponse.ok) {
        throw new Error("Failed to send user data to backend");
      }

      Swal.fire({
        title: "Successfully Registered",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });

      // Fetch specific user data from backend based on email
      const userDataResponse = await fetch(
        `${import.meta.env.VITE_API_Link}/users?email=${email}`
      );
      if (!userDataResponse.ok) {
        throw new Error("Failed to fetch user data from backend");
      }
      const userData = await userDataResponse.json();

      if (userData.length > 0) {
        setUser(userData[0]);
      } else {
        console.error("No user data found after registration for email:", email);
      }

      return userCredential;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if the user already exists in the backend
      const userExistsResponse = await fetch(
        `${import.meta.env.VITE_API_Link}/users?email=${user.email}`
      );

      if (userExistsResponse.status === 404) {
        console.log("User not found, creating new user");

        // User does not exist, send user data to backend
        const backendResponse = await fetch(
          `${import.meta.env.VITE_API_Link}/users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: user.displayName || "", // Use displayName if available
              email: user.email,
              photoURL: user.photoURL,
            }),
          }
        );

        if (!backendResponse.ok) {
          const errorText = await backendResponse.text();
          console.error(
            `Failed to update backend data with Google user: ${backendResponse.status} ${backendResponse.statusText}`
          );
          console.error("Response text:", errorText);
          throw new Error("Failed to update backend data with Google user");
        }

        // Set user state with new user data
        const newUser = {
          name: user.displayName || "",
          email: user.email,
          photoURL: user.photoURL,
        };
        setUser(newUser);

        console.log("New user signed up with Google:", user);
      } else if (userExistsResponse.ok) {
        const userExistsData = await userExistsResponse.json();

        if (userExistsData.length > 0) {
          // User exists, set user state with fetched userData
          setUser(userExistsData[0]);
          console.log("User logged in with Google:", user);
        } else {
          console.log(
            "Unexpected response: User not found but status is not 404"
          );
        }
      } else {
        const errorText = await userExistsResponse.text();
        console.error(
          `Failed to check if user exists: ${userExistsResponse.status} ${userExistsResponse.statusText}`
        );
        console.error("Response text:", errorText);
        throw new Error("Failed to check if user exists");
      }

      return result;
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out process
  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch hotel data
  useEffect(() => {
    const fetchHotelData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_Link}/hotel-data`
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching hotelData.json: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setHotelData(data);
      } catch (error) {
        console.error("Error fetching hotelData.json:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, []);

  // Fetch users data
  useEffect(() => {
    const fetchUsersData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_Link}/users`);
        if (!response.ok) {
          throw new Error(
            `Error fetching users data: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setUsersData(data);
      } catch (error) {
        console.error("Error fetching users data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  // Fetch hotel list data
  useEffect(() => {
    const fetchHotelListData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_Link}/hotels-list`
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching hotelListData.json: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setHotelListData(data);
      } catch (error) {
        console.error("Error fetching hotelListData.json:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelListData();
  }, []);

  // Fetch earning list
  useEffect(() => {
    const fetchEarningList = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_Link}/all-earnings`
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching earningList.json: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setEarningList(data);
      } catch (error) {
        console.error("Error fetching earningList.json:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEarningList();
  }, []);

  // Context value
  const authInfo = {
    user,
    hotelData,
    hotelListData,
    loading,
    earningList,
    usersData,
    allUsersData,
    login,
    createUser,
    googleLogin,
    signOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;