import LineCharts from "../../components/atoms/LineCharts";
import { Tables } from "../../components/atoms/Tables";
import { useGetLineChartPersonalQuery, useGetNilaiPersonalQuery } from "../../services/penilaian";
import { useGetAnggotaByNamaQuery } from "../../services/user"

export default function Profile({ nama, isSidebarOpen }){
    const { data: personalData, isLoading: personalLoading, isError: personalError } = useGetAnggotaByNamaQuery(nama);
    const { data: nilaiData, isLoading: nilaiLoading, isError: nilaiError } = useGetNilaiPersonalQuery();
    const { data: chartData, isLoading: chartLoading, isError: chartError } = useGetLineChartPersonalQuery();
    
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

    const summaryPenilaian = [
        { key: "total_nilai", label: nama },
    ];

    if(personalLoading || nilaiLoading || chartLoading) return <p>Loading...</p>
    if(personalError || nilaiError || chartError) return <p>Error...</p>
    return(
        <div className="my-3">
            <div className="flex justify-between border border-black rounded-md p-5">
                <div className="flex gap-2">
                    <div>
                        <h3>Nama</h3>
                        <h3>Departemen</h3>
                        <h3>NIM</h3>
                    </div>
                    <div>
                        <h3>:</h3>
                        <h3>:</h3>
                        <h3>:</h3>
                    </div>
                    <div>
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
            <div className="my-3">
                <LineCharts isSidebarOpen={isSidebarOpen} data={chartData || []} detail={summaryPenilaian}/>    
            </div>
        </div>
    )
}