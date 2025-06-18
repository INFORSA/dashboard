import image from '../../assets/inforsa.png';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { scaleDown } from "../../framerMotion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, Input, Typography } from '@material-tailwind/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useLazyGetCurrentUserQuery, useLoginMutation } from '../../services/login';
import { useNavigate } from 'react-router-dom';
import loginBg from '../../assets/family-si.png';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

function Login() {
  const [triggerGetUser] = useLazyGetCurrentUserQuery();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleProcess = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username dan Password tidak boleh kosong");
      return;
    }

    try {
      await login({ username, password }).unwrap();
      await triggerGetUser();
      await Swal.fire({
        title: "Selamat Datang",
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      setError(
        "Terjadi kesalahan. " +
        (error?.data?.message || error?.message || "Coba lagi.")
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div {...scaleDown} className="min-h-screen w-full bg-gray-100 relative overflow-hidden">
      <HelmetProvider>
        <title>Login INFORSA 2024</title>
      </HelmetProvider>

      <div className="absolute inset-0 z-0">
        <img src={loginBg} className="w-full h-full object-cover brightness-75" alt="background" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen p-4">
        {/* Glass Card */}
        <div className="bg-white/20 backdrop-blur-md shadow-2xl rounded-3xl p-8 lg:p-12 w-full max-w-md lg:max-w-lg mx-auto">
          <div className="text-center">
            <LazyLoadImage src={image} alt="Logo INFORSA" className="w-20 mx-auto mb-4" />
            <Typography variant="h5" className="text-white font-serif mb-1">Welcome to</Typography>
            <Typography variant="h3" className="text-white font-serif font-bold mb-6">INFORSA Dashboard</Typography>
          </div>

          {error && <p className="text-red-300 text-center text-sm mb-2">{error}</p>}

          <form onSubmit={handleProcess}>
            <div className="mb-4">
              <Input
                label="Username"
                className="text-white placeholder:text-white"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                className="text-white placeholder:text-white"
                onChange={(e) => setPassword(e.target.value)}
                icon={
                  <div type="button" className="w-5 h-auto text-black" onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </div>
                }
              />
            </div>

            <Button type="submit" color="white" className="mt-4 w-full text-black font-bold">
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;