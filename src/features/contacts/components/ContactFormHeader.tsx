import msg from "@/locales/en/contacts/contacts.json";
import styles from "./ContactFormHeader.module.css";

const ContactFormHeader = () => {
  return (
    <div className={styles.headerContainer}>
      <p className={styles.title}>{msg.contactForm.header.title}</p>
      <p className={styles.subtitle}>
        {msg.contactForm.header.subtitle}
        <span className={styles.highlight}>{msg.contactForm.header.phone}</span>
      </p>
      <p className={styles.date}>{msg.contactForm.header.date1}</p>
      <p className={styles.date}>{msg.contactForm.header.date2}</p>
      <p className={styles.sectionTitle}>
        {msg.contactForm.header.sectionTitle}
      </p>
    </div>
  );
};

export default ContactFormHeader;
