import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CloudinaryContext, Image } from 'cloudinary-react';

const Register = () => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    age: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'notify'); // Replace 'your_upload_preset' with your actual Cloudinary upload preset
    setLoading(true);
    axios.post('https://api.cloudinary.com/v1_1/prafulfuse/image/upload', formData)
      .then(res => {
        setProfilePhoto(res.data.secure_url);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userData = { ...user, profilePhoto };
      const response = await axios.post(
        'http://localhost:5000/api/v1/user/register',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setUser({
        username: '',
        email: '',
        age: '',
        password: '',
      });
      localStorage.setItem("userToken", JSON.stringify(response))
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
    <div className='flex p-12 h-screen' title='Register'>
      <div className='container p-2 justify-center items-center max-w-md mx-auto xl:max-w-5xl h-full flex  bg-white rounded-lg shadow overflow-hidden'>
        <div className='relative hidden xl:block xl:w-2/3 h-full'>
          <img
            className='absolute h-full w-full object-cover'
            src='https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?w=740&t=st=1715323149~exp=1715323749~hmac=122dd64d90125d23d96687e73eda9f31b7064e6a2173a5c10addc73aae4e08a1'
            alt='myxoma'
          />
        </div>
        <div className='w-full xl:w-3/4 p-16'>
          <form onSubmit={handleSubmit}>
            <h1 className='text-3xl text-slate-700 font-bold'>Register Your account</h1>
            <div>
              <span className='text-gray-600 text-sm'>Already have an account?</span> &nbsp;
              <Link to='/login' className='text-gray-700 text-sm font-semibold'>
                login Now
              </Link>
            </div>
            <div className='mb-4 mt-4 flex items-center justify-center space-x-6'>
              <div className='shrink-0'>
                <input
                  onChange={handleImageUpload}
                  type='file'
                  accept='image/*'
                  id='profilePhoto'
                  className='h-16 w-16 object-cover cursor-pointer rounded-full'
                  alt='Current profile photo'
                />
              </div>
            </div>
            <div className='mb-4 mt-4'>
              <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='username'>
                Username
              </label>
              <input
                onChange={handleChange}
                value={user.username}
                className='text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10'
                id='username'
                type='text'
                placeholder='Your Username'
              />
            </div>
            <div className='mb-4 mt-4'>
              <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='email'>
                Email
              </label>
              <input
                onChange={handleChange}
                value={user.email}
                className='text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10'
                id='email'
                type='email'
                placeholder='Your email address'
              />
            </div>
            <div className='mb-4 mt-4'>
              <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='age'>
                Age
              </label>
              <input
                onChange={handleChange}
                value={user.age}
                className='text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10'
                id='age'
                type='text'
                placeholder='Your Age'
              />
            </div>
            <div className='mb-6 mt-4'>
              <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='password'>
                Password
              </label>
              <input
                onChange={handleChange}
                value={user.password}
                className='text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10'
                id='password'
                type='password'
                placeholder='Your password'
              />
            </div>
            <div className='flex w-full mt-8'>
              <button
                className='w-full bg-gray-800 hover:bg-gray-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10'
                type='submit'
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
