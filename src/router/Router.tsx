import { ROUTES } from "@/constants/routes";
import RootLayout from "@/layouts/RootLayout";
import { lazy } from "react";
import { BrowserRouter, Route, RouteObject, Routes } from "react-router-dom";
import { AdminProtectedRoute, UserProtectedRoute } from "./RoleProtectedRoutes";
import { PUBLIC_ROUTES } from "./PublicRoutes";
import { USER_ROUTES } from "./UserRoutes";

const Welcome = lazy(() => import("@/pages/Welcome"));

const Router = () => {
  const convertRouteObjectToRoute = (routeObjects: RouteObject[]) => {
    return routeObjects.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ));
  };

  const publicRoutes = convertRouteObjectToRoute(PUBLIC_ROUTES);
  const userProtectedRoutes = convertRouteObjectToRoute(USER_ROUTES);

  return (
    <BrowserRouter>
      <div className="appContainer">
        <div className="app">
          <Routes>
            <Route path={ROUTES.HOME} element={<RootLayout />}>
              <Route index element={<Welcome />} />
              {publicRoutes}
            </Route>
            <Route element={<UserProtectedRoute />}>
              <Route element={<RootLayout />}>{userProtectedRoutes}</Route>
            </Route>
            <Route element={<AdminProtectedRoute />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Router;
