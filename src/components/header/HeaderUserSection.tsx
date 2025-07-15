import { NavLink, useNavigate } from "react-router-dom";
import styles from "./HeaderUserSection.module.css";
import UserMenu from "./UserMenu";
import { useContext } from "react";
import { UiContext } from "../../context/ui-context";
import { ROUTES } from "@/constants/routes";
import { useAppSelector } from "@/app/hooks";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/features/auth/authSlice";

const HeaderUserSection = () => {
  const { isUserMenuOpen, toggleUserMenu } = useContext(UiContext);
  const navigate = useNavigate();
  const isLoggedIn = !!useAppSelector(selectCurrentToken);
  const userDetails = useAppSelector(selectCurrentUser);

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      toggleUserMenu();
    } else {
      navigate(ROUTES.AUTH);
    }
  };

  return (
    <>
      <div className={styles.username}>
        {isLoggedIn ? (
          <p>
            <span className={styles.hello}> Hello</span>,{" "}
            {userDetails?.username && userDetails.username}
          </p>
        ) : (
          <NavLink to={ROUTES.AUTH}>Login</NavLink>
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
