import { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Input, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { useAddRoleMutation } from '../../../services/user';

const AddRole = () => {
  const [registerAdmin] = useAddRoleMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('role', form.role);

    try {
      const response = await registerAdmin(formData).unwrap();
      Swal.fire("Sukses", response.message, "success");
      setForm({ role:'' });
      navigate("/");
    } catch (err) {
      Swal.fire("Gagal", err?.data?.message || "Proses gagal", "error");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <HelmetProvider>
        <title>Tambah Role</title>
      </HelmetProvider>
      <Typography className='text-3xl font-semibold text-center mb-3'>Tambah Role</Typography>
      <form onSubmit={handleRegister}>
          <Input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Nama Role"
            label="Nama Role"
            required
          />
        <div className='flex justify-end my-3'>
          <Button color='amber' type="submit">Tambah</Button>
        </div>
      </form>
    </div>
  );
};

export default AddRole;