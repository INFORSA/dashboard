import { useState } from "react";
import { useImportAnggotaMutation, useImportPenilaianDepartemenMutation, useImportPenilaianStaffMutation, useImportUserMutation } from "../../services/excel";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ImportExcel({dataImport, jenisPenilaian}) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [importAnggota, { isLoading , isSuccess, data }] = useImportAnggotaMutation(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,  }  
  );
  const [importUser, {isLoading:loadingUser}] = useImportUserMutation(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,  
  });
  const [importPenilaianStaff, {isLoading:loadingPenilaianStaff}] = useImportPenilaianStaffMutation(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,  
  });
  const [importPenilaianDepartemen, {isLoading:loadingPenilaianDept}] = useImportPenilaianDepartemenMutation(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,  
  });

  const handleUpload = async () => {
    if (!file) return;
    try {
      if (dataImport === "penilaian") {
          if (jenisPenilaian === "staff") {
             await importPenilaianStaff(file).unwrap();
          } else if (jenisPenilaian === "departemen") {
             await importPenilaianDepartemen(file).unwrap();
          } else {
              throw new Error("Jenis penilaian tidak valid");
          }
      } else if (dataImport === "user") {
         await importUser(file).unwrap();
      } else if (dataImport === "anggota") {
         await importAnggota(file).unwrap();
      } else {
          throw new Error("Jenis data import tidak valid");
      }

      await Swal.fire({
          title: "Sukses Import Data",
          icon: "success",
      });
      dataImport === "penilaian" ? navigate("/penilaian") : navigate("/permission/user");
    } catch (err) {
      console.error("Gagal import:", err);
      alert("Gagal import");
    }
  };

  return (
    <div>
      <Typography className="text-xl font-semibold">Import {dataImport} {jenisPenilaian}</Typography>
      <Input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <div className="flex justify-end">
          <Button size="sm" color="yellow" className="my-3" onClick={handleUpload} disabled={isLoading}>
              {isLoading || loadingPenilaianDept || loadingPenilaianStaff || loadingUser ? "Mengupload..." : "Upload"}
          </Button>
      </div>

      {isSuccess && (
        <pre className="mt-4">{JSON.stringify(data.data, null, 2)}</pre>
      )}
    </div>
  );
}