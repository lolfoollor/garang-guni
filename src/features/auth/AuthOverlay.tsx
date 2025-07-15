import styles from "./AuthOverlay.module.css";
import AuthSidePanel from "./AuthSidePanel";
import msg from "@/locales/en/auth/auth.json";

interface AuthOverlayProps {
  isCreatingAccount: boolean;
  setCreatingAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthOverlay = ({
  isCreatingAccount,
  setCreatingAccount,
}: AuthOverlayProps) => {
  return (
    <div
      className={`${styles.overlayContainer} ${
        isCreatingAccount && styles.moveLeft
      }`}
    >
      <div
        className={`${styles.overlay} ${
          isCreatingAccount && styles.defaultPos
        }`}
      >
        <AuthSidePanel
          title={msg.overlay.signIn.title}
          description={msg.overlay.signIn.description}
          buttonLabel={msg.overlay.signIn.buttonLabel}
          onClick={() => setCreatingAccount(false)}
          isActive={isCreatingAccount}
        />
        <AuthSidePanel
          title={msg.overlay.register.title}
          description={msg.overlay.register.description}
          buttonLabel={msg.overlay.register.buttonLabel}
          onClick={() => setCreatingAccount(true)}
          isLeftSide={false}
          isActive={!isCreatingAccount}
        />
      </div>
    </div>
  );
};

export default AuthOverlay;
