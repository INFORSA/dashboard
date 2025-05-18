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
import Upload from './pages/penilaian/Upload'
import AddStaff from './pages/permission/user/AddStaff'
import User from './pages/permission/user/User'
import AddAdmin from './pages/permission/user/AddAdmin'
import Role from './pages/permission/role/Role'
import AddRole from './pages/permission/role/AddRole'
import EditRole from './pages/permission/role/EditRole'

function App() {
  React.useEffect(() => {
    checkTokenValidity();
    window.scrollTo(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  const isLoggedIn = localStorage.getItem("token") !== null;
  const checkTokenValidity = () => {
      const storedToken = localStorage.getItem('expirationTime');
      if (!isLoggedIn) return;
      const expMillis =
        storedToken && isNaN(storedToken)
          ? new Date(storedToken).getTime()
          : parseInt(storedToken, 10);    
      if (storedToken && Date.now() > expMillis) {
          localStorage.removeItem('token');
          localStorage.removeItem('expiredTime');
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
            {!isLoginOrRegister && 
            <>
              <button onClick={toggleSidebar} className='mx-5'>
                <Bars3Icon className={`w-5 h-5 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90" : ""}`}/>
              </button>
              <Navbars/>
            </>
            }
          </div>
          <div className={`min-h-[70vh] ${isLoginOrRegister ? '' : 'p-3'}`}>
            <Routes>
              <Route path='/*' element={<Navigate to='/'/>}/>
              <Route path='*' element={<Navigate to='/'/>}/>
              {isLoggedIn ? 
              <>
                <Route index path='/' element={<Dashboard isSidebarOpen={isOpen}/>}/>
                <Route path="/dept/:Name" element={<Departement/>}/>
                <Route path='/upload' element={<Upload/>}/>

                <Route path='/permission/user' element={<User/>}/>
                <Route path='/permission/user/add-admin' element={<AddAdmin/>}/>
                <Route path='/permission/user/add-staff' element={<AddStaff/>}/>
                
                <Route path='/permission/role' element={<Role/>}/>
                <Route path='/permission/role/add' element={<AddRole/>}/>
                <Route path='/permission/role/edit/:id' element={<EditRole/>}/>
              </>
              :
              <>
                <Route path='/' element={<Navigate to='/login'/>}/>  
                <Route path="/login" element={<Login/>}/>
              </>}
            </Routes>
          </div>
          {!isLoginOrRegister && 
            <Footers/>
          }
        </div>
      </div>
    </div>
  )
}

export default App
