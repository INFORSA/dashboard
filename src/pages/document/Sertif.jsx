import { useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import {
  PlusIcon,
  CloudArrowUpIcon
} from "@heroicons/react/24/outline";
import { useDeleteSertifMutation, useGetSertifQuery, useUploadSertifMutation } from "../../services/staff";
import { TrashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function Sertif() {
  const [openModal, setOpenModal] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploadSertif, { isLoading }] = useUploadSertifMutation();
  const [deleteSertif] = useDeleteSertifMutation();

  const {
    data: sertifData,
    isLoading: isSertifLoading,
    refetch,
  } = useGetSertifQuery();

  const handleUpload = async () => {
    const formData = new FormData();
    for (let file of uploadFiles) {
      formData.append("files", file);
    }

    try {
      await uploadSertif(formData).unwrap();
      setOpenModal(false);
      setUploadFiles([]);
      refetch(); // refresh sertif list
    } catch (err) {
      console.error("Upload gagal:", err);
    }
  };

  const handleRemove = async (row) => {
        const ok = await Swal.fire({
            title: "Hapus sertif?",
            text: `Yakin hapus sertif ${row.path}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
        }).then((r) => r.isConfirmed);

        if (!ok) return;

        try {
            await deleteSertif(row.id_sertif).unwrap();
            toast.success("Sertif berhasil dihapus!");
            refetch();
        } catch (err) {
            console.log("RTK error →", err);  
        }
    };

  return (
    <div className="">
      <Card className="border border-black">
        <CardHeader floated={false} className="flex justify-between items-center shadow-none">
          <Typography variant="h5">Daftar Sertifikat</Typography>
          <Button
            size="sm"
            color="green"
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Tambah Sertifikat
          </Button>
        </CardHeader>
        <CardBody className="divide-y">
          {isSertifLoading ? (
            <Typography className="py-2 text-gray-500">Memuat data...</Typography>
          ) : sertifData?.data?.length > 0 ? (
            sertifData.data.map((item) => (
              <div key={item.id_sertif} className="py-2 flex justify-between items-center">
                <Typography className="truncate">{item.path}</Typography>
                <div className="flex gap-4 items-center">
                    <a
                        href={`${import.meta.env.VITE_API}/public/sertif/${item.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                    >
                    Lihat
                    </a>
                    <Button color="red" className="flex items-center gap-3" size="sm" onClick={() => handleRemove(item)}>
                        <TrashIcon strokeWidth={2} className="h-4 w-4" /> Remove
                    </Button>
                </div>
              </div>
            ))
          ) : (
            <Typography className="py-2 text-gray-500">Belum ada sertifikat</Typography>
          )}
        </CardBody>
      </Card>

      {/* Modal Upload */}
      <Dialog open={openModal} handler={() => setOpenModal(false)} size="md">
        <DialogHeader>
          <CloudArrowUpIcon className="w-6 h-6 mr-2" />
          Upload Sertifikat (PDF)
        </DialogHeader>
        <DialogBody>
          <Input
            type="file"
            multiple
            accept=".pdf"
            onChange={(e) => setUploadFiles(e.target.files)}
            label="Pilih file PDF (bisa banyak)"
          />
          <Typography className="text-sm mt-2 text-gray-600">
            Gunakan nama file sesuai dengan NIM, contoh: <code>2409116048.pdf</code>
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setOpenModal(false)} className="mr-2">
            Batal
          </Button>
          <Button
            color="green"
            onClick={handleUpload}
            disabled={uploadFiles.length === 0 || isLoading}
          >
            {isLoading ? "Mengunggah..." : "Unggah"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}