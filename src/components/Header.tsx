import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import UserMenu from "./UserMenu";
import styles from "./Header.module.css";
import { UserContext } from "../context/user-context";
import { UiContext } from "../context/ui-context";
import Logo from "./Logo";

function Header() {
  const { isLoggedIn, credentials } = useContext(UserContext);
  const { toggleUserMenu, toggleNav } = useContext(UiContext);
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      toggleUserMenu();
    } else {
      navigate("/auth");
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerContainer}>
            <div onClick={toggleNav}>
              <i className="fa-solid fa-bars fa-xl"></i>
            </div>
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>
          <div className={styles.headerContainer}>
            <div className={styles.username}>
              {isLoggedIn ? (
                <p>
                  <span className={styles.hello}> Hello</span>,{" "}
                  {credentials.firstName && credentials.firstName}
                  {credentials.lastname && credentials.lastname}
                </p>
              ) : (
                <NavLink to="/auth">Login/Register</NavLink>
              )}
            </div>
            <div className={styles.usernameIconContainer}>
              <div
                className={styles.usernameIcon}
                onClick={handleUserIconClick}
              >
                <i className="fa-solid fa-user fa-xl"></i>
              </div>
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
