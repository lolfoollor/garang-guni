import styles from "./FooterEmailHeader.module.css";
import footerMsg from "@/locales/en/footer.json";

const FooterEmailHeader = () => {
  return (
    <p className={styles.footerEmailHeaderContainer}>
      {footerMsg.emailHeader.header}&nbsp;
      <span className={styles.footerEmailHeaderHighlightMsg}>
        {footerMsg.emailHeader.bold}
      </span>
    </p>
  );
};

export default FooterEmailHeader;
