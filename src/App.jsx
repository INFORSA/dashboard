import './App.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebars from './components/organisms/Sidebars';
import Navbars from './components/organisms/Navbars';
import Footers from './components/organisms/Footers';
import { Bars3Icon } from '@heroicons/react/24/solid';
import AppRoutes from './route/AppRoutes';
import { useGetCurrentUserQuery } from './services/login';

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const {data} = useGetCurrentUserQuery();
  
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {!isLoginPage && <Sidebars isOpen={isOpen} />}

      <div className="flex-1 flex flex-col">
        {!isLoginPage && (
          <div className="backdrop-blur-md bg-white/50 flex justify-between border mx-3 my-1 rounded-md border-[#282666] shadow shadow-md sticky top-0 z-10">
            <button onClick={toggleSidebar} className="mx-0 lg:mx-5 hidden lg:block">
              <Bars3Icon className={`w-5 h-5 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-90' : ''}`} />
            </button>
            <Navbars />
          </div>
        )}

        <div className={`max-w-[900px] lg:max-w-[1060px] min-w-full min-h-[70vh] ${isLoginPage ? '' : 'p-3'}`}>
          <AppRoutes isSidebarOpen={isOpen} login={data} />
        </div>

        {!isLoginPage && <Footers />}
      </div>
    </div>
  );
}

export default App;