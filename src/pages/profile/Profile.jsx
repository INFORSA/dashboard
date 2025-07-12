import { Button, Typography, Carousel } from "@material-tailwind/react";
import LineCharts from "../../components/atoms/charts/LineCharts";
import RadarChart from "../../components/atoms/charts/RadarCharts";
import { Tables } from "../../components/atoms/Tables";
import { useGetLineChartPersonalQuery, useGetNilaiPersonalQuery, useGetRadarChartPersonalQuery } from "../../services/penilaian";
import { useGetAnggotaByNamaQuery } from "../../services/user"
import Error from "../error/Error";
import Loading from "../loading/Loading";
import { ChevronLeftIcon, ChevronRightIcon, PrinterIcon } from "@heroicons/react/24/solid";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import { useCheckSertifQuery, useGetReviewQuery } from "../../services/staff";
import RadialChart from "../../components/atoms/charts/RadialCharts";

export default function Profile({ nama, isSidebarOpen }){
    const { data: personalData, isLoading: personalLoading, isError: personalError } = useGetAnggotaByNamaQuery(nama);
    const profilData = personalData ?? []
    const nim = profilData[0]?.nim;
    const { data: radarChartData, isLoading: radarChartLoading } = useGetRadarChartPersonalQuery(nama);
    const { data: nilaiData, isLoading: nilaiLoading, isError: nilaiError } = useGetNilaiPersonalQuery();
    const { data: chartData, isLoading: chartLoading, isError: chartError } = useGetLineChartPersonalQuery();
    const { data: sertifData, isLoading: sertifLoading, isError: sertifError } = useCheckSertifQuery(nim);
    const { data: reviewData, isLoading: reviewLoading } = useGetReviewQuery(nama);

    const isAvailable = sertifData?.available;

    const nilaiAkhir = chartData ?? [];
    const nilaiNumbers = nilaiAkhir.map((item) => parseFloat(item.total_nilai));
    const totalNilai = nilaiNumbers.reduce((sum, val) => sum + val, 0);
    const avgNilai = nilaiNumbers.length > 0 ? (totalNilai / nilaiNumbers.length).toFixed(2) : 0;
    
    const getStatusFeedback = (value) => {
        if (value < 50) return "Terus Semangat!";
        if (value < 61) return "Lumayan, Ayo Tingkatkan!";
        if (value < 81) return "Bagus, Pertahankan!";
        return "Sangat Bagus!";
    };

    const statusFeedback = getStatusFeedback(avgNilai);
    
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

    if(personalLoading || nilaiLoading || chartLoading || radarChartLoading || reviewLoading || sertifLoading) return <Loading/>
    if(personalError || nilaiError || chartError || sertifError) return <Error/>
    
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
                <Carousel
                    transition={{ duration: 0.5 }}
                    autoplay={false}
                    className="rounded-xl shadow-lg"
                    navigation={({ setActiveIndex, activeIndex, length }) => (
                        <div className="absolute inset-0 flex items-center justify-between px-4 z-0">
                        <button
                            onClick={() => setActiveIndex((activeIndex - 1 + length) % length)}
                            className="bg-white/80 text-blue-700 p-2 rounded-full shadow hover:bg-[#2647AC] hover:text-white"
                        >
                            <ChevronLeftIcon className="h-6 w-6" />
                        </button>
                        <button
                            onClick={() => setActiveIndex((activeIndex + 1) % length)}
                            className="bg-white/80 text-blue-700 p-2 rounded-full shadow hover:bg-[#2647AC] hover:text-white"
                        >
                            <ChevronRightIcon className="h-6 w-6" />
                        </button>
                        </div>
                    )}
                >
                    {nilaiData.map((item, index) =>{
                        const reviewMonth = reviewData.filter((review)=> review.waktu === item.bulan)
                        return(
                            <div key={index} className="">
                                <RadialChart
                                    title="Review Kinerja"
                                    isSidebarOpen={isSidebarOpen}
                                    data={reviewMonth}
                                    value={item.total_akhir}
                                    departmentName={`${nama}`}
                                    month={item.bulan}
                                />
                            </div>
                        )
                    })}
                </Carousel>
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
                <div className="w-3/5">
                    <LineCharts isSidebarOpen={isSidebarOpen} data={chartData || []} detail={summaryPenilaian}/>
                </div>
                <div className="w-2/5 flex flex-col justify-center items-center border border-black rounded-md p-5 hover:bg-white">
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
                            <h3>{statusFeedback}</h3>
                            <h3>{avgNilai}</h3>
                        </div>
                    </div>
                    <Button color="green" size="sm" className="my-3 w-full" disabled={!isAvailable}>
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