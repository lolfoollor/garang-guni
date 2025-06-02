import { NavLink, useNavigate } from "react-router-dom";
import styles from "./HeaderUserSection.module.css";
import UserMenu from "./UserMenu";
import { useContext } from "react";
import { UiContext } from "../../context/ui-context";
import { UserContext } from "../../context/user-context";

const HeaderUserSection = () => {
  const { isLoggedIn, credentials } = useContext(UserContext);
  const { isUserMenuOpen, toggleUserMenu } = useContext(UiContext);
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
      <div className={styles.username}>
        {isLoggedIn ? (
          <p>
            <span className={styles.hello}> Hello</span>,{" "}
            {credentials.firstName && credentials.firstName}
            {credentials.lastname && credentials.lastname}
          </p>
        ) : (
          <NavLink to="/auth">Login</NavLink>
        )}
      </div>
      <div className={styles.usernameIconContainer}>
        <div className={styles.usernameIcon} onClick={handleUserIconClick}>
          <i className="fa-solid fa-user fa-xl"></i>
        </div>
        {isUserMenuOpen && <UserMenu />}
      </div>
    </>
  );
};

export default HeaderUserSection;
