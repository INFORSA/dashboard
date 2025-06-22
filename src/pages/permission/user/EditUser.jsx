import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Input, Typography } from '@material-tailwind/react';
import { useNavigate, useParams } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { useStoreUserQuery, useUpdateRoleMutation } from '../../../services/user';

const EditUser = () => {
    const { id } = useParams();
    const [ updateRole ] = useUpdateRoleMutation();
    const { data } = useStoreUserQuery(id);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username:'',
        role:''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', form.username);
        formData.append('role', form.role);

        try {
            const response = await updateRole({ id, ...form }).unwrap();
            Swal.fire("Sukses", response.message, "success");
            setForm({ username:'', password:'', role:'' });
            navigate("/");
        } catch (err) {
            Swal.fire("Gagal", err?.data?.message || "Proses gagal", "error");
        }
    };

    // ketika data datang, isi form awal
    useEffect(() => {
        if (data) setForm({ username: data.username, role: data.role });
    }, [data]);

    return (
        <div style={{ padding: "2rem" }}>
            <HelmetProvider>
            <title>Edit User {id}</title>
            </HelmetProvider>
            <Typography className='text-3xl font-semibold text-center mb-3'>Edit User</Typography>
            <form onSubmit={handleRegister}>
                <div className='flex gap-4'>
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
                        type="text"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        placeholder="Jabatan"
                        label="Jabatan"
                        required
                    />
                </div>
            <div className='flex justify-end my-3'>
                <Button color='green' type="submit">Simpan</Button>
            </div>
            </form>
        </div>
    );
};

export default EditUser 