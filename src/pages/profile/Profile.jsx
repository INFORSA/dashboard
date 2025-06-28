import { Button, Typography } from "@material-tailwind/react";
import LineCharts from "../../components/atoms/charts/LineCharts";
import RadarChart from "../../components/atoms/charts/RadarCharts";
import { Tables } from "../../components/atoms/Tables";
import { useGetLineChartPersonalQuery, useGetNilaiPersonalQuery, useGetRadarChartPersonalQuery } from "../../services/penilaian";
import { useGetAnggotaByNamaQuery } from "../../services/user"
import Error from "../error/Error";
import Loading from "../loading/Loading";
import { PrinterIcon } from "@heroicons/react/24/solid";
import { HelmetProvider } from "@dr.pogodin/react-helmet";

export default function Profile({ nama, isSidebarOpen }){
    const { data: personalData, isLoading: personalLoading, isError: personalError } = useGetAnggotaByNamaQuery(nama);
    const { data: radarChartData, isLoading: radarChartLoading } = useGetRadarChartPersonalQuery(nama);
    const { data: nilaiData, isLoading: nilaiLoading, isError: nilaiError } = useGetNilaiPersonalQuery();
    const { data: chartData, isLoading: chartLoading, isError: chartError } = useGetLineChartPersonalQuery();
    
    const columnsPenilaian = [
        { className:"w-10", key: "no", label: "No" },
        { className:"", key: "nama_anggota", label: "Nama Staff" },
        { className:"", key: "nama_departemen", label: "Departemen" },
        { className:"", key: "bulan", label: "Waktu" },
        { className:"", key: "nilai_matriks_1", label: "KN" },
        { className:"", key: "nilai_matriks_2", label: "KKT" },
        { className:"", key: "nilai_matriks_3", label: "INS" },
        { className:"", key: "nilai_matriks_4", label: "KK" },
        { className:"", key: "nilai_matriks_5", label: "KI" },
        { className:"", key: "nilai_matriks_6", label: "KP" },
        { className:"", key: "nilai_matriks_7", label: "KEK" },
        { className:"", key: "total_nilai", label: "Total" },
        { className:"", key: "total_akhir", label: "Hasil" },
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
        { key: "total_nilai", label: nama },
    ];

    if(personalLoading || nilaiLoading || chartLoading || radarChartLoading) return <Loading/>
    if(personalError || nilaiError || chartError) return <Error/>
    
    return(
        <div className="my-3">
            <HelmetProvider><title>{personalData[0].nama_staff}</title></HelmetProvider>
            <div className="flex justify-between border border-black rounded-md p-5 hover:bg-white">
                <div className="flex gap-3">
                    <div className="font-semibold text-md">
                        <h3>Nama</h3>
                        <h3>Departemen</h3>
                        <h3>NIM</h3>
                    </div>
                    <div>
                        <h3>:</h3>
                        <h3>:</h3>
                        <h3>:</h3>
                    </div>
                    <div className="font-base text-md">
                        <h3>{personalData[0].nama_staff}</h3>
                        <h3>{personalData[0].nama_departemen}</h3>
                        <h3>{personalData[0].nim}</h3>
                    </div>
                </div>
                <div>
                    {personalData[0].gambar ? (
                        <img src="" alt="" />
                    ):(
                        <div className="w-20 h-20 bg-gray-700 rounded-full"></div>
                    )}
                </div>
            </div>
            <div className="mt-3">
                <Tables
                    title="Tabel Penilaian Pribadi"
                    description={`List Nilai ${nama}`}
                    columns={columnsPenilaian}
                    rows={nilaiData}
                    actionHidden={true}
                />
            </div>
            <div className="mt-3">
                <RadarChart isSidebarOpen={isSidebarOpen} data={radarChartData || []} detail={labelPenilaian}/>
            </div>
            <div className="flex gap-4 my-3">
                <div className="w-3/4">
                    <LineCharts isSidebarOpen={isSidebarOpen} data={chartData || []} detail={summaryPenilaian}/>
                </div>
                <div className="w-1/4 flex flex-col justify-center items-center border border-black rounded-md p-5 hover:bg-white">
                    <div className="flex gap-3">
                        <div className="font-semibold text-md">
                            <h3>Status</h3>
                            <h3>Rata-Rata</h3>
                        </div>
                        <div>
                            <h3>:</h3>
                            <h3>:</h3>
                        </div>
                        <div className="font-base text-md">
                            <h3>Baik</h3>
                            <h3>67</h3>
                        </div>
                    </div>
                    <Button color="green" size="sm" className="my-3 w-full">
                        <div className="flex items-center justify-center gap-3">
                            <PrinterIcon strokeWidth={2} className="h-4 w-4" /> 
                            <Typography className="text-md">
                                Cetak Sertifikat
                            </Typography>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )
}