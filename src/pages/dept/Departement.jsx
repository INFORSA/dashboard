import { useParams } from "react-router-dom";
import Carousels from "../../components/organisms/Carousels";
import { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import GrafikCard from "../../components/atoms/GrafikCard";
import CountCard from "../../components/atoms/CountCard";
import { useGetAnggotaByDepartQuery } from "../../services/user";
import { useGetNilaiQuery } from "../../services/penilaian";
import { Tables } from "../../components/atoms/Tables";

export default function Departement(){
    const { name } = useParams();
    const depart = name.toUpperCase();
    const [activeTable, setActiveTable] = useState("grafik");
    const { data: departData, isLoading: departLoading, isError: departError } = useGetAnggotaByDepartQuery(depart);
    const { data: nilaiData, isLoading: nilaiLoading } = useGetNilaiQuery(depart);

    const columnsPenilaian = [
        { className:"w-10", key: "no", label: "No" },
        { className:"min-w-[180px]", key: "nama_anggota", label: "Nama Staff" },
        { className:"min-w-[100px]", key: "nama_departemen", label: "Departemen" },
        { className:"min-w-[100px]", key: "waktu", label: "Waktu" },
        { className:"min-w-[50px]", key: "nilai_matriks_1", label: "KN" },
        { className:"min-w-[50px]", key: "nilai_matriks_2", label: "KKT" },
        { className:"min-w-[50px]", key: "nilai_matriks_3", label: "INS" },
        { className:"min-w-[50px]", key: "nilai_matriks_4", label: "KK" },
        { className:"min-w-[50px]", key: "nilai_matriks_5", label: "KI" },
        { className:"min-w-[50px]", key: "nilai_matriks_6", label: "KP" },
        { className:"min-w-[50px]", key: "nilai_matriks_7", label: "KEK" },
        { className:"min-w-[50px]", key: "total_nilai", label: "Total" },
    ];

    if (departLoading || nilaiLoading) return <p>Loading data anggota...</p>;
    if (departError) return <p>Gagal mengambil data anggota.</p>;

    return(
        <div>
            <Carousels/>
            <div className="flex w-full justify-between my-3 gap-2">
                <div className="w-1/3">
                    <Typography className="text-xl font-bold">{departData[0].nama_departemen}</Typography>
                    <Typography className="text-4xl font-bold">{departData[0].depart}</Typography>
                </div>
                <div className="w-2/3 flex gap-2">
                    <CountCard Detail="Anggota" Count="0"/>
                    <CountCard Detail="Rata-Rata Penilaian" Count="50"/>
                </div>
            </div>
            <section>
                <div className="flex gap-2 justify-start mt-2">
                    <Button onClick={() => setActiveTable("grafik")} className={`px-4 py-2 rounded-bl-none rounded-br-none  ${activeTable === "grafik" ? "bg-blue-500 text-white" : "bg-gray-500"}`}>
                        Grafik
                    </Button>
                    <Button onClick={() => setActiveTable("detail")} className={`px-4 py-2 rounded-bl-none rounded-br-none  ${activeTable === "detail" ? "bg-blue-500 text-white" : "bg-gray-500"}`}>
                        Detail
                    </Button>
                </div>
                {activeTable === "grafik" ? (
                    <div className="border border-md border-black rounded-md flex gap-2 p-3">
                        <div className="flex flex-col gap-2 w-2/3">
                            <div className="flex justify-center items-center gap-3">
                                <GrafikCard Detail="Departemen" Count="0"/>
                                <GrafikCard Detail="Departemen" Count="0"/>
                            </div>
                            <GrafikCard Detail="Departemen" Count="0"/>
                        </div>
                        <div className="w-1/3 flex flex-col gap-2">
                            <CountCard Detail="Program Kerja" Count="0"/>
                            <CountCard Detail="Program Kerja" Count="0"/>
                            <CountCard Detail="Program Kerja" Count="0"/>
                        </div>
                    </div>
                ):(
                    <Tables
                        title="Tabel Penilaian"
                        description={`List Nilai Anggota ${departData[0].nama_departemen} (${departData[0].depart})`}
                        columns={columnsPenilaian}
                        rows={nilaiData || []}
                    />
                )}
            </section>
        </div>
    )
}