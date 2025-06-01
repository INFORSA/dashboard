import { Link, useParams } from "react-router-dom";
import Carousels from "../../components/organisms/Carousels";
import { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import CountCard from "../../components/atoms/CountCard";
import { useGetAnggotaByDepartQuery } from "../../services/user";
import { useGetNilaiQuery, useGetLineChartValueDepartQuery, useGetBarChartValueQuery, useGetRadarChartValueQuery } from "../../services/penilaian";
import { Tables } from "../../components/atoms/Tables";
import DepartCard from "../../components/atoms/DepartCard";
import LineCharts from "../../components/atoms/LineCharts";
import BarChart from "../../components/atoms/BarCharts";
import RadarChart from "../../components/atoms/RadarCharts";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Departement({isSidebarOpen}){
    const { name } = useParams();
    const depart = name.toUpperCase();
    const [activeTable, setActiveTable] = useState("grafik");
    const { data: departData, isLoading: departLoading, isError: departError } = useGetAnggotaByDepartQuery(depart);
    const { data: lineChartData, isLoading: lineChartLoading } = useGetLineChartValueDepartQuery(depart);
    const { data: barChartData, isLoading: barChartLoading } = useGetBarChartValueQuery(depart);
    const { data: radarChartData, isLoading: radarChartLoading } = useGetRadarChartValueQuery(depart);
    const { data: nilaiData, isLoading: nilaiLoading } = useGetNilaiQuery(depart);
    // console.log(radarChartData)

    const columnsPenilaian = [
        { className:"w-10", key: "no", label: "No" },
        { className:"", key: "nama_anggota", label: "Nama Staff" },
        { className:"", key: "nama_departemen", label: "Departemen" },
        { className:"", key: "waktu", label: "Waktu" },
        { className:"", key: "nilai_matriks_1", label: "KN" },
        { className:"", key: "nilai_matriks_2", label: "KKT" },
        { className:"", key: "nilai_matriks_3", label: "INS" },
        { className:"", key: "nilai_matriks_4", label: "KK" },
        { className:"", key: "nilai_matriks_5", label: "KI" },
        { className:"", key: "nilai_matriks_6", label: "KP" },
        { className:"", key: "nilai_matriks_7", label: "KEK" },
        { className:"", key: "total_nilai", label: "Total" },
    ];

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

    if (departLoading || nilaiLoading || lineChartLoading || barChartLoading || radarChartLoading) return <p>Loading data anggota...</p>;
    if (departError) return <p>Gagal mengambil data anggota.</p>;

    return(
        <div className="h-full">
            <div>
                <Carousels/>
            </div>
            <div className="flex w-full justify-between my-3 gap-2">
                <div className="w-1/3">
                    <Typography className="text-xl font-bold">{departData[0].nama_departemen}</Typography>
                    <Typography className="text-4xl font-bold">{departData[0].depart}</Typography>
                </div>
                <div className="w-2/3 flex gap-2 h-24">
                    <CountCard Detail="Anggota" Count="0"/>
                    <CountCard Detail="Rata-Rata Penilaian" Count="50"/>
                    <DepartCard Head="Top Staff" Detail="A"/>
                </div>
            </div>
            <section className="w-full">
                <div className="flex gap-2 justify-between mt-2">
                    <div className="flex gap-2">
                        <Button onClick={() => setActiveTable("grafik")} className={`px-4 py-2 rounded-bl-none rounded-br-none  ${activeTable === "grafik" ? "bg-blue-500 text-white" : "bg-gray-500"}`}>
                            Grafik
                        </Button>
                        <Button onClick={() => setActiveTable("detail")} className={`px-4 py-2 rounded-bl-none rounded-br-none  ${activeTable === "detail" ? "bg-blue-500 text-white" : "bg-gray-500"}`}>
                            Detail
                        </Button>
                    </div>
                    <Button color="blue" size="sm" className="px-4 py-2 rounded-bl-none rounded-br-none">
                        <Link className="flex items-center gap-3" to='/permission/user/add-admin'>
                            <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                            <Typography className="text-md">
                                Isi Penilaian
                            </Typography>
                        </Link>
                    </Button>
                </div>
                {activeTable === "grafik" ? (
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between gap-2 w-full">
                                <BarChart isSidebarOpen={isSidebarOpen} data={barChartData || []} detail={labelPenilaian}/>
                                <RadarChart isSidebarOpen={isSidebarOpen} data={radarChartData || []} detail={labelPenilaian}/>
                                {/* <RadarChart isSidebarOpen={isSidebarOpen} /> */}
                            </div>
                            <div className="h-96">
                                <LineCharts isSidebarOpen={isSidebarOpen} data={lineChartData || []} detail={summaryPenilaian}/>
                                {/* <LineCharts isSidebarOpen={isSidebarOpen} /> */}
                            </div>
                        </div>
                    </div>
                ):(
                    <div className="w-full overflow-x-auto">
                        <div className="flex justify-end">
                            
                        </div>
                        <div className="max-w-full">
                            <Tables
                                title="Tabel Penilaian"
                                description={`List Nilai Anggota ${departData[0].nama_departemen} (${departData[0].depart})`}
                                columns={columnsPenilaian}
                                rows={nilaiData || []}
                            />
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}