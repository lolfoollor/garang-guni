import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import styles from "./RootLayout.module.css";

function RootLayout() {
  return (
    <main className={styles.mainContainer}>
      <Header />
      <div className={styles.outletContainer}>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default RootLayout;
