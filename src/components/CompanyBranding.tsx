import Logo from "./Logo";
import styles from "./CompanyBranding.module.css";

const CompanyBranding = () => {
  return (
    <div className={styles.companyBrandingContainer}>
      <div className={styles.companyFakeLogo}></div>
      <Logo />
      <p className={styles.companySloganText}>
        Turning Trash into Treasures
        <span className={styles.companySloganBold}>since 1900.</span>
      </p>
    </div>
  );
};

export default CompanyBranding;
