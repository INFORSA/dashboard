import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import { useNavigate, useParams } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { useStoreAnggotaQuery, useUpdateAnggotaMutation } from '../../../services/user';
import { useGetDeptQuery, useGetPengurusQuery } from '../../../services/dept';

const EditStaff = () => {
    const { id } = useParams();
    const [ updateAnggota ] = useUpdateAnggotaMutation();
    const { data:storeData } = useStoreAnggotaQuery(id);
    const { data: pengurusData } = useGetPengurusQuery();
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();
    const { data:deptData, isLoading } = useGetDeptQuery();

    const [form, setForm] = useState({
        username:'',
        nim:'',
        gender:'',
        departemen:'',
        periode:'',
        target_penilai: []
    });

    const selectedDeptName = deptData?.data?.find(
        d => String(d.id_depart) === String(form.departemen)
    )?.nama;

    const filteredPengurus = pengurusData?.data?.filter(
        item => item.dept === selectedDeptName
    );

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const payload = {
            username: form.username,
            nim: form.nim,
            gender: form.gender,
            departemen: form.departemen,
            periode: form.periode,
            target_penilai: form.target_penilai.join(',')
        };

        try {
            const response = await updateAnggota({ id, ...payload }).unwrap();
            Swal.fire("Sukses", response.message, "success");
            setForm({ username:'', nim:'', gender:'', departemen:''});
            navigate("/permission/user");
        } catch (err) {
            Swal.fire("Gagal", err?.data?.message || "Proses gagal", "error");
        }
    };

    // ketika data datang, isi form awal
    useEffect(() => {
        if (storeData) setForm({ 
            username: storeData.nama_staff, 
            nim: storeData.nim, 
            gender: storeData?.gender || '', 
            departemen: storeData.depart_id, 
            periode: storeData.periode, 
            target_penilai: storeData.target_penilai
                ? storeData.target_penilai.split(',').map(id => id.trim())
                : []
            });
    }, [storeData]);

    return (
        <div style={{ padding: "2rem" }}>
            <HelmetProvider>
                <title>Edit Staff {id}</title>
            </HelmetProvider>
            <Typography className='text-3xl font-semibold text-center mb-3'>Edit Staff</Typography>
            <form onSubmit={handleRegister} className='space-y-3'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
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
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
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
                    <Input
                        type="text"
                        name="periode"
                        value={form.periode}
                        onChange={handleChange}
                        placeholder="Periode"
                        label="Periode"
                        required
                    />
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
                {form.departemen && (
                    <div className="border rounded-md px-1">
                        <Typography variant="small" className="mb-2 font-semibold">
                            BPH Penilai
                        </Typography>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {filteredPengurus?.filter(item =>
                                    Number(item.periode) === currentYear
                                ).map((item) => (
                                <label
                                    key={item.id_pengurus}
                                    className="flex items-center gap-2 text-sm cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-1 focus:ring-blue-500"
                                        value={String(item.id_pengurus)}
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
                                    <span className="text-gray-700">
                                        {item.jabatan} – {item.dept}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            <div className='flex justify-end my-3'>
                <Button color='green' type="submit">Simpan</Button>
            </div>
            </form>
        </div>
    );
};

export default EditStaff 