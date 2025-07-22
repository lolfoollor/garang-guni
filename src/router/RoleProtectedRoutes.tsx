import { useAppSelector } from "@/app/hooks";
import { ROUTES } from "@/constants/routes";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

export enum ROLES {
  USER = "USER",
  ADMIN = "ADMIN",
  BUYER = "BUYER",
}

interface RoleProtectedRouteProps {
  role: ROLES;
}

const RoleProtectedRoute = ({ role }: RoleProtectedRouteProps) => {
  const user = useAppSelector(selectCurrentUser);
  const hasRequiredRole = user?.roles?.includes(role);

  if (!user) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  if (!hasRequiredRole) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
};

const createRoleProtectedRoute = (role: ROLES) => {
  return () => <RoleProtectedRoute role={role} />;
};

export const UserProtectedRoute = createRoleProtectedRoute(ROLES.USER);
export const AdminProtectedRoute = createRoleProtectedRoute(ROLES.ADMIN);
export const BuyerProtectedRoute = createRoleProtectedRoute(ROLES.BUYER);
