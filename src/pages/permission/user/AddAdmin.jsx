import { useState } from 'react';
import { useRegisterAdminMutation } from '../../../services/regist'; // sesuaikan path
import Swal from 'sweetalert2';
import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { useGetDeptQuery } from '../../../services/dept';

const AddAdmin = () => {
  const [registerAdmin] = useRegisterAdminMutation();
  const navigate = useNavigate();
  const { data, isLoading } = useGetDeptQuery();

  const [form, setForm] = useState({
    username: '',
    password: '',
    role:'',
    jabatan:'',
    keterangan:'',
    dept_id:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.role) {
      Swal.fire("Gagal", "Silakan pilih jabatan terlebih dahulu", "error");
      return;
    }

    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('password', form.password);
    formData.append('role', form.role);
    formData.append('jabatan', form.jabatan);
    formData.append('dept_id', form.dept_id);
    formData.append('keterangan', form.keterangan);

    try {
      const response = await registerAdmin(formData);
      Swal.fire("Sukses", response.message, "success");
      setForm({ username: '', password: '', role:'', jabatan:'', dept_id:'', keterangan:'' });
      navigate("/permission/user");
    } catch (err) {
      console.log(err)
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
      <Typography className='text-3xl font-semibold text-center mb-3'>Tambah Pengguna</Typography>
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
        {form.role === 'BPH' && (
          <>
            <div className='mt-3'>
              <Select
                name='dept_id'
                label="Pilih Departemen"
                value={form.dept_id}
                onChange={(val) => setForm({ ...form, dept_id: val })}
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
            </div>
            <div className="mt-3">
              <Input
                type="text"
                name="jabatan"
                value={form.jabatan || ""}
                onChange={handleChange}
                placeholder="Jabatan"
                label="Jabatan"
                required
              />
            </div>
            <div className="mt-3">
              <Input
                type="text"
                name="keterangan"
                value={form.keterangan || ""}
                onChange={handleChange}
                placeholder="Nama Panggilan"
                label="Nama Panggilan"
                required
              />
            </div>
          </>
        )}
        <div className='flex justify-end my-3'>
          <Button color='amber' type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;