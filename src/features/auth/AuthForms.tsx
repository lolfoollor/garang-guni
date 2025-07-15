import styles from "./AuthForms.module.css";
import LoginForm from "./login/LoginForm";
import RegisterForm from "./register/RegisterForm";
import FullScreenLoader from "@/components/FullScreenLoader";
import { useAppSelector } from "@/app/hooks";

interface AuthFormsProps {
  isCreatingAccount: boolean;
  setCreatingAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthForms = ({
  isCreatingAccount,
  setCreatingAccount,
}: AuthFormsProps) => {
  const authStatus = useAppSelector((state) => state.auth.status);
  const isLoading = authStatus === "pending";

  return (
    <div className={styles.formsWrapper}>
      <div
        className={`${styles.form} ${
          isCreatingAccount ? styles.loginHidden : styles.loginVisible
        }`}
      >
        <LoginForm setCreatingAccount={setCreatingAccount} />
      </div>
      <div
        className={`${styles.form} ${
          isCreatingAccount ? styles.registerVisible : styles.registerHidden
        }`}
      >
        <RegisterForm setCreatingAccount={setCreatingAccount} />
      </div>
      <FullScreenLoader isOpen={isLoading} />
    </div>
  );
};

export default AuthForms;
