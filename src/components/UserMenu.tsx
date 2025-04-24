import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./UserMenu.module.css";
import { UserContext } from "../context/user-context.tsx";
import { UiContext } from "../context/ui-context.tsx";

const USER_MENU_ITEMS = [
  { to: "/profile", icon: "fa-solid fa-address-card fa-lg", label: "Profile" },
  {
    to: "/manage",
    icon: "fa-regular fa-calendar-check fa-lg",
    label: "Manage Booking",
  },
  { to: "/setting", icon: "fa-solid fa-gear fa-lg", label: "Setting" },
];

function UserMenu() {
  const { handleLogout } = useContext(UserContext);
  const { isUserMenuOpen: isOpen, toggleUserMenu } = useContext(UiContext);

  return (
    <div className={`${styles.userMenu} ${isOpen ? styles.userMenuOpen : ""}`}>
      {USER_MENU_ITEMS.map((userMenuItem) => (
        <NavLink
          key={userMenuItem.to}
          to={userMenuItem.to}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          onClick={toggleUserMenu}
        >
          <div className={styles.userMenuContainer}>
            <i className={userMenuItem.icon}></i>
            <p>{userMenuItem.label}</p>
          </div>
        </NavLink>
      ))}

      <button className={styles.button} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}

export default UserMenu;
