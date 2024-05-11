import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Logout from './Pages/Logout';
const App = () => {
  return (
    <>
        <div className='bg-slate-100'>
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
          <Footer/>
      </BrowserRouter>
        </div>
    </>
  )
}

export default App