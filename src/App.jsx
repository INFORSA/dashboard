import './App.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebars from './components/organisms/Sidebars';
import Navbars from './components/organisms/Navbars';
import Footers from './components/organisms/Footers';
import { Bars3Icon } from '@heroicons/react/24/solid';
import AppRoutes from './route/AppRoutes';
import { useGetCurrentUserQuery } from './services/login';
import MiniSidebars from './components/organisms/MiniSidebars';
import { Tooltip } from '@material-tailwind/react';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const {data} = useGetCurrentUserQuery();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      <ToastContainer position="top-right" autoClose={3000} />
      {!isLoginPage && (isOpen ? <Sidebars isOpen={isOpen} /> : <MiniSidebars role={data.role} onToggleOpen={()=>setIsOpen(true)}/>)}

      <div className="flex-1 flex flex-col">
        {!isLoginPage && (
          <div className={`backdrop-blur-md bg-white/50 flex justify-between border border-[#282666] shadow shadow-md sticky top-0 z-10 ${isOpen === true ? '' : 'ml-16'}`}>
            <Tooltip content={isOpen === true ? 'Minimize Sidebar' : 'Expand Sidebar'} placement="right">
              <button onClick={toggleSidebar} className="mx-0 lg:mx-5 hidden lg:block hover:bg-blue-100 px-3 my-5 rounded-lg">
                <Bars3Icon className={`w-5 h-5 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-90' : ''}`} />
              </button>
            </Tooltip>
            <Navbars />
          </div>
        )}

        <div className={`max-w-[900px] lg:max-w-[1060px] min-w-full min-h-[70vh] ${isLoginPage ? '' : (isOpen === true ? 'px-12 mt-3' : 'pl-36 pr-20 mt-3')}`}>
          <AppRoutes isSidebarOpen={isOpen} login={data} />
        </div>

        <div className={`${isOpen === true ? '' : 'pl-16'}`}>
          {!isLoginPage && <Footers />}
        </div>
      </div>
    </div>
  );
}

export default App;