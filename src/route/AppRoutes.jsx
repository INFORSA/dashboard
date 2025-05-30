import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Departement from "../pages/dept/Departement";
import Upload from "../pages/penilaian/Upload";
import UploadAnggota from "../pages/permission/user/Upload";
import AddStaff from "../pages/permission/user/AddStaff";
import AddAdmin from "../pages/permission/user/AddAdmin";
import User from "../pages/permission/user/User";
import Role from "../pages/permission/role/Role";
import AddRole from "../pages/permission/role/AddRole";
import EditRole from "../pages/permission/role/EditRole";
import Login from "../pages/login/Login";
import ProtectedRoute from "./ProtectedRoute ";

const AppRoutes = ({ isSidebarOpen }) => (
  <Routes>
    {/* Redirect semua rute tak dikenal */}
    <Route path="*" element={<Navigate to="/" />} />

    {/* Login tetap terbuka */}
    <Route path="/login" element={<Login />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route index path="/" element={<Dashboard isSidebarOpen={isSidebarOpen} />} />
      <Route path="/dept/:Name" element={<Departement />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/permission/user" element={<User />} />
      <Route path="/permission/user/import" element={<UploadAnggota dataImport="user"/>} />
      <Route path="/permission/anggota/import" element={<UploadAnggota dataImport="anggota" />} />
      <Route path="/permission/user/add-admin" element={<AddAdmin />} />
      <Route path="/permission/user/add-staff" element={<AddStaff />} />
      <Route path="/permission/role" element={<Role />} />
      <Route path="/permission/role/add" element={<AddRole />} />
      <Route path="/permission/role/edit/:id" element={<EditRole />} />
    </Route>
  </Routes>
);

export default AppRoutes;
