import styles from "./Footer.module.css";
import FooterEmail from "./FooterEmail";
import FooterLogoAndLinks from "./FooterLogoAndLinks";
import FooterCopyright from "./FooterCopyright";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBg}></div>
      <div className={styles.footerContent}>
        <FooterEmail />
        <FooterLogoAndLinks />
        <FooterCopyright />
      </div>
    </footer>
  );
}

export default Footer;
