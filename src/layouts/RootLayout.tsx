import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import styles from "./RootLayout.module.css";
import Loading from "@/components/Loading";
import { Suspense } from "react";
import NavBar from "@/components/NavBar";

function RootLayout() {
  const LoadingPage = (
    <div className="flex min-h-screen items-center justify-center">
      <Loading />
    </div>
  );

  return (
    <main className={styles.mainContainer}>
      <Header />
      <NavBar />
      <Suspense fallback={LoadingPage}>
        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </Suspense>
      <Footer />
    </main>
  );
}

export default RootLayout;
