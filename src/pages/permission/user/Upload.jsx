import { useState } from "react";
import { useImportAnggotaMutation, useImportUserMutation } from "../../../services/excel";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ImportExcel({dataImport}) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [importAnggota, { isLoading , isSuccess, data }] = useImportAnggotaMutation(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,  }  
  );
  const [importUser] = useImportUserMutation(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,  
  });

  const handleUpload = async () => {
    if (!file) return;
    try {
      dataImport === "user" ? (await importUser(file).unwrap()) : (await importAnggota(file).unwrap());
      await Swal.fire({
          title: "Sukses Import Data",
          icon: "success",
      });
      navigate("/permission/user");
    } catch (err) {
      console.error("Gagal import:", err);
      alert("Gagal import");
    }
  };

  return (
    <div>
      <Typography className="text-xl font-semibold">Import {dataImport}</Typography>
      <Input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <div className="flex justify-end">
          <Button size="sm" color="yellow" className="my-3" onClick={handleUpload} disabled={isLoading}>
              {isLoading ? "Mengupload..." : (dataImport === "user" ? "Upload User" : "Upload Anggota")}
          </Button>
      </div>

      {isSuccess && (
        <pre className="mt-4">{JSON.stringify(data.data, null, 2)}</pre>
      )}
    </div>
  );
}