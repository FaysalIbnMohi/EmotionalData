import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../utils/auth";

export const ProtectedRoute = () => {
	const userData = auth.getUserData();
	return userData ? <Outlet /> : <Navigate to="/login" />;
};
