import image from '../../assets/inforsa.png'
import { useEffect, useState } from "react";
import Axios from 'axios';
import Swal from 'sweetalert2';
import CryptoJS from "crypto-js";
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

function Login(){
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    const secretKey = import.meta.env.VITE_SECRETKEY
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const generateToken = () => {
        const timestamp = Date.now().toString();
        const randomString = Math.random().toString(36).substring(7);
        const expirationTime = Date.now() + 60 * 60 * 1000;
        const tokenPayload = { timestamp, randomString, expirationTime };
        localStorage.setItem('expiredTime', expirationTime);
        const token = CryptoJS.HmacSHA256(JSON.stringify(tokenPayload), secretKey).toString(CryptoJS.enc.Hex);
      
        return token;
      };

    //Password show
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const dispatch = useDispatch(); 
    const [login, { isLoading }] = useLoginMutation();

    const handleProcess = async (e) =>{
        e.preventDefault();
        
        const generatedToken = generateToken();
        const Token = generatedToken;
        // const ID = found.ID_Admin;

        //Request Login Data
        const requestData = {
            // userId: ID,
            userToken: Token
          };
        
        try {
            const response = await login(requestData).unwrap(); // <-- pakai Redux loginAPI
            dispatch(loginSuccess(response)); // <-- simpan data ke authSlice
        
            localStorage.setItem('token', generatedToken);
            // localStorage.setItem('ID', found.ID_Admin);
        
            await Swal.fire({
                title: "Berhasil Login",
                text: "Welcome back Admin INFORSA",
                icon: "success"
            });
        
            window.location.href = '/';
        } catch (error) {
            console.error('Login error:', error);
            Swal.fire({
                title: "Gagal Login",
                text: "Terjadi kesalahan saat mencoba login." + error,
                icon: "error"
            });
        }
    }

    return(
    <motion.div {...scaleDown} id='/' className="w-full h-auto overflow-x-hidden overflow-y-hidden">
        <Helmet>
            <title>Login INFORSA 2024</title>
        </Helmet>
        <div className="lg:min-h-[80vh] min-h-[80vh] flex items-center justify-center">
            <div className='p-4 border border-4 w-96'>
                <div className="flex justify-center">
                    <LazyLoadImage loading="lazy" className="w-24" src={image} alt="" />
                </div>
                <h1 className='text-4xl text-center font-bold font-serif text-white'>Welcome Back</h1>
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
    </motion.div>
    )
}

export default Login;