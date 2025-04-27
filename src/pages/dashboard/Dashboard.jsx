import { Card, Typography } from '@material-tailwind/react';
import Carousels from '../../components/organisms/Carousels';
import CountCard from '../../components/atoms/CountCard';
import { Helmet } from 'react-helmet';
import GrafikCard from '../../components/atoms/GrafikCard';
import { Tables } from '../../components/atoms/Tables';
import LineCharts from '../../components/atoms/LineCharts';

export default function Dashboard({ isSidebarOpen }){
    return(
        <div className="mx-auto w-full">
            <Helmet><title>Dashboard</title></Helmet>
            <div className='my-5 w-full grid grid-cols-3 gap-4'>
                <CountCard Detail="Departement" Count="0"/>
                <CountCard Detail="Anggota" Count="0"/>
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
                <Tables/>
            </div>
        </div>
    )
}