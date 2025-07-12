import { Link, useParams } from "react-router-dom";
import Carousels from "../../components/organisms/Carousels";
import { useEffect, useState } from "react";
import { Button, Option, Select, Typography } from "@material-tailwind/react";
import CountCard from "../../components/atoms/cards/CountCard";
import { useGetAnggotaByDepartQuery } from "../../services/user";
import { useGetNilaiQuery, useGetLineChartValueDepartQuery, useGetNilaiDetailQuery, useGetMaxNilaiQuery, 
    useGetBarChartValueQuery, 
    useGetRadarChartValueQuery, 
    useGetNilaiDeptQuery
} from "../../services/penilaian";
import { Tables } from "../../components/atoms/Tables";
import DepartCard from "../../components/atoms/cards/DepartCard";
import LineCharts from "../../components/atoms/charts/LineCharts";
import BarChart from "../../components/atoms/charts/BarCharts";
import RadarChart from "../../components/atoms/charts/RadarCharts";
import { useGetPengurusQuery, useGetReviewQuery } from "../../services/dept";
import Loading from "../loading/Loading";
import Error from "../error/Error";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import RadialChart from "../../components/atoms/charts/RadialCharts";

export default function Departement({isSidebarOpen, departemen, nama}){
    const { name } = useParams();
    const depart = departemen ?? name?.toUpperCase();
    const now = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const currentMonthStr = monthNames[now.getMonth()-1];
    const [form, setForm] = useState({
        waktu:currentMonthStr,
    });
    const month = form.waktu;
    const [ activeTable, setActiveTable ] = useState("grafik");
    const [ penilai, setPenilai ] = useState(null);
    const { data: departData, isLoading: departLoading, isError: departError } = useGetAnggotaByDepartQuery(depart);
    const { data: lineChartData, isLoading: lineChartLoading } = useGetLineChartValueDepartQuery(depart);
    const { data: barChartData, isLoading: barChartLoading } = useGetBarChartValueQuery(depart);
    const { data: radarChartData, isLoading: radarChartLoading } = useGetRadarChartValueQuery(depart);
    const { data: nilaiData, isLoading: nilaiLoading } = useGetNilaiQuery({depart, month});
    const { data: detailData, isLoading: detailLoading, refetch } = useGetNilaiDetailQuery({depart, month, penilai});
    const { data: pengurusData } = useGetPengurusQuery();   
    const { data: deptNilai, isLoading: deptLoading, isError: deptError } = useGetNilaiDeptQuery(month); 
    const { data: reviewData, isLoading: reviewLoading, refetch:reviewRefecth } = useGetReviewQuery({depart, month});
    const { data: maxNilaiData, isLoading: maxNilaiLoading } = useGetMaxNilaiQuery(month);
    const lastPerformance = lineChartData?.filter((item) => item.bulan === currentMonthStr);
    let dotm = null;
    // eslint-disable-next-line no-unused-vars
    let maxIndex = -1;

    if (deptNilai && deptNilai.length > 0) {
        const deptPerformance = deptNilai?.filter((item) => item.nama_departemen === depart);

        dotm = deptPerformance[0];
    }

    useEffect(() => {
        setPenilai(null);
    }, [name]);


    const columnsPenilaian = [
        { className:"w-10", key: "no", label: "No" },
        // { className:"", key: "penilai", label: "Penilai" },
        { className:"", key: "nama_anggota", label: "Nama Staff" },
        { className:"", key: "bulan", label: "Waktu" },
        { className:"", idKey: "id_detail_matriks_1", key: "nilai_matriks_1", label: "KN" },
        { className:"", idKey: "id_detail_matriks_2", key: "nilai_matriks_2", label: "KKT" },
        { className:"", idKey: "id_detail_matriks_3", key: "nilai_matriks_3", label: "INS" },
        { className:"", idKey: "id_detail_matriks_4", key: "nilai_matriks_4", label: "KK" },
        { className:"", idKey: "id_detail_matriks_5", key: "nilai_matriks_5", label: "KI" },
        { className:"", idKey: "id_detail_matriks_6", key: "nilai_matriks_6", label: "KP" },
        { className:"", idKey: "id_detail_matriks_7", key: "nilai_matriks_7", label: "KEK" },
        { className:"", key: "total_nilai", label: "Total" }
    ];
    
    if(penilai === null){
        columnsPenilaian.push(
            { className:"", key: "total_akhir", label: "Hasil" }
        );
    }

    const labelPenilaian = [
        { key: "nilai_matriks_1", label: "Kinerja" },
        { key: "nilai_matriks_2", label: "Kemampuan Kerja Tim" },
        { key: "nilai_matriks_3", label: "Inisiatif" },
        { key: "nilai_matriks_4", label: "Keterampilan Komunikasi" },
        { key: "nilai_matriks_5", label: "Kreativitas dan Inovasi" },
        { key: "nilai_matriks_6", label: "Kepemimpinan" },
        { key: "nilai_matriks_7", label: "Kepatuhan dan Etika Kerja" },
    ];

    const summaryPenilaian = [
        { key: "total_nilai", label: depart },
    ];

    if (departLoading || nilaiLoading || lineChartLoading || detailLoading || maxNilaiLoading
        || barChartLoading || deptLoading || reviewLoading
        || radarChartLoading
    ) return <Loading/>;
    if (departError || deptError) return <Error/>;
    
    return(
        <div className="h-full">
            <HelmetProvider><title>{departData.data[0].depart}</title></HelmetProvider>
            <div>
                <Carousels/>
            </div>
            <div className="flex w-full justify-between my-3 gap-4">
                <div className="w-1/3">
                    <Typography className="text-xl font-bold">{departData.data[0].nama_departemen}</Typography>
                    <Typography className="text-4xl font-bold">{departData.data[0].depart}</Typography>
                </div>
                <div className="w-2/3 flex gap-4 h-24">
                    <div className="w-full flex gap-4">
                        <CountCard Detail="Anggota" Count={departData.total}/>
                        <CountCard Detail="Performa" Count={lastPerformance[0]?.total_nilai ?? 0}/>
                    </div>
                    {maxNilaiData
                    ?.filter((item) => item.nama_departemen === depart)
                    .map((item, index) => (
                        <DepartCard key={index} Head="SOTM :" Detail={item.nama_anggota}/>
                    ))}
                </div>
            </div>
            <div className="flex gap-4 my-3">
                <Select
                    name="month"
                    label="Pilih Bulan"
                    value={form.waktu}
                    onChange={(val) => setForm({ ...form, waktu: val })}
                    animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                    }}
                    >
                    {lineChartData?.map((item, index) => (
                        <Option key={index} value={item.bulan}>
                            {item.bulan}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className="my-3">
                <RadialChart
                    isSidebarOpen={isSidebarOpen} 
                    title="Department of The Month"
                    data={reviewData} 
                    value={deptNilai.length > 0 ? dotm.total_akhir : 0}
                    departmentName={deptNilai.length > 0 ? dotm.nama_departemen : depart} 
                    month={deptNilai.length > 0 ? dotm.bulan : ""}
                    refetch={reviewRefecth}
                />
            </div>
            <section className="w-full">
                <div className="flex gap-4 justify-between mt-2">
                    <div className="flex gap-4">
                        <Button onClick={() => setActiveTable("grafik")} className={`px-4 py-2 rounded-bl-none rounded-br-none  ${activeTable === "grafik" ? "bg-blue-500 text-white" : "bg-gray-500"}`}>
                            Grafik
                        </Button>
                        <Button onClick={() => setActiveTable("detail")} className={`px-4 py-2 rounded-bl-none rounded-br-none  ${activeTable === "detail" ? "bg-blue-500 text-white" : "bg-gray-500"}`}>
                            Detail
                        </Button>
                    </div>
                    {/* <Button color="blue" size="sm" className="px-4 py-2 rounded-bl-none rounded-br-none">
                        <Link className="flex items-center gap-3" to='/permission/user/add-admin'>
                            <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                            <Typography className="text-md">
                                Tambah Penilaian
                            </Typography>
                        </Link>
                    </Button> */}
                </div>
                {activeTable === "grafik" ? (
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex justify-between gap-4 w-full">
                                <BarChart isSidebarOpen={isSidebarOpen} header="Komposisi Penilaian Tiap Anggota" data={barChartData || []} detail={labelPenilaian}/>
                                <RadarChart isSidebarOpen={isSidebarOpen} data={radarChartData || []} detail={labelPenilaian}/>
                                {/* <RadarChart isSidebarOpen={isSidebarOpen} /> */}
                            </div>
                            <div className="h-96">
                                <LineCharts isSidebarOpen={isSidebarOpen} data={lineChartData || []} detail={summaryPenilaian} title={`Penilaian Anggota ${depart}`}/>
                                {/* <LineCharts isSidebarOpen={isSidebarOpen} /> */}
                            </div>
                        </div>
                    </div>
                ):(
                    <div className="w-full overflow-x-auto">
                        <div className="flex gap-4 my-3">
                            <Select
                                name="month"
                                label="Pilih Bulan"
                                value={form.waktu}
                                onChange={(val) => setForm({ ...form, waktu: val })}
                                animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 25 },
                                }}
                                >
                                {lineChartData?.map((item, index) => (
                                    <Option key={index} value={item.bulan}>
                                        {item.bulan}
                                    </Option>
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
                                {pengurusData?.data.map((item) => (
                                    <Option
                                        hidden={item.dept !== depart}
                                        key={item?.id_pengurus} value={item?.keterangan}>
                                        {item?.keterangan}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="max-w-full">
                            <Tables
                                title="Tabel Penilaian"
                                description={`List Nilai Anggota ${departData.data[0].nama_departemen} (${departData.data[0].depart})`}
                                columns={columnsPenilaian}
                                rows={penilai === null ? nilaiData : detailData || []}
                                inlineEdit={penilai === nama ? true : false}
                                onRefetch={refetch}
                                actionHidden={true}
                                maxRow={10}
                                type="staff"
                            />
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}