import './App.css'
import Sidebars from './components/organisms/Sidebars'
import Navbars from './components/organisms/Navbars'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import Departement from './pages/dept/Departement'
import Login from './pages/login/Login'
import React, { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/solid'
import Footers from './components/organisms/Footers'

function App() {
  React.useEffect(() => {
    checkTokenValidity();
    window.scrollTo(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  const isLoggedIn = localStorage.getItem("token") !== null;
  const checkTokenValidity = () => {
      const storedToken = localStorage.getItem('expiredTime');
      if (isLoggedIn) {
          if (storedToken && Date.now() > parseInt(storedToken)) {
              localStorage.removeItem('token');
              localStorage.removeItem('expiredTime');
          }
      }
  };
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const isLoginOrRegister = location.pathname === '/Login' || location.pathname === '/login';
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=''>
      <div className={`flex  ${isOpen ? '': 'justify-between '}`}>
        {!isLoginOrRegister &&
          <Sidebars isOpen={isOpen}/>
        }
        <div className='flex-1 flex flex-col'>
          <div className='flex justify-between sticky top-0 z-10 bg-white rounded-none'>
            <button onClick={toggleSidebar} className='mx-5'>
              <Bars3Icon className='w-5 h-5'/>
            </button>
            <Navbars/>
          </div>
          <div className='p-3'>
            <Routes>
              <Route index path='/' element={<Dashboard isSidebarOpen={isOpen}/>}/>
              <Route path='/*' element={<Navigate to='/'/>}/>
              <Route path='*' element={<Navigate to='/'/>}/>
              {isLoggedIn ? 
              <>
                <Route path="/dept/:Name" element={<Departement/>}/>
              </>
              :
              <>
                <Route path="/login" element={<Login/>}/>
              </>}
            </Routes>
          </div>
          <Footers/>
        </div>
      </div>
    </div>
  )
}

export default App
