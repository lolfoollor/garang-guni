import styles from "./Footer.module.css";
import FooterEmail from "./FooterEmail";
import FooterLogoAndLinks from "./FooterLogoAndLinks";
import FooterCopyright from "./FooterCopyright";
import ContentWrapper from "../ContentWrapper";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBg}></div>
      <ContentWrapper>
        <FooterEmail />
        <FooterLogoAndLinks />
        <FooterCopyright />
      </ContentWrapper>
    </footer>
  );
}

export default Footer;
