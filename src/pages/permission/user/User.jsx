import { PlusIcon } from "@heroicons/react/24/solid";
import { Tables } from "../../../components/atoms/Tables";
import { useGetAnggotaQuery, useGetUserQuery } from "../../../services/user";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState } from "react";

export default function User(){
    const [activeTable, setActiveTable] = useState("user");
    const { data: userData, isLoading: isLoadingUser } = useGetUserQuery();
    const { data: anggotaData, isLoading: isLoadingAnggota } = useGetAnggotaQuery();

    const data = activeTable === "user" ? userData : anggotaData;
    const isLoading = activeTable === "user" ? isLoadingUser : isLoadingAnggota;

    const columnsUser = [
        { className:"w-10", key: "no", label: "No" },
        { className:"w-1/3", key: "username", label: "Username" },
        { className:"w-1/3", key: "nama_role", label: "Role" },
    ];
    const columnsAnggota = [
        { className:"w-10", key: "no", label: "No" },
        { className:"w-1/4", key: "nama_staff", label: "Nama Anggota" },
        { className:"w-1/4", key: "nim", label: "NIM" },
        { className:"w-2/4", key: "nama_departemen", label: "Departemen" },
    ];
    return(
        <div>
            <Helmet>
                <title>Daftar Pengguna</title>
            </Helmet>
            {isLoading ? (
                <p>Loading....</p>
            ):(
                <div className="">
                    <div className="flex items-center gap-3">
                        <Button color="blue" size="sm" className="mb-3">
                            <Link className="flex items-center gap-3" to='/permission/user/add-admin'>
                                <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                                <Typography className="text-md">
                                    Tambah Admin
                                </Typography>
                            </Link>
                        </Button>
                        <Button color="cyan" size="sm" className="mb-3">
                            <Link className="flex items-center gap-3" to='/permission/user/add-staff'>
                                <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                                <Typography className="text-md">
                                    Tambah Anggota
                                </Typography>
                            </Link>
                        </Button>
                    </div>
                    <div className="flex gap-2 justify-center">
                        <Button onClick={() => setActiveTable("user")} className={`px-4 py-2 rounded-bl-none rounded-br-none  ${activeTable === "user" ? "bg-blue-500 text-white" : "bg-gray-500"}`}>
                            Tabel User
                        </Button>
                        <Button onClick={() => setActiveTable("anggota")} className={`px-4 py-2 rounded-bl-none rounded-br-none  ${activeTable === "anggota" ? "bg-blue-500 text-white" : "bg-gray-500"}`}>
                            Tabel Anggota
                        </Button>
                    </div>
                    {activeTable === "user" ? (
                        <Tables 
                            title="Tabel Pengguna"
                            description="List pengguna Dashboard INFORSA"
                            columns={columnsUser}
                            rows={data || []}
                        />
                    ):(
                       <Tables 
                            title="Tabel Anggota"
                            description="List Anggota INFORSA"
                            columns={columnsAnggota}
                            rows={data || []}
                        /> 
                    )}
                </div>
            )}
        </div>
    )
}