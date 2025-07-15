import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import NavBarHeader from "./NavBarHeader";
import { useContext } from "react";
import { UiContext } from "../context/ui-context";

const NAV_LINKS = [
  { to: "/", icon: "fa-solid fa-house", label: "Home" },
  { to: "/rates", icon: "fa-solid fa-table-list", label: "Our Rates" },
  { to: "/schedule", icon: "fa-solid fa-calendar-days", label: "Schedule" },
  { to: "/book", icon: "fa-regular fa-calendar-check", label: "Book Now" },
  { to: "/contact", icon: "fa-solid fa-phone", label: "Contact Us" },
];

function NavBar() {
  const { isNavOpen: isNavBarOpen, toggleNav: toggleNavBar } =
    useContext(UiContext);

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
                onClick={toggleNavBar}
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
      {isNavBarOpen && (
        <div className={styles.bgOverlay} onClick={toggleNavBar}></div>
      )}
    </>
  );
}

export default NavBar;
