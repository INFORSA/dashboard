import { PlusIcon } from "@heroicons/react/24/solid";
import { Tables } from "../../../components/atoms/Tables";
import { useAddRoleMutation, useGetRoleQuery, useDeleteRoleMutation } from "../../../services/user";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loading from "../../loading/Loading";

export default function Role(){
    const { data = [], isLoading, refetch } = useGetRoleQuery();
    const [deleteRole] = useDeleteRoleMutation();
    const navigate = useNavigate();

    const handleEdit = (row) => {
        navigate(`/permission/role/edit/${row.id_role}`);
    }

    const handleRemove = async (row) => {
        const ok = await Swal.fire({
            title: "Hapus role?",
            text: `Yakin hapus role ${row.nama_role}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
        }).then((r) => r.isConfirmed);

        if (!ok) return;

        try {
            const res = await deleteRole(row.id_role).unwrap();
            Swal.fire("Terhapus", res.message, "success");
            refetch();
        } catch (err) {
            console.log("RTK error →", err);  
            Swal.fire("Gagal", err?.data?.message || "Proses gagal", "error");
        }
    };

    const [registerAdmin] = useAddRoleMutation();

    const [open, setOpen] = React.useState(false);
 
    const handleOpen = () => setOpen(!open);
    
      const [form, setForm] = useState({
        nama_role:''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
      };
    
      const handleRegister = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('nama_role', form.nama_role);
    
        try {
          const response = await registerAdmin(formData);
          Swal.fire("Sukses", response.message, "success");
          setForm({ nama_role:'' });
          setOpen(false);
          refetch();
        } catch (err) {
          console.log('RTK error:', err);
          Swal.fire("Gagal", err?.data?.message || "Proses gagal", "error");
        }
      };

    const columnsUser = [
        { className:"w-10", key: "no", label: "No" },
        { className:"w-full", key: "nama_role", label: "Role" },
    ];

    return(
        <div>
            <HelmetProvider>
                <title>Daftar Role</title>
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
                                    Tambah Role
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
                            <Typography className='text-3xl font-semibold text-center mb-3'>Tambah Role</Typography>
                        </DialogHeader>
                        <form onSubmit={handleRegister}>
                            <DialogBody>
                                <Input
                                    type="text"
                                    name="nama_role"
                                    value={form.nama_role}
                                    onChange={handleChange}
                                    placeholder="Nama Role"
                                    label="Nama Role"
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
                    <Tables 
                        title="Tabel Role"
                        description="List Role Dashboard INFORSA"
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