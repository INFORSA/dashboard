import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import { useNavigate, useParams } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { useStoreUserQuery, useUpdateUserMutation } from '../../../services/user';
import { useGetDeptQuery } from '../../../services/dept';

const EditUser = () => {
    const { id } = useParams();
    const [ updateUser ] = useUpdateUserMutation();
    const { data } = useStoreUserQuery(id);
    const navigate = useNavigate();
    const { data: deptData, isLoading: deptLoading } = useGetDeptQuery();

    const [form, setForm] = useState({
        username:'',
        role:'',
        dept_id:'',
        jabatan:'',
        keterangan:''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', form.username);
        formData.append('role', form.role);
        formData.append('dept_id', form.dept_id);
        formData.append('jabatan', form.jabatan);
        formData.append('keterangan', form.keterangan);

        try {
            const response = await updateUser({ id, ...form }).unwrap();
            Swal.fire("Sukses", response.message, "success");
            setForm({ username:'', role:'' });
            navigate("/permission/user");
        } catch (err) {
            Swal.fire("Gagal", err?.data?.message || "Proses gagal", "error");
        }
    };

    // ketika data datang, isi form awal
    useEffect(() => {
        if (data) setForm({ username: data.username, role: data.role, dept_id:data.dept_id, jabatan:data.jabatan, keterangan:data.keterangan});
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
                {form.role === 2 && (
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
                            {deptLoading ? 
                            (<Option disabled>Loading...</Option>)
                            :
                            (
                                deptData.data.map((item, index)=>(
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
                <Button color='green' type="submit">Simpan</Button>
            </div>
            </form>
        </div>
    );
};

export default EditUser 