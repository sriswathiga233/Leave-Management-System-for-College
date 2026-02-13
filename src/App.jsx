import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/layout/Layout";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import StudentDashboard from "./pages/student/Dashboard";
import ApplyLeave from "./pages/student/ApplyLeave";
import History from "./pages/student/History";

import FacultyDashboard from "./pages/faculty/Dashboard";
import Requests from "./pages/faculty/Requests";

import AdminDashboard from "./pages/admin/Dashboard";
import UsersPage from "./pages/admin/Users";
import AllLeaves from "./pages/admin/Leaves";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Student Routes */}
          <Route element={<ProtectedRoute allowedRoles={['student']}><Layout /></ProtectedRoute>}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/apply" element={<ApplyLeave />} />
            <Route path="/student/history" element={<History />} />
          </Route>

          {/* Faculty Routes */}
          <Route element={<ProtectedRoute allowedRoles={['faculty']}><Layout /></ProtectedRoute>}>
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="/faculty/requests" element={<Requests />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']}><Layout /></ProtectedRoute>}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/leaves" element={<AllLeaves />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
