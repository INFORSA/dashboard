import { Button, Option, Select, Typography } from "@material-tailwind/react";
import { Tables } from "../../../components/atoms/Tables";
import { useGetAllNilaiQuery } from "../../../services/penilaian";
import { Link } from "react-router-dom";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";

export default function Penilaian(){
    // Array nama bulan
    const monthOptions = [
        { label: "January", value: "01" },
        { label: "February", value: "02" },
        { label: "March", value: "03" },
        { label: "April", value: "04" },
        { label: "May", value: "05" },
        { label: "June", value: "06" },
        { label: "July", value: "07" },
        { label: "August", value: "08" },
        { label: "September", value: "09" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
    ];
    const [ month, setMonth ] = useState(new Date().getMonth().toString().padStart(2, "0"));
    const { data, isLoading, isError } = useGetAllNilaiQuery(month);

    const columnsPenilaian = [
        { className:"w-10", key: "no", label: "No" },
        { className:"", key: "nama_anggota", label: "Nama Staff" },
        { className:"", key: "nama_departemen", label: "Departemen" },
        { className:"", key: "waktu", label: "Waktu" },
        { className:"", idKey: "id_detail_matriks_1", key: "nilai_matriks_1", label: "KN" },
        { className:"", idKey: "id_detail_matriks_2", key: "nilai_matriks_2", label: "KKT" },
        { className:"", idKey: "id_detail_matriks_3", key: "nilai_matriks_3", label: "INS" },
        { className:"", idKey: "id_detail_matriks_4", key: "nilai_matriks_4", label: "KK" },
        { className:"", idKey: "id_detail_matriks_5", key: "nilai_matriks_5", label: "KI" },
        { className:"", idKey: "id_detail_matriks_6", key: "nilai_matriks_6", label: "KP" },
        { className:"", idKey: "id_detail_matriks_7", key: "nilai_matriks_7", label: "KEK" },
        { className:"", key: "total_nilai", label: "Total" },
    ];

    if ( isLoading ) return <Loading/>;
    if ( isError ) return <Error/>;
    
    return(
         <div className="w-full overflow-x-auto">
            <div className="flex gap-2">
                <Button color="blue" size="sm" className="mb-3">
                    <Link className="flex items-center gap-3" to='/penilaian/add'>
                        <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                        <Typography className="text-md">
                            Isi Penilaian
                        </Typography>
                    </Link>
                </Button>
                <Button color="blue-gray" size="sm" className="mb-3">
                    <Link className="flex items-center gap-3" to='/penilaian/import'>
                        <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                        <Typography className="text-md">
                            Import Data
                        </Typography>
                    </Link>
                </Button>
            </div>
            <div className="my-3">
                <Select
                    name="month"
                    label="Pilih Bulan"
                    value={month}
                    onChange={(val) => setMonth(val)}
                    animate={{
                        mount: { y: 0 },
                        unmount: { y: 25 },
                    }}
                    >
                    {monthOptions.map((item) => (
                        <Option key={item.value} value={item.value}>
                            {item.label ?? month}
                        </Option>
                    ))}
                    </Select>
            </div>
            <div className="w-full">
                <Tables
                    title="Tabel Penilaian"
                    description={`List Nilai Anggota`}
                    columns={columnsPenilaian}
                    rows={data || []}
                    actionHidden={true}
                />
            </div>
         </div>
    )
}