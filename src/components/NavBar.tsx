import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import NavBarHeader from "./NavBarHeader";

interface NavBarProps {
  isNavBarOpen: boolean;
  toggleNavBar: () => void;
}

const NAV_LINKS = [
  { to: "/", icon: "fa-solid fa-house", label: "Home" },
  { to: "/list", icon: "fa-solid fa-table-list", label: "List & Rate" },
  { to: "/schedule", icon: "fa-solid fa-calendar-days", label: "Schedule" },
  { to: "/book", icon: "fa-regular fa-calendar-check", label: "Book Now" },
  { to: "/contact", icon: "fa-solid fa-phone", label: "Contact" },
];

function NavBar({ isNavBarOpen, toggleNavBar }: NavBarProps) {
  return (
    <>
      <div
        className={`${styles.navBar} ${
          isNavBarOpen ? styles.navBarOpen : styles.navBarClosed
        }`}
      >
        <NavBarHeader />
        <div className={styles.navBarContents}>
          <div className={styles.navBarLinkContainer}>
            {NAV_LINKS.map((navLink) => (
              <NavLink
                key={navLink.to}
                to={navLink.to}
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <div className={styles.navBarLink}>
                  <i className={navLink.icon} />
                  <p>{navLink.label}</p>
                </div>
              </NavLink>
            ))}
          </div>

          <button onClick={toggleNavBar}>
            <i className="fa-solid fa-left-long"></i>
          </button>
        </div>
      </div>
      <div className={styles.bgOverlay}></div>
    </>
  );
}

export default NavBar;
