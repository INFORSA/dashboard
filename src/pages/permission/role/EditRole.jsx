import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Input, Typography } from '@material-tailwind/react';
import { useNavigate, useParams } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { useStoreRoleQuery, useUpdateRoleMutation } from '../../../services/user';

const EditRole = () => {
    const { id } = useParams();
    const [ updateRole ] = useUpdateRoleMutation();
    const { data } = useStoreRoleQuery(id);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nama_role:''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nama_role', form.nama_role);

        try {
            const response = await updateRole({ id, ...form }).unwrap();
            Swal.fire("Sukses", response.message, "success");
            setForm({ nama_role:'' });
            navigate("/");
        } catch (err) {
            Swal.fire("Gagal", err?.data?.message || "Proses gagal", "error");
        }
    };

    // ketika data datang, isi form awal
    useEffect(() => {
        if (data) setForm({ nama_role: data.nama_role });
    }, [data]);

    return (
    <div style={{ padding: "2rem" }}>
        <HelmetProvider>
        <title>Edit Role {id}</title>
        </HelmetProvider>
        <Typography className='text-3xl font-semibold text-center mb-3'>Edit Role</Typography>
        <form onSubmit={handleRegister}>
            <Input
            type="text"
            name="nama_role"
            value={form.nama_role}
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

export default EditRole;