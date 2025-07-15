import styles from "./FooterEmail.module.css";
import FooterEmailForm from "./FooterEmailForm";
import FooterEmailHeader from "./FooterEmailHeader";

const FooterEmail = () => {
  return (
    <div className={styles.footerEmailContainer}>
      <FooterEmailHeader />
      <FooterEmailForm />
    </div>
  );
};

export default FooterEmail;
