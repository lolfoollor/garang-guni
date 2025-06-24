import ContactInfoBox from "./ContactInfoBox";
import styles from "./ContactMeetUs.module.css";
import msg from "@/locales/en/contacts/contacts.json";

const ContactMeetUs = () => {
  const renderContactInfos = () => {
    return Object.values(msg.contactMeetUs.contactInfos).map((contactInfo) => (
      <ContactInfoBox
        key={contactInfo.title}
        title={contactInfo.title}
        infoList={contactInfo.items}
      />
    ));
  };

  return (
    <div className={styles.meetUs}>
      <p className={styles.meetUsHeader}>{msg.contactMeetUs.header}</p>
      <div className={styles.meetUsContainer}>{renderContactInfos()}</div>
    </div>
  );
};

export default ContactMeetUs;
