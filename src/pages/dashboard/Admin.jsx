import CountCard from '../../components/atoms/CountCard';
import GrafikCard from '../../components/atoms/GrafikCard';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

export default function Admin(){

    return(
        <div className="mx-auto w-full">
            <HelmetProvider><title>Dashboard</title></HelmetProvider>
            <div className='my-5 w-full grid grid-cols-3 gap-4'>
                <CountCard Detail="Departement" Count="0"/>
                <CountCard Detail="Anggota" Count="0"/>
                <CountCard Detail="Program Kerja" Count="0"/>
            </div>
            <div className='mt-5 grid grid-cols-2 gap-4'>
                <GrafikCard Detail="Departemen" Count="0"/>
                <GrafikCard Detail="Staff" Count="0"/>
            </div>
        </div>
    )
}