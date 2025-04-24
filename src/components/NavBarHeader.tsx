import Logo from "./Logo";
import styles from "./NavBarHeader.module.css";

const NavBarHeader = () => {
  return (
    <div className={styles.navBarHeader}>
      <Logo />
    </div>
  );
};

export default NavBarHeader;
