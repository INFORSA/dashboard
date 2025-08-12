import { PlusIcon } from "@heroicons/react/24/solid";
import { Tables } from "../../../components/atoms/Tables";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../loading/Loading";
import { useAddDeptMutation, useDeleteDeptMutation, useGetDeptQuery, useUpdateDeptMutation } from "../../../services/dept";

export default function Departemen(){
    const { data = [], isLoading, refetch } = useGetDeptQuery();
    const [deleteDept] = useDeleteDeptMutation();

    const handleEdit = (row) => {
        setOriginalData({
            id: row.id_depart,   
            nama: row.keterangan,
            nilai: row.nilai,
            singkatan: row.nama,
        });
        setEditForm({
            id: row.id_depart,   
            nama: row.keterangan,
            nilai: row.nilai,
            singkatan: row.nama,
        });
        setIsEdit(true);
    };

    const handleRemove = async (row) => {
        const ok = await Swal.fire({
            title: "Hapus Departemen?",
            text: `Yakin hapus Departemen ${row.nama}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
        }).then((r) => r.isConfirmed);

        if (!ok) return;

        try {
            const res = await deleteDept(row.id_depart).unwrap();
            Swal.fire("Terhapus", res.message, "success");
            refetch();
        } catch (err) {
            console.log("RTK error →", err);  
            Swal.fire("Gagal", err?.data?.message || "Proses gagal", "error");
        }
    };

    const [addDept] = useAddDeptMutation();
    const [editDept] = useUpdateDeptMutation();

    const [isEdit, setIsEdit] = useState(false);
    const [originalData, setOriginalData] = useState({ nama: "", singkatan: "", nilai:0 });
    const [editForm, setEditForm] = useState({ id: "", nama: "", singkatan: "", nilai:0});
    const isChanged = JSON.stringify(editForm) !== JSON.stringify(originalData);
    const [open, setOpen] = React.useState(false);
 
    const handleOpen = () => setOpen(!open);
    
    const [form, setForm] = useState({
        nama:'',
        nilai:'',
        keterangan:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nama', form.nama);
        formData.append('nilai', form.nilai);
        formData.append('keterangan', form.keterangan);
        
        try {
            const response = await addDept(formData).unwrap();
            Swal.fire("Sukses", response.message, "success");
            setForm({ nama:'', keterangan:'' });
            setOpen(false);
            refetch();
        } catch (err) {
            console.log('RTK error:', err);
            setOpen(false);
            Swal.fire("Gagal", err?.data?.message || "Proses gagal", "error");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await editDept({
                id: editForm.id,
                nama: editForm.singkatan,
                nilai: editForm.nilai,
                keterangan: editForm.nama,
            }).unwrap();
            Swal.fire("Berhasil", res.message, "success");
            refetch();
            setIsEdit(false);
        } catch (err) {
            console.log("Edit error:", err);
            setIsEdit(false);
            Swal.fire("Gagal", err?.data?.message || "Gagal update data", "error");
        }
    };

    const columnDepart = [
        { className:"w-10", key: "no", label: "No" },
        { className:"w-full", key: "keterangan", label: "Nama Departemen" },
        { className:"w-full", key: "nama", label: "Singkatan" },
        { className:"w-full", key: "nilai", label: "Target Nilai" },
    ];

    return(
        <div>
            <HelmetProvider>
                <title>Daftar Departemen</title>
            </HelmetProvider>
            {isLoading ? (
                <Loading/>
            ):(
                <div className="">
                    <div className="flex items-center gap-3">
                        <Button onClick={handleOpen} color="blue" size="sm" className="mb-3">
                            <div className="flex items-center gap-3">
                                <PlusIcon strokeWidth={2} className="h-4 w-4" /> 
                                <Typography className="text-md">
                                    Tambah Departemen
                                </Typography>
                            </div>
                        </Button>
                    </div>
                    <Dialog
                        open={open}
                        handler={handleOpen}
                        animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                        }}
                    >
                        <DialogHeader>
                            <Typography className='text-3xl font-semibold text-center mb-3'>Tambah Departemen</Typography>
                        </DialogHeader>
                        <form onSubmit={handleAdd}>
                            <DialogBody>
                                <Input
                                    type="text"
                                    name="keterangan"
                                    value={form.keterangan}
                                    onChange={handleChange}
                                    placeholder="Nama Departemen"
                                    label="Nama Departemen"
                                    required
                                />
                                <br />
                                <Input
                                    type="text"
                                    name="nama"
                                    value={form.nama}
                                    onChange={handleChange}
                                    placeholder="Singkatan Departemen"
                                    label="Singkatan Departemen"
                                    required
                                />
                                <br />
                                <Input
                                    type="number"
                                    name="nilai"
                                    value={form.nilai}
                                    onChange={handleChange}
                                    placeholder="Target Nilai Anggota"
                                    label="Target Nilai Anggota"
                                    required
                                />
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleOpen}
                                    className="mr-1"
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button variant="gradient" color="green" type="submit">
                                    <span>Tambah</span>
                                </Button>
                            </DialogFooter>
                        </form>
                    </Dialog>
                    <Dialog
                        open={isEdit}
                        handler={() => setIsEdit(!isEdit)}
                        animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0.9, y: -100 },
                        }}
                        >
                        <DialogHeader>
                            <Typography className='text-3xl font-semibold text-center mb-3'>
                                Edit Departemen
                            </Typography>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit}>
                            <DialogBody>
                                <Input
                                    type="text"
                                    name="keterangan"
                                    value={editForm.nama}
                                    onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })}
                                    placeholder="Nama Departemen"
                                    label="Nama Departemen"
                                    required
                                />
                                <br />
                                <Input
                                    type="text"
                                    name="nama"
                                    value={editForm.singkatan}
                                    onChange={(e) => setEditForm({ ...editForm, singkatan: e.target.value })}
                                    placeholder="Singkatan Departemen"
                                    label="Singkatan Departemen"
                                    required
                                />
                                <br />
                                <Input
                                    type="number"
                                    name="nilai"
                                    value={editForm.nilai}
                                    onChange={(e) => setEditForm({ ...editForm, nilai: e.target.value })}
                                    placeholder="Target Nilai Anggota"
                                    label="Target Nilai Anggota"
                                    required
                                />
                            </DialogBody>
                            <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={() => setIsEdit(false)}
                                className="mr-1"
                            >
                                <span>Batal</span>
                            </Button>
                            <Button variant="gradient" color="green" type="submit" disabled={!isChanged}>
                                <span>Simpan Perubahan</span>
                            </Button>
                            </DialogFooter>
                        </form>
                    </Dialog>
                    <Tables 
                        title="Tabel Matriks Penilaian"
                        description="List Matriks Penilaian Staff INFORSA"
                        columns={columnDepart}
                        rows={data.data || []}
                        onEdit={handleEdit}
                        onRemove={handleRemove}
                    />
                </div>
            )}
        </div>
    )
}