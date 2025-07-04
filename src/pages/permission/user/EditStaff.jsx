import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import { useNavigate, useParams } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { useStoreAnggotaQuery, useUpdateRoleMutation } from '../../../services/user';
import { useGetDeptQuery } from '../../../services/dept';

const EditStaff = () => {
    const { id } = useParams();
    const [ updateRole ] = useUpdateRoleMutation();
    const { data:storeData } = useStoreAnggotaQuery(id);
    const navigate = useNavigate();
    const { data:deptData, isLoading } = useGetDeptQuery();

    const [form, setForm] = useState({
        username:'',
        nim:'',
        gender:'',
        departemen:'',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', form.username);
        formData.append('nim', form.nim);
        formData.append('gender', form.gender);
        formData.append('departemen', form.departemen);

        try {
            const response = await updateRole({ id, ...form }).unwrap();
            Swal.fire("Sukses", response.message, "success");
            setForm({ username:'', nim:'', gender:'', departemen:''});
            navigate("/");
        } catch (err) {
            Swal.fire("Gagal", err?.data?.message || "Proses gagal", "error");
        }
    };

    // ketika data datang, isi form awal
    useEffect(() => {
        if (storeData) setForm({ username: storeData.nama_staff, nim: storeData.nim, gender: storeData?.gender || '', departemen: storeData.depart_id });
    }, [storeData]);

    return (
        <div style={{ padding: "2rem" }}>
            <HelmetProvider>
                <title>Edit Staff {id}</title>
            </HelmetProvider>
            <Typography className='text-3xl font-semibold text-center mb-3'>Edit Staff</Typography>
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
                        name='id_depart'
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
                            deptData.data.map((item, index)=>(
                                <Option key={index} value={item.id_depart}>{item.nama}</Option>
                            ))
                            )}
                    </Select>
                </div>
            <div className='flex justify-end my-3'>
                <Button color='green' type="submit">Simpan</Button>
            </div>
            </form>
        </div>
    );
};

export default EditStaff 