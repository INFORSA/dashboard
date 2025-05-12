import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../../services/regist'; // sesuaikan path
import { registerSuccess } from '../../../features/register/registerSlice'; // sesuaikan path
import Swal from 'sweetalert2';
import { Input } from '@material-tailwind/react';

const Register = () => {
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();

  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(form).unwrap();
      dispatch(registerSuccess({ user: form.username }));
      Swal.fire("Sukses", response.message, "success");
      setForm({ username: '', password: '' });
    } catch (err) {
      Swal.fire("Gagal", err?.data?.message || "Registrasi gagal", "error");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <Input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
        /><br />
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;