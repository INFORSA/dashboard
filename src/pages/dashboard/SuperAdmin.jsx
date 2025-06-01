import Carousels from '../../components/organisms/Carousels';
import CountCard from '../../components/atoms/CountCard';
import GrafikCard from '../../components/atoms/GrafikCard';
// import { Tables } from '../../components/atoms/Tables';
import LineCharts from '../../components/atoms/LineCharts';
import { useGetDeptQuery } from '../../services/dept';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { useGetUserQuery } from '../../services/user';
import DepartCard from '../../components/atoms/DepartCard';
import { useGetAllNilaiQuery, useGetLineChartValueQuery } from '../../services/penilaian';
import Penilaian from '../penilaian/Penilaian';
import { Tables } from '../../components/atoms/Tables';
import Banner from '../../components/atoms/Banner';

export default function SuperAdmin({ isSidebarOpen }){
    const { data : deptData, error : deptError, isLoading : deptLoading } = useGetDeptQuery();
    const { data : userData, error : userError, isLoading : userLoading } = useGetUserQuery();
    const { data: lineChartData, isLoading: lineChartLoading } = useGetLineChartValueQuery();
    const { data: nilaiData, isLoading: nilaiLoading, isError: nilaiError } = useGetAllNilaiQuery();
    
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
    
    if (deptLoading || userLoading || lineChartLoading || nilaiLoading) return <div>Loading...</div>;
    if (deptError || userError || nilaiError) return <div>Error</div>;

    const summaryPenilaian = [
        { key: "total_nilai", label: 'Rata-Rata Anggota' },
    ];

    return(
        <div className="mx-auto w-full">
            <HelmetProvider><title>Dashboard</title></HelmetProvider>
            <Banner/>
            <div className='my-5 w-full grid grid-cols-2 gap-4 h-24'>
                <CountCard Detail="Departement" Count={deptData.total}/>
                <CountCard Detail="Anggota" Count={userData.total}/>
            </div>
            <Carousels/>
            <div className='mt-5'>
                <h3 className='text-2xl font-semibold mb-2'>Staff Of The Month</h3>
                <div className='grid grid-cols-3 gap-4'>
                    <DepartCard Head="HRD" Detail="A"/>
                    <DepartCard Head="RELACS" Detail="A"/>
                    <DepartCard Head="PSD" Detail="A"/>
                    <DepartCard Head="ADWEL" Detail="A"/>
                    <DepartCard Head="COMINFO" Detail="A"/>
                    <DepartCard Head="EDEN" Detail="A"/>
                </div>
            </div>
            <div className='mt-5 flex gap-2 max-w-full'>
                <LineCharts isSidebarOpen={isSidebarOpen} data={lineChartData || []} detail={summaryPenilaian}/>
                <div className='w-full overflow-x-auto'>
                    <Tables
                        title="Tabel Penilaian"
                        description={`List Nilai Anggota`}
                        columns={columnsPenilaian}
                        rows={nilaiData || []}
                    />
                </div>
            </div>
        </div>
    )
}