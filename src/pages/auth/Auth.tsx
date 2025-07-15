import { useEffect, useState } from "react";
import styles from "./Auth.module.css";
import ContentWrapper from "@/components/ContentWrapper";
import AuthOverlay from "@/features/auth/AuthOverlay";
import AuthForms from "@/features/auth/AuthForms";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentToken } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export default function Auth() {
  const [isCreatingAccount, setCreatingAccount] = useState(false);
  const isLoggedIn = !!useAppSelector(selectCurrentToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.contentContainer}>
      <ContentWrapper>
        <div className={styles.container}>
          <AuthForms
            isCreatingAccount={isCreatingAccount}
            setCreatingAccount={setCreatingAccount}
          />
          <AuthOverlay
            isCreatingAccount={isCreatingAccount}
            setCreatingAccount={setCreatingAccount}
          />
        </div>
      </ContentWrapper>
    </div>
  );
}
