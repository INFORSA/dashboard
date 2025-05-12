import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Tables } from "../../../components/atoms/Tables";
import { useGetUserQuery } from "../../../services/user";
import { Button } from "@material-tailwind/react";

export default function User(){
    const { data, isLoading } = useGetUserQuery();
    const columns = [
        { className:"w-10", key: "no", label: "No" },
        { className:"w-1/3", key: "username", label: "Username" },
        { className:"w-1/3", key: "role", label: "Role" },
    ];
    return(
        <div>
            {isLoading ? (
                <p>Loading....</p>
            ):(
                <div className="">
                    <Button color="blue" className="flex items-center gap-3 mb-3" size="sm">
                        <PlusIcon strokeWidth={2} className="h-4 w-4" /> Tambah
                    </Button>
                    <Tables 
                        title="Tabel Pengguna"
                        description="List pengguna Dashboard INFORSA"
                        columns={columns}
                        rows={data || []}
                    />
                </div>
            )}
        </div>
    )
}