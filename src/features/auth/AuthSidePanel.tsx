import styles from "./AuthSidePanel.module.css";

interface AuthSidePanelProps {
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
  isLeftSide?: boolean;
  isActive: boolean;
}

const AuthSidePanel = ({
  title,
  description,
  buttonLabel,
  onClick,
  isLeftSide = true,
  isActive,
}: AuthSidePanelProps) => {
  return (
    <div
      className={`${styles.panel} ${!isLeftSide && styles.right} ${
        isActive
          ? styles.active
          : isLeftSide
          ? styles.leftInactive
          : styles.rightInactive
      }`}
    >
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      <button className={styles.changeBtn} onClick={onClick}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default AuthSidePanel;
