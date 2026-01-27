import { Button, Carousel, Option, Select } from "@material-tailwind/react";
import LineCharts from "../../components/atoms/charts/LineCharts";
import RadarChart from "../../components/atoms/charts/RadarCharts";
import { Tables } from "../../components/atoms/Tables";
import { useGetLineChartPersonalQuery, useGetNilaiPersonalQuery, useGetRadarChartPersonalQuery } from "../../services/penilaian";
import { useGetAnggotaByNamaQuery } from "../../services/user";
import Error from "../error/Error";
import Loading from "../loading/Loading";
import { ChevronLeftIcon, ChevronRightIcon, PrinterIcon } from "@heroicons/react/24/solid";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import { useCheckSertifQuery, useGetReviewQuery } from "../../services/staff";
import RadialChart from "../../components/atoms/charts/RadialCharts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile({ nama, isSidebarOpen }){
    const { username } = useParams();
    const namaAnggota = nama ?? username;

    const navigate = useNavigate();

    const currentYear = new Date().getFullYear();
    const startYear = 2025;

    const periodeList = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => (startYear + i).toString()
    );
    const [periode, setPeriode] = useState(currentYear.toString());

    const isUserReady = Boolean(namaAnggota);
    
    const { data: personalData, isLoading: personalLoading, isError: personalError } = useGetAnggotaByNamaQuery(namaAnggota, {skip: !isUserReady});

    const profilData = personalData ?? []
    const nim = profilData[0]?.nim;
    const isNimReady = Boolean(nim);

    const { data: radarChartData, isLoading: radarChartLoading } = useGetRadarChartPersonalQuery(username, {skip: !isUserReady});
    const { data: nilaiData, isLoading: nilaiLoading, isError: nilaiError } = useGetNilaiPersonalQuery({username, periode}, {skip: !isUserReady});
    const { data: chartData, isLoading: chartLoading, isError: chartError } = useGetLineChartPersonalQuery({username, periode}, {skip: !isUserReady});
    const { data: sertifData, isLoading: sertifLoading, isError: sertifError } = useCheckSertifQuery(nim, {skip: !isNimReady});
    const { data: reviewData, isLoading: reviewLoading, refetch } = useGetReviewQuery(namaAnggota, {skip: !isUserReady});

    const nilaiAkhir = chartData ?? [];
    const nilaiNumbers = nilaiAkhir.map((item) => parseFloat(item.total_nilai));
    const totalNilai = nilaiNumbers.reduce((sum, val) => sum + val, 0);
    const avgNilai = nilaiNumbers.length > 0 ? (totalNilai / nilaiNumbers.length).toFixed(2) : 0;

    const isAvailable = sertifData?.available && avgNilai >= personalData[0].nilai;
    
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
        { key: "total_nilai", label: namaAnggota },
    ];

    useEffect(() => {
        if (!personalLoading && personalData && personalData.length === 0) {
            navigate("/", { replace: true });
        }
    }, [personalLoading, personalData, navigate]);

    if(personalLoading || nilaiLoading || chartLoading || radarChartLoading || reviewLoading || sertifLoading) return <Loading/>
    if(personalError || nilaiError || chartError || sertifError) return <Error/>
    
    return(
        <div className="my-3 lg:max-w-[82vw]">
            <HelmetProvider><title>{personalData[0].nama_staff}</title></HelmetProvider>
            <div className="flex flex-col-reverse lg:flex-row justify-between border border-black rounded-md p-5 hover:bg-white">
                <table className="">
                    <tbody>    
                        <tr className="text-md">
                            <td className="font-semibold">Nama</td>
                            <td className="px-3">:</td>
                            <td>{personalData[0].nama_staff}</td>
                        </tr>
                        <tr className="text-md">
                            <td className="font-semibold">Departemen</td>
                            <td className="px-3">:</td>
                            <td>{personalData[0].nama_departemen}</td>
                        </tr>
                        <tr className="text-md">
                            <td className="font-semibold">NIM</td>
                            <td className="px-3">:</td>
                            <td>{personalData[0].nim}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    {personalData[0].gambar ? (
                        <div className="flex justify-center mb-5 lg:my-0">
                            <img 
                                src={`http://localhost:3000/uploads/${personalData[0].gambar}`}
                                // src={`https://dashboard-api.inforsa-unmul.org/uploads/${personalData[0].gambar}`}
                                alt="Foto Staff"
                                className="w-28 h-28 lg:w-20 lg:h-20 rounded-full object-cover"
                            />
                        </div>
                    ):(
                        <div className="flex justify-center mb-5 lg:my-0">
                            <div className="w-28 h-28 lg:w-20 lg:h-20 bg-gray-700 rounded-full"></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-3 space-y-3">
                <div className="flex justify-end w-full">
                    <Select
                        label="Pilih Periode"
                        value={periode}
                        onChange={(val) => setPeriode(val)}
                    >
                        {periodeList.map((p) => (
                        <Option key={p} value={p}>
                            Periode {p}
                        </Option>
                        ))}
                    </Select>
                </div>
                <Carousel
                    transition={{ duration: 0.5 }}
                    autoplay={false}
                    className="rounded-xl shadow-lg"
                    navigation={({ setActiveIndex, activeIndex, length }) => (
                        <div className="absolute inset-0 flex items-center justify-between px-4 z-0 pointer-events-none">
                        <button
                            onClick={() => setActiveIndex((activeIndex - 1 + length) % length)}
                            className="bg-white/80 text-blue-700 p-2 rounded-full shadow hover:bg-[#2647AC] hover:text-white pointer-events-auto"
                        >
                            <ChevronLeftIcon className="h-6 w-6" />
                        </button>
                        <button
                            onClick={() => setActiveIndex((activeIndex + 1) % length)}
                            className="bg-white/80 text-blue-700 p-2 rounded-full shadow hover:bg-[#2647AC] hover:text-white pointer-events-auto"
                        >
                            <ChevronRightIcon className="h-6 w-6" />
                        </button>
                        </div>
                    )}
                >
                    {nilaiData.map((item, index) =>{
                        const reviewMonth = reviewData.filter((review)=> review.waktu === item.bulan)
                        return(
                            <div key={index} className="z-10">
                                <RadialChart
                                    title="Review Kinerja"
                                    isSidebarOpen={isSidebarOpen}
                                    data={reviewMonth}
                                    value={item.total_akhir}
                                    departmentName={`${namaAnggota}`}
                                    month={item.bulan}
                                    refetch={refetch}
                                />
                            </div>
                        )
                    })}
                </Carousel>
            </div>
            <div className="mt-3">
                <Tables
                    title="Tabel Penilaian Pribadi"
                    description={`List Nilai ${namaAnggota}`}
                    columns={columnsPenilaian}
                    rows={nilaiData}
                    actionHidden={true}
                />
            </div>
            <div className="mt-3">
                <RadarChart isSidebarOpen={isSidebarOpen} data={radarChartData || []} detail={labelPenilaian}/>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 my-3">
                <div className="lg:w-3/5 w-full">
                    <LineCharts isSidebarOpen={isSidebarOpen} data={chartData || []} detail={summaryPenilaian}/>
                </div>
                <div className="lg:w-2/5 w-full flex flex-col justify-center items-start border border-black rounded-md p-5 hover:bg-white">
                    <div className="flex gap-3">
                        <div className="font-semibold text-md">
                            <h3>Status</h3>
                            <h3>Nilai</h3>
                        </div>
                        <div>
                            <h3>:</h3>
                            <h3>:</h3>
                        </div>
                        <div className="font-base text-md">
                            <h3>{statusFeedback}</h3>
                            <h3>{avgNilai} dari {personalData[0].nilai}</h3>
                        </div>
                    </div>
                    {avgNilai < personalData[0].nilai && 
                        <p className="text-red-800 text-sm">Nilai tidak mencukupi karena berada dibawah rata-rata yang ditentukan</p>
                    }
                    {!sertifData?.available && 
                        <p className="text-red-800 text-sm mt-2">Sertif belum diupload</p>
                    }
                    <Button color="green" size="sm" className="my-3 w-full" disabled={!isAvailable}>
                        <div className="flex items-center justify-center gap-3">
                            <PrinterIcon strokeWidth={2} className="h-4 w-4" /> 
                            <a
                                href={`${import.meta.env.VITE_API}/staff/sertif/download/${personalData[0].nim}.pdf`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm"
                            >
                                Cetak Sertifikat
                            </a>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )
}