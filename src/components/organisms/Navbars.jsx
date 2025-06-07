import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { useGetCurrentUserQuery, useLogoutMutation } from "../../services/login";
 
export default function Navbars() {
  const [logout] = useLogoutMutation();
  const { data } = useGetCurrentUserQuery();
  const [openNav, setOpenNav] = React.useState(false);
  const isLoggedIn = localStorage.getItem("token") !== null;

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
  const logOut = () => {
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
 
  return (
    <Navbar color="light" className="h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <NavLink to="/" className="w-full flex justify-start gap-1">
              <HomeIcon className="w-5 my-0.5 h-full"/>
              <button className="mx-3 font-thin font-mono text-md text-slate-600">..{(location.pathname).toUpperCase()}</button> 
            </NavLink>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-1">
              {data ? 
                <Button
                  color="red"
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={logOut} 
                  >
                    <span>LogOut</span>
                </Button> 
                :
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
              }
            </div>
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
        <Collapse open={openNav}>
          <div className="flex items-center gap-x-1">
              {isLoggedIn ? 
              <Button onClick={logOut} fullWidth variant="text" size="sm" className="">
                <span>LogOut</span>
              </Button>
              :
              <NavLink to="/login">
                <Button fullWidth variant="text" size="sm" className="">
                  <span>LogIn</span>
                </Button>
              </NavLink>
              }
          </div>
        </Collapse>
      </Navbar>
  );
}