import image from '../../assets/inforsa.png'
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { scaleDown } from "../../framerMotion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Helmet } from "react-helmet";
import { Button, IconButton, Input } from '@material-tailwind/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useLoginMutation } from '../../services/login';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import loginImg from '../../assets/main-flag.png';
import loginBg from '../../assets/family-si.png';

function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    //Password show
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
            const response = await login({ username, password }).unwrap();
            const { token } = response;

            const decoded = jwtDecode(token);
            const expirationTime = new Date(decoded.exp * 1000);

            // Simpan di localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("expirationTime", expirationTime);

            // Simpan ke Redux
            dispatch(loginSuccess({ username: decoded.username, token }));

            // Alert & Redirect
            await Swal.fire({
                title: "Selamat Datang",
                icon: "success",
            });
                navigate("/");
            } catch (error) {
            console.error("Login error:", error);
            setError(
                "Terjadi kesalahan. " +
                (error?.data?.message || error?.message || "Coba lagi.")
            );
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const checkTokenExpiration = () => {
        const expirationTime = localStorage.getItem("expirationTime");
        if (expirationTime && new Date() > new Date(expirationTime)) {
            localStorage.removeItem("token");
            localStorage.removeItem("expirationTime");
            setError("Session expired. Silakan login kembali.");
        }
        };

        checkTokenExpiration();
    }, []);

    return(
    <motion.div {...scaleDown} id='/' className="w-full min-h-screen bg-cover bg-center" 
            style={{backgroundImage: `url(${loginImg})`}}
        >
        <Helmet>
            <title>Login INFORSA 2024</title>
        </Helmet>
        <div className="w-full h-screen flex items-center justify-center p-12">
            <div className='flex items-center justify-between h-full w-full'>
                <img src={loginBg} className='border border-4 h-96 w-2/3 object-cover' alt="" />
                <div className='p-4 border border-4 bg-white w-1/3 h-96'>
                    {error && <p className='text-red-400 text-center'>{error}</p>}
                    <div className="flex justify-center">
                        <LazyLoadImage loading="lazy" className="w-24" src={image} alt="" />
                    </div>
                    <h1 className='text-4xl text-center font-bold font-serif text-black mb-3'>Welcome Back</h1>
                    <form onSubmit={handleProcess}>
                        <Input
                            className="text-black"
                            label="Username"
                            onChange={(e) => setUsername(e.target.value) }
                            margin="normal"
                        />
                        <br />
                        <Input
                            type={`${showPassword ? "text" : "password"}`}
                            className="text-black"
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            icon={<div type='button' className='w-5 h-auto' onClick={handleTogglePasswordVisibility}>{showPassword ? <EyeSlashIcon/> : <EyeIcon/>}</div>}
                        />
                        <Button type="submit" variant="contained" color='green' className="mt-5 w-full">
                            {isLoading ? 'Loading...' : 'Login'}
                        </Button>
                    </form>
                </div> 
            </div>
        </div>
    </motion.div>
    )
}

export default Login;