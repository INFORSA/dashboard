import { useState } from "react";
import { useImportExcelMutation } from "../../../services/excel";
import { Button, Input, Typography } from "@material-tailwind/react";

export default function ImportExcel() {
  const [file, setFile] = useState(null);
  const [importExcel, { isLoading, isSuccess, data }] = useImportExcelMutation();

  const handleUpload = async () => {
    if (!file) return;
    try {
      await importExcel(file).unwrap();
      alert("Upload sukses!");
    } catch (err) {
      console.error("Gagal import:", err);
      alert("Gagal import");
    }
  };

  return (
    <div>
      <Typography className="text-xl font-semibold">Import Anggota</Typography>
      <Input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <div className="flex justify-end">
        <Button size="sm" color="yellow" className="my-3" onClick={handleUpload} disabled={isLoading}>
            {isLoading ? "Mengupload..." : "Upload Excel"}
        </Button>
      </div>

      {isSuccess && (
        <pre className="mt-4">{JSON.stringify(data.data, null, 2)}</pre>
      )}
    </div>
  );
}