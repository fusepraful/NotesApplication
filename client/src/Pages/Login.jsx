import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // Check if userToken exists in localStorage, if so, navigate to home page
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:5000/api/v1/user/login',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setUser({
        email: '',
        password: '',
      });
      localStorage.setItem("userToken", response.data.token); // Assuming token is in response.data
      navigate('/');
      toast.success(response.data.msg);
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log('Internal Server Error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex p-28 h-screen'>
        <div className="container p-2 justify-center items-center max-w-md mx-auto xl:max-w-4xl h-full flex  bg-white rounded-lg shadow overflow-hidden">
          <div className="relative hidden xl:block xl:w-1/2 h-full">
            <img
              className="absolute h-full w-full object-cover"
              src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740&t=st=1715322206~exp=1715322806~hmac=47735770f602580c381fa32c3a40f2c7f9c518e094ac6c956127e9aa4aaf6844"
              alt="my zomato"
            />
          </div>
          <div className="w-full xl:w-1/2 p-8">
            <form onSubmit={handleSubmit}>
              <h1 className="text-3xl text-slate-700 font-bold">Login in to your account</h1>
              <div>
                <span className="text-gray-600 text-sm">Don't have an account?</span> &nbsp;
                <Link to='/register' className="text-gray-700 text-sm font-semibold">Register Now</Link>
              </div>
              <div className="mb-4 mt-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="email"
                  type="text"
                  placeholder="Your email address"
                />
              </div>
              <div className="mb-6 mt-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="password"
                  type="password"
                  placeholder="Your password"
                />
              </div>
              <div className="flex w-full mt-8">
                <button
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
