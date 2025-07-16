import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Departement from "../pages/dept/Departement";
import AddStaff from "../pages/permission/user/AddStaff";
import AddAdmin from "../pages/permission/user/AddAdmin";
import User from "../pages/permission/user/User";
import Role from "../pages/permission/role/Role";
import AddRole from "../pages/permission/role/AddRole";
import EditRole from "../pages/permission/role/EditRole";
import Login from "../pages/login/Login";
import ProtectedRoute from "./ProtectedRoute ";
import Penilaian from "../pages/performa/penilaian/Penilaian";
import GuestRoute from "./GuestRoute";
import ImportExcel from "../app/import/Import";
import Matriks from "../pages/performa/matriks/Matriks";
import EditUser from "../pages/permission/user/EditUser";
import EditStaff from "../pages/permission/user/EditStaff";
import Settings from "../pages/setting/Settings";
import Sertif from "../pages/document/Sertif";
import Profile from "../pages/profile/Profile";

const AppRoutes = ({ isSidebarOpen, login }) => {
  const depart = login?.departemen;
  const role = login?.role;
  const username = login?.username;
  const keterangan = login?.keterangan;

  return(
    <Routes>
      {/* Redirect semua rute tak dikenal */}
      <Route path="*" element={<Navigate to="/" />} />

      {/* Login tetap terbuka */}
      <Route path="/login" element={
        <GuestRoute>
        <Login />
      </GuestRoute>} />
      <Route path="/" element={
        login ? (
          role === "superadmin" || role === "dosen" ? <Dashboard isSidebarOpen={isSidebarOpen} /> :
          role === "admin" ? <Departement isSidebarOpen={isSidebarOpen} departemen={login.departemen} nama={keterangan}/> :
          role === "staff" ? <Profile nama={username} isSidebarOpen={isSidebarOpen}/> :
          <Navigate to="/login" />
        ) : (
          <Navigate to="/login" />
        )
      } />


      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {role === "superadmin" && (
          <>
            {/* <Route index path="/" element={<Dashboard isSidebarOpen={isSidebarOpen} />} /> */}
            <Route path="/dept/:name" element={<Departement isSidebarOpen={isSidebarOpen}/>} />

            <Route path="/permission/user" element={<User />} />
            <Route path="/permission/user/import" element={<ImportExcel dataImport="user"/>} />
            <Route path="/permission/anggota/import" element={<ImportExcel dataImport="anggota" />} />
            <Route path="/permission/user/add-admin" element={<AddAdmin />} />
            <Route path="/permission/user/add-staff" element={<AddStaff />} />
            <Route path="/permission/user/edit-admin/:id" element={<EditUser />} />
            <Route path="/permission/user/edit-staff/:id" element={<EditStaff />} />

            <Route path="/permission/role" element={<Role />} />
            <Route path="/permission/role/add" element={<AddRole />} />
            <Route path="/permission/role/edit/:id" element={<EditRole />} />

            <Route path="/hasil-penilaian" element={<Penilaian isSidebarOpen={isSidebarOpen} nama={username} />} />
            <Route path="/penilaian/import/staff" element={<ImportExcel dataImport="penilaian" jenisPenilaian="staff" />} />
            <Route path="/penilaian/import/departemen" element={<ImportExcel dataImport="penilaian" jenisPenilaian="departemen" />} />
            
            <Route path="/matriks-penilaian" element={<Matriks />} />

            <Route path="/document/sertif" element={<Sertif />} />

            <Route path="/profile/:username" element={<Profile isSidebarOpen={isSidebarOpen} />} />
            <Route path="/setting/profile" element={<Settings nama={username} role={role} />} />
          </>
        )}
        {role === "dosen" && (
          <>
            <Route path="/dept/:name" element={<Departement isSidebarOpen={isSidebarOpen}/>} />

            <Route path="/hasil-penilaian" element={<Penilaian isSidebarOpen={isSidebarOpen}/>} />

            <Route path="/setting/profile" element={<Settings nama={username} />} />
          </>
        )}
        {depart && role === "admin" && (
          <>
            {/* <Route path="/" element={<Departement isSidebarOpen={isSidebarOpen} departemen={login.departemen}/>} /> */}
            <Route path="/profile/:username" element={<Profile isSidebarOpen={isSidebarOpen} />} />
          </>
        )}
        {role === "staff" && (
          <>
            {/* <Route path="/" element={<Profile nama={username} isSidebarOpen={isSidebarOpen}/>} /> */}
            <Route path="/setting/profile" element={<Settings nama={username} />} />
          </>
        )}
      </Route>
    </Routes>
  )
};

export default AppRoutes;
