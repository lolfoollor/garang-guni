import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Welcome from "./pages/Welcome";
import Contact from "./pages/Contact";
import Auth from "./pages/auth/Auth";
import BookNow from "./pages/BookNow";
import Rates from "./pages/Rates.tsx";
import Schedule from "./pages/Schedule";

import { UserContextProvider } from "./context/user-context";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import PageNotFound from "./pages/PageNotFound";
import NotImplemented from "./pages/NotImplemented";
import NavBar from "./components/NavBar";
import { UiContextProvider } from "./context/ui-context";
import { ROUTES } from "./constants/routes.ts";

const ROOT_CHILDREN_ROUTES = [
  { path: ROUTES.AUTH, element: <Auth /> },
  { path: ROUTES.BOOK, element: <BookNow /> },
  { path: ROUTES.CONTACT, element: <Contact /> },
  { path: ROUTES.COOKIES, element: <NotImplemented /> },
  { path: ROUTES.DOCUMENTATION, element: <NotImplemented /> },
  { path: ROUTES.DROP_OFF, element: <NotImplemented /> },
  { path: ROUTES.FAQ, element: <NotImplemented /> },
  { path: ROUTES.FOLLOW, element: <NotImplemented /> },
  { path: ROUTES.HISTORY, element: <NotImplemented /> },
  { path: ROUTES.JOBS, element: <NotImplemented /> },
  { path: ROUTES.RATES, element: <Rates /> },
  { path: ROUTES.PROFILE, element: <NotImplemented /> },
  { path: ROUTES.SCHEDULE, element: <Schedule /> },
  { path: ROUTES.SETTING, element: <NotImplemented /> },
  { path: ROUTES.TERMS_AND_PRIVACY, element: <TermsAndPrivacy /> },
  { path: ROUTES.TOS, element: <NotImplemented /> },
  { path: "*", element: <PageNotFound /> },
];

function App() {
  return (
    <UserContextProvider>
      <UiContextProvider>
        <BrowserRouter>
          <div className="appContainer">
            <NavBar />
            <div className="app">
              <Routes>
                <Route path={ROUTES.HOME} element={<RootLayout />}>
                  <Route index element={<Welcome />} />
                  {ROOT_CHILDREN_ROUTES.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))}
                </Route>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </UiContextProvider>
    </UserContextProvider>
  );
}

export default App;
