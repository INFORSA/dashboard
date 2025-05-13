import { useState } from 'react';
import { useRegisterStaffMutation } from '../../../services/regist'; // sesuaikan path
import Swal from 'sweetalert2';
import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import { Helmet } from 'react-helmet';
import { EyeIcon, EyeSlashIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { useGetDeptQuery } from '../../../services/dept';
import { useNavigate } from 'react-router-dom';

const AddStaff = () => {
  const [registerStaff] = useRegisterStaffMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    nim:'',
    gender:'',
    departemen:'',
    gambar:'',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar") {
      setForm({ ...form, gambar: files[0] }); // simpan objek File
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('password', form.password);
    formData.append('nim', form.nim);
    formData.append('gender', form.gender);
    formData.append('depart_id', form.departemen); // ← pastikan `form.departemen` isinya `id`
    formData.append('gambar', form.gambar); // ← file object, bukan string

    try {
      const response = await registerStaff(formData).unwrap();
      Swal.fire("Sukses", response.message, "success");
      setForm({ username: '', nim:'', gender:'', departemen:'', gambar:'', password: '' });
      navigate("/");
    } catch (err) {
      Swal.fire("Gagal", err?.data?.message || "Registrasi gagal", "error");
    }
  };

  //Password show
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

  //Dept Data
  const { data, isLoading } = useGetDeptQuery();

  return (
    <div style={{ padding: "2rem" }}>
      <Helmet>
        <title>Tambah Pengguna</title>
      </Helmet>
      <Typography className='text-3xl font-semibold text-center mb-3'>Register Staff</Typography>
      <div className='flex justify-end mb-3'>
          <Button color='green' className='flex items-center gap-3' size='md'>
            <PlusCircleIcon className='w-5 h-5'/>
            <Typography className='text-md'>Import</Typography>
          </Button>
      </div>
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
          <Input
              type="text"
              name="nim"
              value={form.nim}
              onChange={handleChange}
              placeholder="NIM"
              label="NIM"
              required
            />
            <Select
              name='gender'
              label="Pilih Gender"
              value={form.gender}
              onChange={(val) => setForm({ ...form, gender: val })}
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              <Option value='Laki-Laki'>Laki-Laki</Option>
              <Option value='Perempuan'>Perempuan</Option>
            </Select>
            <Select
              name='depart_id'
              label="Pilih Departemen"
              value={form.departemen}
              onChange={(val) => setForm({ ...form, departemen: val })}
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              {isLoading ? 
                (<Option disabled>Loading...</Option>)
                :
                (
                  data.data.map((item, index)=>(
                    <Option key={index} value={item.id_depart}>{item.nama}</Option>
                  ))
                )}
            </Select>
            <Input
              type="file"
              name="gambar"
              onChange={handleChange}
              placeholder="Gambar"
              label="Gambar"
              required
            />
        </div>
        <div className='flex justify-end my-3'>
          <Button color='amber' type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
};

export default AddStaff;