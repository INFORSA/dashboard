import Carousels from '../../components/organisms/Carousels';
import CountCard from '../../components/atoms/cards/CountCard';
import GrafikCard from '../../components/atoms/cards/GrafikCard';
// import { Tables } from '../../components/atoms/Tables';
import LineCharts from '../../components/atoms/charts/LineCharts';
import { useGetDeptQuery } from '../../services/dept';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { useGetUserQuery } from '../../services/user';
import DepartCard from '../../components/atoms/cards/DepartCard';
import { useGetAllNilaiQuery, useGetLineChartValueQuery, useGetMaxNilaiQuery } from '../../services/penilaian';
import Penilaian from '../penilaian/Penilaian';
import { Tables } from '../../components/atoms/Tables';
import Banner from '../../components/atoms/Banner';
import Loading from '../loading/Loading';
import Error from '../error/Error';

export default function SuperAdmin({ isSidebarOpen }){
    const { data : deptData, error : deptError, isLoading : deptLoading } = useGetDeptQuery();
    const { data : userData, error : userError, isLoading : userLoading } = useGetUserQuery();
    const { data: lineChartData, isLoading: lineChartLoading } = useGetLineChartValueQuery();
    const { data: nilaiData, isLoading: nilaiLoading, isError: nilaiError } = useGetAllNilaiQuery(5);
    const { data: maxNilaiData, isLoading: maxNilaiLoading } = useGetMaxNilaiQuery(5);
    const now = new Date();
    const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth()).padStart(2, "0")}`;

    const lastPerformance = lineChartData?.filter((item) => item.bulan === currentMonthStr);

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
    
    if (deptLoading || userLoading || lineChartLoading || nilaiLoading || maxNilaiLoading) return <Loading/>;
    if (deptError || userError || nilaiError) return <Error/>;

    const summaryPenilaian = [
        { key: "total_nilai", label: 'Rata-Rata Anggota' },
    ];

    return(
        <div className="mx-auto w-full">
            <HelmetProvider><title>Dashboard</title></HelmetProvider>
            <Banner/>
            <div className='my-5 w-full grid grid-cols-3 gap-4 h-24'>
                <CountCard Detail="Departement" Count={deptData.total}/>
                <CountCard Detail="Anggota" Count={userData.total}/>
                <CountCard Detail="Performa" Count={lastPerformance[0].total_nilai}/>
            </div>
            <Carousels/>
            <div className='mt-5'>
                <div className='mb-2'>
                    <h3 className='text-2xl font-semibold '>Staff Of The Month</h3>
                    <p className='text-md font-thin text-gray-700'>Celebrating outstanding performers from staff</p>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    {maxNilaiData.map((item) => (
                        <DepartCard key={item.nama_departemen} Head={`${item.nama_departemen} : `} Detail={item.nama_anggota}/>
                    ))}
                </div>
            </div>
            <div className='mt-5'>
                <LineCharts isSidebarOpen={isSidebarOpen} data={lineChartData || []} detail={summaryPenilaian}/>
            </div>
            <div className='mt-5 flex gap-2 max-w-full'>
                <div className='w-full overflow-x-auto'>
                    <Tables
                        maxRow={10}
                        title="Tabel Penilaian"
                        description={`List Nilai Anggota`}
                        columns={columnsPenilaian}
                        rows={nilaiData || []}
                        actionHidden={true}
                    />
                </div>
            </div>
        </div>
    )
}