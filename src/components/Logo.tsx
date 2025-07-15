import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <h1 className={styles.logo}>
      Garang<span className={styles.logoSpan}>Guni</span>
    </h1>
  );
};

export default Logo;
