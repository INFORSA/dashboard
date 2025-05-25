import Carousels from '../../components/organisms/Carousels';
import CountCard from '../../components/atoms/CountCard';
import GrafikCard from '../../components/atoms/GrafikCard';
// import { Tables } from '../../components/atoms/Tables';
import LineCharts from '../../components/atoms/LineCharts';
import { useGetDeptQuery } from '../../services/dept';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { useGetUserQuery } from '../../services/user';

export default function SuperAdmin({ isSidebarOpen }){
    const { data : deptData, error : deptError, isLoading : deptLoading } = useGetDeptQuery();
    const { data : userData, error : userError, isLoading : userLoading } = useGetUserQuery();
    if (deptLoading || userLoading) return <div>Loading...</div>;
    if (deptError || userError) return <div>Error</div>;

    return(
        <div className="mx-auto w-full">
            <HelmetProvider><title>Dashboard</title></HelmetProvider>
            <div className='my-5 w-full grid grid-cols-3 gap-4'>
                <CountCard Detail="Departement" Count={deptData.total}/>
                <CountCard Detail="Anggota" Count={userData.total}/>
                <CountCard Detail="Program Kerja" Count="0"/>
            </div>
            <Carousels/>
            <div className='mt-5 grid grid-cols-3 gap-4'>
                <GrafikCard Detail="Departemen" Count="0"/>
                <GrafikCard Detail="Staff" Count="0"/>
                <GrafikCard Detail="All" Count="0"/>
            </div>
            <div className='mt-5 max-w-full'>
                <LineCharts isSidebarOpen={isSidebarOpen}/>
            </div>
            <div className='mt-5'>
                {/* <Tables/> */}
            </div>
        </div>
    )
}