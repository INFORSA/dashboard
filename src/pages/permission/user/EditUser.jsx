import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import { useNavigate, useParams } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { useGetRoleQuery, useStoreUserQuery, useUpdateUserMutation } from '../../../services/user';
import { useGetDeptQuery } from '../../../services/dept';

const EditUser = () => {
    const { id } = useParams();
    const [ updateUser ] = useUpdateUserMutation();
    const { data } = useStoreUserQuery(id);
    const { data: roleData = [], isLoading: roleLoading } = useGetRoleQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const navigate = useNavigate();
    const { data: deptData, isLoading: deptLoading } = useGetDeptQuery();

    const [form, setForm] = useState({
        id_pengurus:'',
        username:'',
        role:'',
        dept_id:'',
        jabatan_bph:'',
        jabatan_bpi:'',
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
        formData.append('jabatan_bph', form.jabatan_bph);
        formData.append('jabatan_bpi', form.jabatan_bpi);
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
        if (data) setForm({ id_pengurus: data.id_pengurus, username: data.username, role: data.role, dept_id:data.dept_id, jabatan_bph:data.jabatan_bph, jabatan_bpi:data.jabatan_bpi, keterangan:data.keterangan});
    }, [data]);

    return (
        <div style={{ padding: "2rem" }}>
            <HelmetProvider>
            <title>Edit User {id}</title>
            </HelmetProvider>
            <Typography className='text-3xl font-semibold text-center mb-3'>Edit User</Typography>
            <form onSubmit={handleRegister}>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                    <Input
                        type="text"
                        name="id_pengurus"
                        value={form.role === 2 ? form.id_pengurus : id}
                        placeholder={form.role === 2 ? "ID Pengurus" : "ID User"}
                        label={form.role === 2 ? "ID Pengurus" : "ID User"}
                        readOnly
                        className="cursor-not-allowed bg-gray-100 text-gray-700"
                    />
                    <Input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Username"
                        label="Username"
                        required
                    />
                    <Select
                        name='role'
                        label="Pilih Role"
                        value={form.role}
                        onChange={(val) => setForm({ ...form, role: val })}
                        animate={{
                            mount: { y: 0 },
                            unmount: { y: 25 },
                        }}
                    >
                        {roleLoading ? 
                        (<Option disabled>Loading...</Option>)
                        :
                        (
                            roleData.filter((item) => item.id_role !== 3).map((item, index)=>(
                                <Option key={index} value={item.id_role}>{item.nama_role}</Option>
                            ))
                        )}
                    </Select>
                </div>
                {form.role == 2 && (
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
                                name="jabatan_bph"
                                value={form.jabatan_bph || ""}
                                onChange={handleChange}
                                placeholder="Jabatan"
                                label="Jabatan"
                                required
                            />
                        </div>
                    </>
                )}
                {form.role === 1 && (
                    <div className="mt-3">
                        <Input
                        type="text"
                        name="jabatan_bpi"
                        value={form.jabatan_bpi || ""}
                        onChange={handleChange}
                        placeholder="Jabatan"
                        label="Jabatan"
                        />
                    </div>
                )}

                {form.role !== 1 && (
                    <div className="mt-3">
                        <Input
                        type="text"
                        name="keterangan"
                        value={form.keterangan || ""}
                        onChange={handleChange}
                        placeholder="Nama Panggilan"
                        label="Nama Panggilan"
                        />
                    </div>
                )}
            <div className='flex justify-end my-3'>
                <Button color='green' type="submit">Simpan</Button>
            </div>
            </form>
        </div>
    );
};

export default EditUser 