import { useGetCurrentUserQuery } from '../../services/login';
import Admin from './Admin';
import SuperAdmin from './SuperAdmin';

export default function Dashboard({isSidebarOpen}){
    const {data} = useGetCurrentUserQuery();
    console.log(data);

    return(
        <div className="mx-auto w-full">
            {data.role === "superadmin" ? <SuperAdmin isSidebarOpen={isSidebarOpen}/>:<Admin/>}
        </div>
    )
}