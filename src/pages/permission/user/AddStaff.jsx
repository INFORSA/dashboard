import { useState } from 'react';
import { useRegisterStaffMutation } from '../../../services/regist'; // sesuaikan path
import Swal from 'sweetalert2';
import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import { EyeIcon, EyeSlashIcon, PlusCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useGetDeptQuery, useGetPengurusQuery } from '../../../services/dept';
import { Link, useNavigate } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

const AddStaff = () => {
  const [registerStaff] = useRegisterStaffMutation();
  const navigate = useNavigate();
  const { data: pengurusData } = useGetPengurusQuery();
  const { data, isLoading } = useGetDeptQuery();

  const [form, setForm] = useState({
    username: '',
    nim:'',
    gender:'',
    departemen:'',
    gambar:'',
    password: '',
    target_penilai: []
  });

  const selectedDeptName = data?.data?.find(
        d => String(d.id_depart) === String(form.departemen)
    )?.nama;

  const filteredPengurus = pengurusData?.data?.filter(
      item => item.dept === selectedDeptName
  );

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
    formData.append('depart_id', form.departemen); 
    formData.append('gambar', form.gambar);
    formData.append('target_penilai', form.target_penilai.join(','));

    try {
      const response = await registerStaff(formData);
      console.log("Response:", response);
      Swal.fire("Sukses", response.message, "success");
      setForm({ username: '', nim:'', gender:'', departemen:'', gambar:'', password: '', target_penilai: [] });
      navigate("/permission/user");
    } catch (err) {
      console.error("Register error:", err);
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
      <Typography className='text-3xl font-semibold text-center mb-3'>Tambah Anggota</Typography>
      <Button color="yellow" size="sm" className="mb-3">
          <Link className="flex items-center gap-3" to='/permission/anggota/import'>
              <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
              <Typography className="text-md ">
                  Import melalui file
              </Typography>
          </Link>
      </Button>
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
            />
        </div>
        {form.departemen && (
          <div className="border rounded-md px-1">
            <Typography variant="small" className="font-semibold mb-1 text-gray-700">
              BPH Penilai
            </Typography>

            <div className="grid grid-cols-2 gap-1 max-h-32 overflow-y-auto">
              {filteredPengurus?.map((item) => (
                <label
                  key={item.id_pengurus}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-1 focus:ring-blue-500"
                    value={item.id_pengurus}
                    checked={form.target_penilai.includes(String(item.id_pengurus))}
                    onChange={(e) => {
                      const value = e.target.value;
                      setForm(prev => ({
                        ...prev,
                        target_penilai: e.target.checked
                          ? [...prev.target_penilai, value]
                          : prev.target_penilai.filter(id => id !== value)
                      }));
                    }}
                  />
                  <span className="text-gray-700">{item.jabatan} – {item.dept}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        <div className='flex justify-end my-3'>
          <Button color='amber' type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
};

export default AddStaff;