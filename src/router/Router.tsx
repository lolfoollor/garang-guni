import { ROUTES } from "@/constants/routes";
import RootLayout from "@/layouts/RootLayout";
import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Welcome = lazy(() => import("@/pages/Welcome"));
const Contact = lazy(() => import("@/pages/Contact"));
const Auth = lazy(() => import("@/pages/auth/Auth"));
const BookNow = lazy(() => import("@/pages/BookNow"));
const Rates = lazy(() => import("@/pages/Rates"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const Schedule = lazy(() => import("@/pages/Schedule"));
const TermsAndPrivacy = lazy(() => import("@/pages/TermsAndPrivacy"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const NotImplemented = lazy(() => import("@/pages/NotImplemented"));

const PUBLIC_ROUTES = [
  { path: ROUTES.AUTH, element: <Auth /> },
  { path: ROUTES.BOOK, element: <BookNow /> },
  { path: ROUTES.CONTACT, element: <Contact /> },
  { path: ROUTES.COOKIES, element: <NotImplemented /> },
  { path: ROUTES.DOCUMENTATION, element: <NotImplemented /> },
  { path: ROUTES.DROP_OFF, element: <NotImplemented /> },
  { path: ROUTES.FAQ, element: <NotImplemented /> },
  { path: ROUTES.FOLLOW, element: <NotImplemented /> },
  { path: ROUTES.HISTORY, element: <NotImplemented /> },
  { path: ROUTES.MANAGE, element: <NotImplemented /> },
  { path: ROUTES.JOBS, element: <NotImplemented /> },
  { path: ROUTES.RATES, element: <Rates /> },
  { path: ROUTES.RESET_PASSWORD, element: <ResetPassword /> },
  { path: ROUTES.PROFILE, element: <NotImplemented /> },
  { path: ROUTES.SCHEDULE, element: <Schedule /> },
  { path: ROUTES.SETTING, element: <NotImplemented /> },
  { path: ROUTES.TERMS_AND_PRIVACY, element: <TermsAndPrivacy /> },
  { path: ROUTES.TOS, element: <NotImplemented /> },
  { path: "*", element: <PageNotFound /> },
];

const Router = () => {
  const publicRoutes = PUBLIC_ROUTES.map(({ path, element }) => (
    <Route key={path} path={path} element={element} />
  ));

  return (
    <BrowserRouter>
      <div className="appContainer">
        <div className="app">
          <Routes>
            <Route path={ROUTES.HOME} element={<RootLayout />}>
              <Route index element={<Welcome />} />
              {publicRoutes}
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Router;
