import { createContext, useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase/firebase.config";

// Create AuthContext
export const AuthContext = createContext();

// Initialize Firebase Auth
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  // State variables
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hotelData, setHotelData] = useState([]);
  const [hotelListData, setHotelListData] = useState([]);
  const [earningList, setEarningList] = useState([]);
  const [usersData, setUsersData] = useState([]);


  // Fetch hotel data
  useEffect(() => {
    const fetchHotelData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_Link}/hotel-data`);
        if (!response.ok) {
          throw new Error(`Error fetching hotelData.json: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setHotelData(data);
      } catch (error) {
        console.error('Error fetching hotelData.json:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, []);


  // Fetch users data
  useEffect(() => {
    const fetchHotelData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_Link}/users`);
        if (!response.ok) {
          throw new Error(`Error fetching hotelData.json: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setUsersData(data);
      } catch (error) {
        console.error('Error fetching UsersData.json:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, []);

  // Fetch hotel list data
  useEffect(() => {
    const fetchHotelListData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_Link}/hotels-list`);
        if (!response.ok) {
          throw new Error(`Error fetching hotelListData.json: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setHotelListData(data);
      } catch (error) {
        console.error('Error fetching hotelListData.json:', error.message);
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
        const response = await fetch(`${import.meta.env.VITE_API_Link}/all-earnings`);
        if (!response.ok) {
          throw new Error(`Error fetching earningList.json: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setEarningList(data);
      } catch (error) {
        console.error('Error fetching earningList.json:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEarningList();
  }, []);

  // Registration and login functions
  const registration = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const login = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.error('Login failed:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Create user placeholder (can be removed or replaced as needed)
  useEffect(() => {
    if (loading) {
      const createUser = () => {
        const user = "Mehedi Hasan";
        setUser(user);
      };

      createUser();
    }
  }, [loading]);

  // Context value
  const authInfo = {
    user,
    hotelData,
    hotelListData,
    loading,
    earningList,
    usersData,
    login,
    registration,
    
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;