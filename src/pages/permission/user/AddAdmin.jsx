import { useState } from 'react';
import { useRegisterAdminMutation } from '../../../services/regist'; // sesuaikan path
import Swal from 'sweetalert2';
import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

const AddAdmin = () => {
  const [registerAdmin] = useRegisterAdminMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
    role:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('password', form.password);
    formData.append('role', form.role);

    try {
      const response = await registerAdmin(formData).unwrap();
      Swal.fire("Sukses", response.message, "success");
      setForm({ username: '', password: '', role:'' });
      navigate("/permission/user");
    } catch (err) {
      Swal.fire("Gagal", err?.data?.message || "Registrasi gagal", "error");
    }
  };

  //Password show
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

  return (
    <div style={{ padding: "2rem" }}>
      <HelmetProvider>
        <title>Tambah Pengguna</title>
      </HelmetProvider>
      <Typography className='text-3xl font-semibold text-center mb-3'>Register Admin</Typography>
      <form onSubmit={handleRegister}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3'>
          <Input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            label="Username"
            required
          />
          <Input
            type={`${showPassword ? "text" : "password"}`}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            label="Password"
            icon={<div type='button' className='w-5 h-auto' onClick={handleTogglePasswordVisibility}>{showPassword ? <EyeSlashIcon/> : <EyeIcon/>}</div>}
            required
          />
        </div>
        <Select
            name='jabatan'
            label="Pilih Jabatan"
            value={form.role}
            onChange={(val) => setForm({ ...form, role: val })}
            animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
            }}
        >
            <Option value='Dosen'>Dosen</Option>
            <Option value='MPKO'>MPKO</Option>
            <Option value='BPI'>BPI</Option>
            <Option value='BPH'>BPH</Option>
        </Select>
        <div className='flex justify-end my-3'>
          <Button color='amber' type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;