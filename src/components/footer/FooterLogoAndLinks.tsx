import CompanyBranding from "../CompanyBranding";
import FooterLinks from "./FooterLinks";
import styles from "./FooterLogoAndLinks.module.css";

const FooterLogoAndLinks = () => {
  return (
    <div className={styles.footerLogoAndLinksContainer}>
      <CompanyBranding />
      <FooterLinks />
    </div>
  );
};

export default FooterLogoAndLinks;
