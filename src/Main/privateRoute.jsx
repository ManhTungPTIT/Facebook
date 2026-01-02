import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const isAuth = Boolean(localStorage.getItem("acessToken"));

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
