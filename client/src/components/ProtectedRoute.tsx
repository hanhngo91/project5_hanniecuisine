import { useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import { useEffect } from "react";
import AdminPage from "../pages/AdminPage";
import AdminLogin from "../pages/AdminLogin";

const useAuth = () => {
  const adminToken = getCookie("adminToken");
  let navigate = useNavigate();

  useEffect(() => {
    if (adminToken === undefined || adminToken === null) {
      navigate("/");
    } else {
      navigate("/admin/home");
    }
  }, [adminToken]);
  return adminToken ? true : false;
};

function ProtectedRoute() {
  const isAdmin = useAuth();

  return <>{isAdmin ? <AdminPage /> : <AdminLogin />}</>;
}

export default ProtectedRoute;
