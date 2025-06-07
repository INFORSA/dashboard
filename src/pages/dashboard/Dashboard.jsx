import SuperAdmin from './SuperAdmin';

export default function Dashboard({isSidebarOpen}){

    return(
        <div className="mx-auto w-full">
            <SuperAdmin isSidebarOpen={isSidebarOpen}/>
        </div>
    )
}