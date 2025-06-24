import styles from "./Contact.module.css";
import ContentWrapper from "@/components/ContentWrapper";
import ContactBanner from "@/features/contacts/components/ContactBanner";
import ContactInquiry from "@/features/contacts/components/ContactInquiry";
import ContactMeetUs from "@/features/contacts/components/ContactMeetUs";
import ContactVisitUs from "@/features/contacts/components/ContactVisitUs";

function Contact() {
  // TODO: Actual Light Mode. Temp until light mode context is introduced.
  const currentHour = new Date().getHours();
  const isDark = currentHour >= 18 || currentHour <= 5;

  const CONTACT_SECTIONS = {
    "meetUs": <ContactMeetUs />,
    "inquiry": <ContactInquiry isDark={isDark} />,
    "visitUs": <ContactVisitUs />,
  };

  const renderContactSections = () =>
    Object.entries(CONTACT_SECTIONS).map(([key, value]) => (
      <div key={key} className={styles.contactSection}>
        {value}
      </div>
    ));

  return (
    <div className={`${styles.contact} ${isDark && styles.dark}`}>
      <ContentWrapper>
        <div className={styles.contactContainer}>
          <ContactBanner isDark={isDark} />
          <div className={styles.contactSectionContainer}>
            {renderContactSections()}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default Contact;
