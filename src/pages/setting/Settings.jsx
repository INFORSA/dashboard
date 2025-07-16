import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Dialog, DialogHeader, DialogBody, DialogFooter
} from "@material-tailwind/react";
import { useGetUserByNamaQuery, useUpdatePasswordMutation, useUpdateUsernameMutation } from "../../services/user";
import Loading from "../loading/Loading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

// ... (kode lain tetap sama)

export default function Settings({ nama, role }) {
  const { data: personalData, isLoading: personalLoading, isError: personalError } = useGetUserByNamaQuery(nama);
  const [isEditing, setIsEditing] = useState(false);
  const [openPassModal, setOpenPassModal] = useState(false);

  const [user, setUser] = useState(null);
  const [editForm, setEditForm] = useState({
    username: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    passwordLama: "",
    passwordBaru: "",
    konfirmasiPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const [updatePassword] = useUpdatePasswordMutation();
  const [updateUsername] = useUpdateUsernameMutation();

  const handleSave = async() => {
    try {
    await updateUsername({ usernameLama: user.username, usernameBaru: editForm.username, role: role }).unwrap(); // pastikan pakai .unwrap() kalau pakai RTK Query
    setUser({
      ...user,
      username: editForm.username
    });
    setIsEditing(false);
    toast.success("Username berhasil diperbarui!");
  } catch (error) {
    console.error("Gagal update username:", error);
    toast.error("Gagal memperbarui username!");
  }
  };

  const handleCancel = () => {
    setEditForm({ username: user.username });
    setIsEditing(false);
  };

  const handleSavePassword = async () => {
    const { passwordLama, passwordBaru, konfirmasiPassword } = passwordForm;

    if (passwordBaru !== konfirmasiPassword) {
      return Swal.fire("Gagal", "Konfirmasi password tidak cocok", "error");
    }

    try {
      await updatePassword({ passwordLama, passwordBaru }).unwrap();
      Swal.fire("Berhasil", "Password berhasil diubah", "success");
      setPasswordForm({ passwordLama: "", passwordBaru: "", konfirmasiPassword: "" });
      setOpenPassModal(false);
    } catch (err) {
      Swal.fire("Gagal", err?.data?.message || "Gagal mengubah password", "error");
    }
  };


  const getUserInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  useEffect(() => {
    if (personalData && personalData.length > 0) {
      const fetchedUser = personalData[0];
      setUser({
        username: fetchedUser.username,
        password: "********",
      });
      setEditForm({
        username: fetchedUser.username,
        password: "",
      });
    }
  }, [personalData]);

  if (personalLoading) return <Loading />;
  if (personalError) return <Error />;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Typography variant="h4" className="mb-6">Account Settings</Typography>
      <Card shadow={true} className="p-6">
        <CardBody>
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
              {getUserInitials(user?.username)}
            </div>
            <div>
              <Typography variant="h6">{user?.username}</Typography>
              <Typography variant="small" color="gray">Profile Picture</Typography>
            </div>
          </div>

          <div className="grid gap-6">
            <div>
              <Typography variant="small" color="blue-gray" className="mb-1">Username</Typography>
              {isEditing ? (
                <Input
                  name="username"
                  value={editForm?.username}
                  onChange={handleChange}
                  placeholder="Enter new username"
                />
              ) : (
                <Typography variant="paragraph">{user?.username}</Typography>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-3">
            <Button variant="outlined" color="gray" onClick={() => setOpenPassModal(true)}>
              Ubah Password
            </Button>
            {isEditing ? (
              <>
                <Button variant="outlined" color="gray" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button color="blue" onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <Button color="blue" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Modal Ubah Password */}
      <Dialog open={openPassModal} handler={() => setOpenPassModal(false)}>
        <DialogHeader>Ganti Password</DialogHeader>
        <DialogBody className="grid gap-4">
          <Input
            type="password"
            label="Password Lama"
            name="passwordLama"
            value={passwordForm.passwordLama}
            onChange={handlePasswordChange}
          />
          <Input
            type="password"
            label="Password Baru"
            name="passwordBaru"
            value={passwordForm.passwordBaru}
            onChange={handlePasswordChange}
          />
          <Input
            type="password"
            label="Konfirmasi Password Baru"
            name="konfirmasiPassword"
            value={passwordForm.konfirmasiPassword}
            onChange={handlePasswordChange}
          />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={() => setOpenPassModal(false)} className="mr-2">
            Batal
          </Button>
          <Button color="blue" onClick={handleSavePassword}>
            Simpan
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}