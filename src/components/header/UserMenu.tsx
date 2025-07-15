import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./UserMenu.module.css";
import { UiContext } from "../../context/ui-context.tsx";
import { useLogoutMutation } from "@/features/auth/services/authApiSlice.ts";
import { ROUTES } from "@/constants/routes.ts";

const USER_MENU_ITEMS = [
  { to: ROUTES.PROFILE, icon: "fa-solid fa-address-card", label: "Profile" },
  {
    to: ROUTES.MANAGE,
    icon: "fa-regular fa-calendar-check ",
    label: "Manage Booking",
  },
  { to: ROUTES.SETTING, icon: "fa-solid fa-gear ", label: "Setting" },
];

function UserMenu() {
  const { isUserMenuOpen: isOpen, toggleUserMenu } = useContext(UiContext);
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    await logout()
      .unwrap()
      .catch(() => {});
    toggleUserMenu();
  };

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
