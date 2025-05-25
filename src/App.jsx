import './App.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebars from './components/organisms/Sidebars';
import Navbars from './components/organisms/Navbars';
import Footers from './components/organisms/Footers';
import { Bars3Icon } from '@heroicons/react/24/solid';
import AppRoutes from './route/AppRoutes';

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {!isLoginPage && <Sidebars isOpen={isOpen} />}

      <div className="flex-1 flex flex-col">
        {!isLoginPage && (
          <div className="flex justify-between sticky top-0 z-10 bg-white">
            <button onClick={toggleSidebar} className="mx-0 lg:mx-5 hidden lg:block">
              <Bars3Icon className={`w-5 h-5 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-90' : ''}`} />
            </button>
            <Navbars />
          </div>
        )}

        <div className={`min-h-[70vh] ${isLoginPage ? '' : 'p-3'}`}>
          <AppRoutes isSidebarOpen={isOpen} />
        </div>

        {!isLoginPage && <Footers />}
      </div>
    </div>
  );
}

export default App;