import React from 'react'
import { Link } from 'react-router-dom'
import { TfiWrite } from "react-icons/tfi";
const Home = () => {
  document.title
  return (
    <>
      <div title='Home' className='bg-gradient-to-r to-white from-slate-300 h-screen w-screen pt-16 flex'>
        <div className='sm:w-full md:w-[65%] p-24 '>
          <h1 className='flex items-center text-5xl font-bold gap-3 text-blue-900'><TfiWrite /><span className='text-blue-600'>Notify</span></h1>
          <h2 className='mt-7 text-3xl font-semibold text-slate-800'>Save Your Ideas Easily</h2>
          <p className='mt-7 text-xl'>Welcome to our note-saving app, your digital sanctuary for ideas. Streamline your thoughts, elevate your productivity, and organize with ease. Say hello to organized brilliance.</p>
          <div className='flex mt-7'>
            <Link className='bg-blue-700 rounded-2xl border p-4 text-lg px-8 m-2 text-white hover:bg-blue-300 hover:text-slate-900' to='/login'>Login</Link>
            <Link className='bg-blue-700 rounded-2xl border p-4 text-lg px-5 m-2 text-white hover:bg-blue-300 hover:text-slate-900' to='/register'>Register</Link>
          </div>
          <div className="mt-7 m-6 ">
            <ul className='list-disc'>
              <li className='mt-1 font-semibold'>Capture, Organize, Simplify: Your ultimate notes companion.</li>
              <li className='mt-1 font-semibold'>Transforming ideas into organized brilliance, one note at a time.</li>
              <li className='mt-1 font-semibold'>Empower your productivity with our intuitive note-taking solution.</li>
              <li className='mt-1 font-semibold'>Welcome to your digital notepad: Where ideas find their home.</li>
              <li className='mt-1 font-semibold'>Unlock the power of your thoughts with our seamless note-saving experience.</li>
              <li className='mt-1 font-semibold'>Elevate your note-taking game with our user-friendly interface.</li>
            </ul>

          </div>
        </div>
        <div className='sm:w-0 lg:w-[35%] '>
          <img className='h-full' src="https://img.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg?t=st=1715407915~exp=1715411515~hmac=17dcd6a33d780d9713bce1d1051de3222854fbebe477ce6c239c7e56e93504e5&w=740" alt="homeImage" />
        </div>
      </div>
    </>
  )
}

export default Home