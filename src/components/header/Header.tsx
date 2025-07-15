import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "../Logo";
import ToggleNav from "./ToggleNav";
import HeaderUserSection from "./HeaderUserSection";
import ContentWrapper from "../ContentWrapper";

function Header() {
  return (
    <div className={styles.header}>
      <ContentWrapper>
        <div className={styles.headerContent}>
          <div className={styles.headerContainer}>
            <ToggleNav />
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>
          <div className={styles.headerContainer}>
            <HeaderUserSection />
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default Header;
