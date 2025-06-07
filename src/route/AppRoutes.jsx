import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Departement from "../pages/dept/Departement";
import Upload from "../pages/penilaian/Upload";
import AddStaff from "../pages/permission/user/AddStaff";
import AddAdmin from "../pages/permission/user/AddAdmin";
import User from "../pages/permission/user/User";
import Role from "../pages/permission/role/Role";
import AddRole from "../pages/permission/role/AddRole";
import EditRole from "../pages/permission/role/EditRole";
import Login from "../pages/login/Login";
import ProtectedRoute from "./ProtectedRoute ";
import Penilaian from "../pages/penilaian/Penilaian";
import Profile from "../pages/profile/Profile";
import GuestRoute from "./GuestRoute";
import ImportExcel from "../app/import/Import";

const AppRoutes = ({ isSidebarOpen, login }) => {
  const depart = login?.departemen;
  const role = login?.role;
  const username = login?.username;

  return(
    <Routes>
      {/* Redirect semua rute tak dikenal */}
      <Route path="*" element={<Navigate to="/" />} />

      {/* Login tetap terbuka */}
      <Route path="/login" element={
      <GuestRoute>
        <Login />
      </GuestRoute>} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {role === "superadmin" && (
          <>
            <Route index path="/" element={<Dashboard isSidebarOpen={isSidebarOpen} />} />
            <Route path="/dept/:name" element={<Departement isSidebarOpen={isSidebarOpen}/>} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/permission/user" element={<User />} />
            <Route path="/permission/user/import" element={<ImportExcel dataImport="user"/>} />
            <Route path="/permission/anggota/import" element={<ImportExcel dataImport="anggota" />} />
            <Route path="/permission/user/add-admin" element={<AddAdmin />} />
            <Route path="/permission/user/add-staff" element={<AddStaff />} />
            <Route path="/permission/role" element={<Role />} />
            <Route path="/permission/role/add" element={<AddRole />} />
            <Route path="/permission/role/edit/:id" element={<EditRole />} />

            <Route path="/penilaian" element={<Penilaian />} />
            <Route path="/penilaian/import" element={<ImportExcel dataImport="penilaian" />} />
          </>
        )}
        {depart && role === "admin" && (
          <>
            <Route path="/" element={<Departement isSidebarOpen={isSidebarOpen} departemen={login.departemen}/>} />
          </>
        )}
        {role === "staff" && (
          <>
            <Route path="/" element={<Profile nama={username} isSidebarOpen={isSidebarOpen}/>} />
          </>
        )}
      </Route>
    </Routes>
  )
};

export default AppRoutes;
