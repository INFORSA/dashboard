import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { HomeIcon, ClockIcon, CalendarIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { useGetCurrentUserQuery, useLogoutMutation } from "../../services/login";
 
export default function Navbars() {
  const [logout] = useLogoutMutation();
  const { data } = useGetCurrentUserQuery();
  const [openNav, setOpenNav] = React.useState(false);
  const [profileDropdown, setProfileDropdown] = React.useState(false);
  const isLoggedIn = localStorage.getItem("token") !== null;

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown-container')) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logOut = () => {
    setProfileDropdown(false);
    Swal.fire({
      title: "Are you sure to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          await logout().unwrap();
        
          Swal.fire({
            title: "Logout Success",
            icon: "success",
          }).then(()=>{
            window.location.href = "/login";
          })

        } catch (error) {
          Swal.fire({
            title: "Logout Failed",
            text: error?.data?.message || error.message || "Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return now.toLocaleDateString('id-ID', options);
  };

  // Mock user data - replace with actual data from your API
  const userData = data || { name: "John Doe", email: "john@example.com" };
 
  return (
    <div className="h-max w-full px-4 py-2 lg:px-5 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        {/* Left Section - Path Navigation */}
        <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
          <NavLink to="/" className="w-full flex justify-start gap-1">
            <HomeIcon className="w-5 my-0.5 h-full"/>
            <button className="mx-3 font-thin font-mono text-md text-slate-600">
              ..{(location.pathname).toUpperCase()}
            </button> 
          </NavLink>
        </Typography>

        {/* Center Section - Date Time (Hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-4 text-slate-600">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span className="text-sm font-medium">
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4" />
            <span className="text-sm font-medium">
              {new Date().toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        </div>

        {/* Right Section - Profile/Login */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-x-1">
            {data ? (
              /* Profile Dropdown */
              <div className="profile-dropdown-container relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                >
                  {/* Profile Avatar */}
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                    {getUserInitials(data.username)}
                  </div>
                  
                  {/* Profile Name - Hidden on mobile */}
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-700 leading-tight">
                      {data.username}
                    </p>
                  </div>

                  {/* Dropdown Arrow */}
                  <svg 
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${profileDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {profileDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {/* Profile Header */}
                    <div className="p-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                          {getUserInitials(data.username)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{data.username}</p>
                          <p className="text-sm text-gray-600">{data.role}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-1">
                      <button
                        onClick={() => {
                          setProfileDropdown(false);
                          // Add settings handler here
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 text-left"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <NavLink to="/setting/profile" className="text-sm text-gray-700">Settings</NavLink>
                      </button>

                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={logOut}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 transition-colors duration-200 text-left"
                        >
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span className="text-sm text-red-600 font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/login">
                <Button
                  color="green"
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>LogIn</span>
                </Button> 
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>

      {/* Mobile Menu Collapse */}
      <Collapse open={openNav}>
        <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-gray-200">
          {/* Mobile Date Time */}
          <div className="flex flex-col gap-1 px-2 py-1 text-slate-600 text-sm lg:hidden">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span>{getCurrentDateTime().split(',')[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              <span>{new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Mobile Profile/Login */}
          <div className="flex items-center gap-x-1">
            {isLoggedIn ? (
              <div className="w-full">
                {/* Mobile Profile Info */}
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                    {getUserInitials(userData.name)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{userData.name}</p>
                    <p className="text-xs text-gray-600">{userData.email}</p>
                  </div>
                </div>
                <Button onClick={logOut} fullWidth variant="text" size="sm" color="red">
                  <span>LogOut</span>
                </Button>
              </div>
            ) : (
              <NavLink to="/login" className="w-full">
                <Button fullWidth variant="text" size="sm" color="green">
                  <span>LogIn</span>
                </Button>
              </NavLink>
            )}
          </div>
        </div>
      </Collapse>
    </div>
  );
}