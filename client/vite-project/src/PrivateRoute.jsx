import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import authStore from "./consts/authStore";

export const PrivateRoute = () => {
  const { isLoggedIn } = authStore();

  return isLoggedIn ? <Outlet /> : <Navigate to="/auth" />;
};
