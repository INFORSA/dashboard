import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, Option, Select, Typography } from "@material-tailwind/react";
import { Tables } from "../../../components/atoms/Tables";
import { useGetAllNilaiQuery, useGetLineChartDepartQuery, useGetLineChartValueDepartQuery, useGetNilaiDeptDetailQuery, useGetNilaiDeptQuery } from "../../../services/penilaian";
import { Link } from "react-router-dom";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import { useGetDeptQuery } from "../../../services/dept";
import LineCharts from "../../../components/atoms/charts/LineCharts";
import BarChartDept from "../../../components/atoms/charts/BarCharts";
import RadialChart from "../../../components/atoms/charts/RadialCharts";
import { useGetIntiQuery } from "../../../services/user";

export default function Penilaian({isSidebarOpen, nama}){
    const now = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const currentMonthStr = monthNames[now.getMonth()-1];
    const [form, setForm] = useState({
        departemen:1,
        waktu:currentMonthStr
    });
    const month = form.waktu;
    const [open, setOpen] = useState(false);
    const [ penilai, setPenilai ] = useState(null);
     
    const handleOpen = () => setOpen(!open);
    const { data:deptData } = useGetDeptQuery();
    const dept = deptData.data?.filter((item)=> item.id_depart === form.departemen);
    const { data, isLoading, isError } = useGetAllNilaiQuery(month);
    const { data: deptNilai, isLoading: deptLoading, isError: deptError } = useGetNilaiDeptQuery(month);
    const { data: deptDetailNilai, isLoading: deptDetailLoading, isError: deptDetailError, refetch } = useGetNilaiDeptDetailQuery({month, penilai});
    const { data: bpiData, isLoading: bpiLoading, isError: bpiError } = useGetIntiQuery();
    const { data: lineChartData, isLoading: lineChartLoading } = useGetLineChartValueDepartQuery(dept[0].nama);
    const { data: barChartData, isLoading: barChartLoading } = useGetLineChartDepartQuery(month);
    let dotm = null;
    // eslint-disable-next-line no-unused-vars
    let maxIndex = -1;

    if (deptNilai && deptNilai.length > 0) {
        dotm = deptNilai.reduce((prev, current, index) => {
            const currentValue = parseFloat(current.total_akhir || 0);
            const prevValue = parseFloat(prev.total_akhir || 0);

            if (currentValue > prevValue) {
                maxIndex = index; // Simpan index-nya
                return current;
            }
            return prev;
        });
    }

    const columnsPenilaian = [
        { className:"w-10", key: "no", label: "No" },
        { className:"", key: "nama_anggota", label: "Nama Staff" },
        { className:"", key: "nama_departemen", label: "Departemen" },
        { className:"", key: "bulan", label: "Waktu" },
        { className:"", idKey: "id_detail_matriks_1", key: "nilai_matriks_1", label: "KN" },
        { className:"", idKey: "id_detail_matriks_2", key: "nilai_matriks_2", label: "KKT" },
        { className:"", idKey: "id_detail_matriks_3", key: "nilai_matriks_3", label: "INS" },
        { className:"", idKey: "id_detail_matriks_4", key: "nilai_matriks_4", label: "KK" },
        { className:"", idKey: "id_detail_matriks_5", key: "nilai_matriks_5", label: "KI" },
        { className:"", idKey: "id_detail_matriks_6", key: "nilai_matriks_6", label: "KP" },
        { className:"", idKey: "id_detail_matriks_7", key: "nilai_matriks_7", label: "KEK" },
        { className:"", key: "total_nilai", label: "Total" },
        { className:"", key: "total_akhir", label: "Hasil" }
    ];

    const columnsPenilaianDept = [
        { className:"w-10", key: "no", label: "No" },
        { className:"", key: "nama_departemen", label: "Departemen" },
        { className:"", key: "bulan", label: "Waktu" },
        { className:"", idKey: "id_detail_matriks_1", key: "nilai_matriks_1", label: "KN" },
        { className:"", idKey: "id_detail_matriks_2", key: "nilai_matriks_2", label: "KKT" },
        { className:"", idKey: "id_detail_matriks_3", key: "nilai_matriks_3", label: "INS" },
        { className:"", idKey: "id_detail_matriks_4", key: "nilai_matriks_4", label: "KK" },
        { className:"", idKey: "id_detail_matriks_5", key: "nilai_matriks_5", label: "KI" },
        { className:"", idKey: "id_detail_matriks_6", key: "nilai_matriks_6", label: "KP" },
        { className:"", key: "total_nilai", label: "Total" },
    ];

    if(penilai === null){
        columnsPenilaianDept.push(
            { className:"", key: "total_akhir", label: "Hasil" }
        );
    }

    const labelPenilaian = [
        { key: "total_nilai", label: "Nilai" },
    ];

    const dataPenilaian = [
        { nama: "Zaki Fauzan Rabbani", total_nilai: 60, ulasan: "Kinerja bulan ini sangat baik, target tercapai! 💙" },
        { nama: "Bayu Purnama Aji", total_nilai: 60, ulasan: "Kinerja bulan ini sangat baik, target tercapai! 💙" },
        { nama: "Nurul Vita Azizah", total_nilai: 60, ulasan: "Kinerja bulan ini sangat baik, target tercapai! 💙" }
    ];

    const summaryPenilaian = [
        { key: "total_nilai", label: dept.nama },
    ];

    if ( isLoading || lineChartLoading || barChartLoading || deptLoading || bpiLoading || deptDetailLoading) return <Loading/>;
    if ( isError || deptError || bpiError || deptDetailError) return <Error/>;
    
    return(
         <div className="w-full overflow-x-auto">
            <HelmetProvider><title>Daftar Penilaian</title></HelmetProvider>
            <div className="my-3 border-b-4 border-gray-500 pb-4 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-semibold text-gray-800">
                        INFORMASI <span className="font-thin">PERFORMA</span>
                    </h1>
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-xl shadow-sm">
                    <p className="text-sm text-gray-700 font-medium">Semoga Bermanfaat 👋</p>
                </div>
            </div>
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>
                    <Typography className='text-3xl font-semibold text-center mb-3'>Import Data</Typography>
                </DialogHeader>
                    <DialogBody className="flex justify-center items-center gap-4">
                        <Button color="blue-gray" size="sm" className="mb-3">
                            <Link className="flex items-center gap-3" to='/penilaian/import/staff'>
                                <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                                <Typography className="text-md">
                                    Import Penilaian Staff
                                </Typography>
                            </Link>
                        </Button>
                        <Button color="blue-gray" size="sm" className="mb-3">
                            <Link className="flex items-center gap-3" to='/penilaian/import/departemen'>
                                <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                                <Typography className="text-md">
                                    Import Penilaian Departemen
                                </Typography>
                            </Link>
                        </Button>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>   
                    </DialogFooter>
            </Dialog>
            <div className="flex gap-2">
                {/* <Button color="blue" size="sm" className="mb-3">
                    <Link className="flex items-center gap-3" to='/penilaian/add'>
                        <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                        <Typography className="text-md">
                            Isi Penilaian
                        </Typography>
                    </Link>
                </Button> */}
                <Button onClick={handleOpen}  color="blue-gray" size="sm" className="mb-3 flex items-center gap-3">
                    <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                    <Typography className="text-md">
                        Import Data
                    </Typography>
                </Button>
            </div>
            <div className="my-3">
                <Card className="p-4 mb-3 border border-md border-black bg-white/5 backdrop-blur-md">
                    <Typography variant="h5" className="mb-2 text-gray-700">Filter Data Penilaian</Typography>
                    <Typography variant="small" className="mb-4 text-black">
                        Pilih Departemen dan Waktu untuk menampilkan grafik berdasarkan data yang diinginkan.
                    </Typography>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Select
                            label="Pilih Departemen"
                            value={form.departemen}
                            onChange={(val) => setForm({ ...form, departemen: val })}
                        >
                            {deptData?.data?.map((item, index) => (
                                <Option key={index} value={item.id_depart}>{item.nama}</Option>
                            ))}
                        </Select>

                        <Select
                            label="Pilih Waktu"
                            value={form.waktu}
                            onChange={(val) => setForm({ ...form, waktu: val })}
                        >
                            {lineChartData?.map((item, index) => (
                                <Option key={index} value={item.bulan}>{item.bulan}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className="my-3 grid grid-cols-2 gap-3">
                        <LineCharts title="Penilaian Anggota" isSidebarOpen={isSidebarOpen} data={lineChartData || []} detail={summaryPenilaian}/>
                        <BarChartDept header="Rata-Rata Penilaian Anggota Tiap Departemen" isSidebarOpen={isSidebarOpen} data={barChartData || []} detail={labelPenilaian}/>
                    </div>
                </Card>
            </div>
            <div className="my-3">
                <RadialChart 
                    isSidebarOpen={isSidebarOpen} 
                    data={dataPenilaian} 
                    value={dotm.total_akhir}
                    departmentName={dotm.nama_departemen} 
                    month={dotm.bulan}
                />
            </div>
             <Card className="p-4 border border-md border-black bg-white/5 backdrop-blur-md">
                <Typography variant="h5" className="mb-2 text-gray-700">Tabel Detail Penilaian</Typography>
                <Typography variant="small" className="mb-4 text-black">
                    Tabel ini berisi daftar lengkap hasil penilaian berdasarkan bulan yang dipilih.
                </Typography>
                <div className="my-3 flex gap-2">
                    <Select
                        label="Pilih Waktu"
                        value={form.waktu}
                        onChange={(val) => setForm({ ...form, waktu: val })}
                    >
                        {lineChartData?.map((item, index) => (
                            <Option key={index} value={item.bulan}>{item.bulan}</Option>
                        ))}
                    </Select>
                    <Select
                        name="penilai"
                        label="Pilih Penilai"
                        value={penilai}
                        onChange={(val) => setPenilai(val)}
                        animate={{
                            mount: { y: 0 },
                            unmount: { y: 25 },
                        }}
                        >
                        {bpiData?.map((item, index) => (
                            <Option
                                key={index} value={item?.penilai}>
                                {item?.penilai}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className="w-full">
                    <Tables
                        title="Tabel Penilaian Departemen"
                        description={`List Nilai Departemen Bulan ${form.waktu}`}
                        columns={columnsPenilaianDept}
                        rows={penilai === null ? deptNilai : deptDetailNilai || []}
                        actionHidden={true}
                        inlineEdit={penilai === nama ? true : false}
                        onRefetch={refetch}
                        type="dept"
                    />
                </div>
                <div className="w-full my-3">
                    <Tables
                        title="Tabel Penilaian Anggota"
                        description={`List Nilai Anggota Bulan ${form.waktu}`}
                        columns={columnsPenilaian}
                        rows={data || []}
                        actionHidden={true}
                    />
                </div>
             </Card>
         </div>
    )
}