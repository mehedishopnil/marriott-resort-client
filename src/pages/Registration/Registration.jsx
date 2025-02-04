import  { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';

const Registration = () => {
  const { registration } = useContext(AuthContext);
  const navigate = useNavigate(); // For redirecting after registration

  // State for form inputs
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call registration function from AuthContext
      await registration(email, password);
      // Redirect to another page after successful registration
      navigate('/login'); // Redirect to login page or another page as needed
    } catch (error) {
      // Handle registration error with user feedback
      console.error('Registration failed:', error);
      setError('Registration failed. Please check your details and try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-base-100">
      <div className="hero w-full h-auto p-10 rounded bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-center text-2xl font-bold pt-4">Register Now</h1>

            <form onSubmit={handleSubmit} className="card-body">
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="input your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    placeholder="input your photo url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered"
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-500 mt-2 text-center">
                    {error}
                  </div>
                )}

                <div className="form-control mt-6">
                  <input
                    type="submit"
                    value="Register"
                    className="btn bg-[#D1A054] text-white hover:bg-[#b18441]"
                  />
                </div>
                <p className="text-center">
                  Already have an account? Please{" "}
                  <Link
                    to="/login"
                    className="font-bold text-[#D1A054]"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <div className="text-center lg:text-left">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;