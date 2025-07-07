import { PlusIcon } from "@heroicons/react/24/solid";
import { Tables } from "../../../components/atoms/Tables";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../loading/Loading";
import { useAddMatriksMutation, useDeleteMatriksMutation, useGetMatriksQuery, useUpdateMatriksMutation } from "../../../services/penilaian";

export default function Matriks(){
    const { data = [], isLoading, refetch } = useGetMatriksQuery();
    const [deleteRole] = useDeleteMatriksMutation();

    const handleEdit = (row) => {
        setEditForm({
            id: row.id_matriks,   
            nama: row.nama,
            bobot: row.bobot,
        });
        setIsEdit(true);
    };

    const handleRemove = async (row) => {
        const ok = await Swal.fire({
            title: "Hapus Matrik?",
            text: `Yakin hapus matrik ${row.nama}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
        }).then((r) => r.isConfirmed);

        if (!ok) return;

        try {
            const res = await deleteRole(row.id_matriks).unwrap();
            Swal.fire("Terhapus", res.message, "success");
            refetch();
        } catch (err) {
            console.log("RTK error →", err);  
            Swal.fire("Gagal", err?.data?.message || "Proses gagal", "error");
        }
    };

    const [addMatriks] = useAddMatriksMutation();
    const [editMatriks] = useUpdateMatriksMutation();

    const [isEdit, setIsEdit] = useState(false);
    const [editForm, setEditForm] = useState({ id: "", nama: "", bobot: 1 });
    const [open, setOpen] = React.useState(false);
 
    const handleOpen = () => setOpen(!open);
    
    const [form, setForm] = useState({
        nama:'',
        bobot:1
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nama_matriks', form.nama);
        formData.append('bobot', form.bobot);
        
        try {
            const response = await addMatriks(formData);
            Swal.fire("Sukses", response.message, "success");
            setForm({ nama:'', bobot:1 });
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
            const res = await editMatriks({
                id: editForm.id,
                nama: editForm.nama,
                bobot: editForm.bobot,
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

    const columnsUser = [
        { className:"w-10", key: "no", label: "No" },
        { className:"w-full", key: "nama", label: "Matriks" },
        { className:"w-full", key: "bobot", label: "Bobot" },
    ];

    return(
        <div>
            <HelmetProvider>
                <title>Daftar Matriks</title>
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
                                    Tambah Matriks
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
                            <Typography className='text-3xl font-semibold text-center mb-3'>Tambah Matriks</Typography>
                        </DialogHeader>
                        <form onSubmit={handleAdd}>
                            <DialogBody>
                                <Input
                                    type="text"
                                    name="nama"
                                    value={form.nama}
                                    onChange={handleChange}
                                    placeholder="Nama Matrik"
                                    label="Nama Matrik"
                                    required
                                    />
                                <br />
                                <Input
                                    type="number"
                                    name="bobot"
                                    value={form.bobot}
                                    onChange={handleChange}
                                    placeholder="Bobot Matrik"
                                    label="Bobot Matrik"
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
                                Edit Matriks
                            </Typography>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit}>
                            <DialogBody>
                            <Input
                                type="text"
                                name="nama"
                                value={editForm.nama}
                                onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })}
                                placeholder="Nama Matrik"
                                label="Nama Matrik"
                                required
                            />
                            <br />
                            <Input
                                type="number"
                                name="bobot"
                                value={editForm.bobot}
                                onChange={(e) => setEditForm({ ...editForm, bobot: e.target.value })}
                                placeholder="Bobot Matrik"
                                label="Bobot Matrik"
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
                            <Button variant="gradient" color="green" type="submit">
                                <span>Simpan Perubahan</span>
                            </Button>
                            </DialogFooter>
                        </form>
                        </Dialog>
                    <Tables 
                        title="Tabel Matriks Penilaian"
                        description="List Matriks Penilaian Staff INFORSA"
                        columns={columnsUser}
                        rows={data || []}
                        onEdit={handleEdit}
                        onRemove={handleRemove}
                    />
                </div>
            )}
        </div>
    )
}