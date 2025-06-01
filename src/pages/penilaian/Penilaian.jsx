import { Button, Typography } from "@material-tailwind/react";
import { Tables } from "../../components/atoms/Tables";
import { useGetAllNilaiQuery } from "../../services/penilaian";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Penilaian(){
    const { data, isLoading, isError } = useGetAllNilaiQuery();

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

    if ( isLoading ) return <p>Loading data nilai...</p>;
    if ( isError ) return <p>Gagal mengambil data nilai.</p>;
    
    return(
         <div className="w-full overflow-x-auto">
            <Button color="blue" size="sm" className="mb-3">
                <Link className="flex items-center gap-3" to='/permission/user/add-admin'>
                    <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                    <Typography className="text-md">
                        Isi Penilaian
                    </Typography>
                </Link>
            </Button>
            <div className="w-full">
                <Tables
                    title="Tabel Penilaian"
                    description={`List Nilai Anggota`}
                    columns={columnsPenilaian}
                    rows={data || []}
                />
            </div>
         </div>
    )
}