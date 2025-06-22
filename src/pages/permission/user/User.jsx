import { PlusIcon } from "@heroicons/react/24/solid";
import { Tables } from "../../../components/atoms/Tables";
import { useDeleteUserMutation, useGetAnggotaQuery, useGetUserQuery } from "../../../services/user";
import { Button, Option, Select, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import Loading from "../../loading/Loading";
import Swal from "sweetalert2";

export default function User(){
    const [activeTable, setActiveTable] = useState("user");
    const { data: userData, isLoading: isLoadingUser, refetch: refetchUser, } = useGetUserQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const { data: anggotaData, isLoading: isLoadingAnggota, refetch: refetchAnggota, } = useGetAnggotaQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
     const [deleteUser] = useDeleteUserMutation();
    const navigate = useNavigate();

    const handleEditAdmin = (row) => {
        if (row.nama_role?.toLowerCase() === "staff") {
            navigate(`/permission/user/edit-staff/${row.id_user}`)
        } else {
            navigate(`/permission/user/edit-admin/${row.id_user}`)
        }
    };
    const handleEditStaff = (row) => {
        navigate(`/permission/user/edit-staff/${row.user_id}`)
    };

    const handleRemove = async (row) => {
        const isUser = activeTable === "user";
        const confirmTitle = isUser ? "Hapus user?" : "Hapus anggota?";
        const confirmText = isUser
        ? `Yakin hapus user ${row.username || ""}?`
        : `Yakin hapus anggota ${row.nama_staff || ""}?`;

        const ok = await Swal.fire({
            title: confirmTitle,
            text: confirmText,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
        }).then((r) => r.isConfirmed);


        if (!ok) return;

        try {
            const res = await deleteUser(row.id_user).unwrap();
            Swal.fire("Terhapus", res.message, "success");
            activeTable === "user" ? refetchUser() : refetchAnggota();
        } catch (err) {
            console.log("RTK error →", err);  
            Swal.fire("Gagal", err?.data?.message || "Proses gagal", "error");
        }
    };

    const dataArray = activeTable === "user"
        ? (userData?.data ?? [])
        : (anggotaData?.data ?? []);
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
         const handleFocus = () => {
            if (activeTable === "user") {
                refetchUser();
            } else {
                refetchAnggota();
            }
        };

        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, [yearOptions, selectedYear, activeTable, refetchAnggota, refetchUser]);

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
                            onEdit={handleEditAdmin}
                            onRemove={handleRemove}
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
                                onEdit={handleEditStaff}
                                onRemove={handleRemove}
                             /> 
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}