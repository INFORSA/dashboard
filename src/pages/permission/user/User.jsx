import { PlusIcon } from "@heroicons/react/24/solid";
import { Tables } from "../../../components/atoms/Tables";
import { useGetAnggotaQuery, useGetUserQuery } from "../../../services/user";
import { Button, Option, Select, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import Loading from "../../loading/Loading";

export default function User(){
    const [activeTable, setActiveTable] = useState("user");
    const { data: userData, isLoading: isLoadingUser } = useGetUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const { data: anggotaData, isLoading: isLoadingAnggota } = useGetAnggotaQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const dataArray = activeTable === "user"
        ? (userData?.data ?? [])
        : (anggotaData ?? []);
    const isLoading = activeTable === "user" ? isLoadingUser : isLoadingAnggota;

    const yearOptions = [...new Set(
    dataArray.map((item) => {
        const nim = item.nim?.toString();
        if (!nim || nim.length < 2) return null;
        return "20" + nim.slice(0, 2); // "21" -> "2021"
    }).filter(Boolean) // hapus null/undefined
    )].sort().reverse(); 

    const [selectedYear, setSelectedYear] = useState("");

    // Filter anggota berdasarkan tahun dari nim
    const filteredData = dataArray.filter((item) =>
        item.nim?.toString().startsWith(selectedYear.slice(2))
    );

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

    useEffect(() => {
        if (!selectedYear && yearOptions.length > 0) {
            setSelectedYear(yearOptions[0]);
        }
    }, [yearOptions, selectedYear]);

    return(
        <div>
            <HelmetProvider>
                <title>Daftar Pengguna</title>
            </HelmetProvider>
            {isLoading ? (
                <Loading/>
            ):(
                <div className="">
                    <div className="flex items-center gap-3 mb-3">
                        {activeTable === "user" ? (
                            <>
                            <Button color="blue" size="sm" className="mb-3">
                                <Link className="flex items-center gap-3" to='/permission/user/add-admin'>
                                    <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                                    <Typography className="text-md">
                                        Tambah User
                                    </Typography>
                                </Link>
                            </Button>
                            <Button color="yellow" size="sm" className="mb-3">
                                <Link className="flex items-center gap-3" to='/permission/user/import'>
                                    <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                                    <Typography className="text-md">
                                        Import User
                                    </Typography>
                                </Link>
                            </Button>
                            </>
                        ):(
                            <>
                            <Button color="cyan" size="sm" className="mb-3">
                                <Link className="flex items-center gap-3" to='/permission/user/add-staff'>
                                    <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                                    <Typography className="text-md">
                                        Tambah Anggota
                                    </Typography>
                                </Link>
                            </Button>
                            <Button color="yellow" size="sm" className="mb-3">
                                <Link className="flex items-center gap-3" to='/permission/anggota/import'>
                                    <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                                    <Typography className="text-md">
                                        Import Anggota
                                    </Typography>
                                </Link>
                            </Button>
                            </>
                        )}
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
                            rows={userData.data || []}
                        />
                    ):(
                        <div>
                            <div className="my-3">
                                <Select
                                    name='year'
                                    label="Pilih Tahun"
                                    value={selectedYear}
                                    onChange={(val) => setSelectedYear(val)}
                                    animate={{
                                        mount: { y: 0 },
                                        unmount: { y: 25 },
                                    }}
                                >
                                    {isLoading ? 
                                    (<Option disabled>Loading...</Option>)
                                    :
                                    (
                                        yearOptions.map((item)=>(
                                            <Option key={item} value={item}>{item}</Option>
                                        ))
                                    )}
                                </Select>
                            </div>
                            <Tables 
                                title="Tabel Anggota"
                                description="List Anggota INFORSA"
                                columns={columnsAnggota}
                                rows={filteredData || []}
                             /> 
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}