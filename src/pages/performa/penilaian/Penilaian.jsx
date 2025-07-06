import { Button, Card, Option, Select, Typography } from "@material-tailwind/react";
import { Tables } from "../../../components/atoms/Tables";
import { useGetAllNilaiQuery, useGetLineChartDepartQuery, useGetLineChartValueDepartQuery } from "../../../services/penilaian";
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

export default function Penilaian(isSidebarOpen){
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
    const { data:deptData } = useGetDeptQuery();
    const dept = deptData.data?.filter((item)=> item.id_depart === form.departemen);
    const { data, isLoading, isError } = useGetAllNilaiQuery(form.waktu);
    const { data: lineChartData, isLoading: lineChartLoading } = useGetLineChartValueDepartQuery(dept[0].nama);
    const { data: barChartData, isLoading: barChartLoading } = useGetLineChartDepartQuery(form.waktu);
    let dotm = null;
    // eslint-disable-next-line no-unused-vars
    let maxIndex = -1;

    if (barChartData && barChartData.length > 0) {
        dotm = barChartData.reduce((prev, current, index) => {
            const currentValue = parseFloat(current.total_nilai || 0);
            const prevValue = parseFloat(prev.total_nilai || 0);

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

    if ( isLoading || lineChartLoading || barChartLoading ) return <Loading/>;
    if ( isError ) return <Error/>;
    
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
            <div className="flex gap-2">
                {/* <Button color="blue" size="sm" className="mb-3">
                    <Link className="flex items-center gap-3" to='/penilaian/add'>
                        <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                        <Typography className="text-md">
                            Isi Penilaian
                        </Typography>
                    </Link>
                </Button> */}
                <Button color="blue-gray" size="sm" className="mb-3">
                    <Link className="flex items-center gap-3" to='/penilaian/import'>
                        <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                        <Typography className="text-md">
                            Import Data
                        </Typography>
                    </Link>
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
                        <BarChartDept isSidebarOpen={isSidebarOpen} data={barChartData || []} detail={labelPenilaian}/>
                    </div>
                </Card>
            </div>
            <div className="my-3">
                <RadialChart 
                    isSidebarOpen={isSidebarOpen} 
                    data={dataPenilaian} 
                    value={dotm.total_nilai}
                    departmentName={dotm.nama_departemen} 
                    month={dotm.bulan}
                />
            </div>
             <Card className="p-4 border border-md border-black bg-white/5 backdrop-blur-md">
                <Typography variant="h5" className="mb-2 text-gray-700">Tabel Detail Penilaian</Typography>
                <Typography variant="small" className="mb-4 text-black">
                    Tabel ini berisi daftar lengkap hasil penilaian tiap anggota berdasarkan bulan yang dipilih.
                </Typography>
                <div className="my-3">
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
                <div className="w-full">
                    <Tables
                        title="Tabel Penilaian"
                        description={`List Nilai Anggota`}
                        columns={columnsPenilaian}
                        rows={data || []}
                        actionHidden={true}
                    />
                </div>
             </Card>
         </div>
    )
}