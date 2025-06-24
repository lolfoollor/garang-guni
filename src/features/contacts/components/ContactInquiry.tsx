import { Dialog } from "@mui/material";
import styles from "./ContactInquiry.module.css";
import ContactForm from "../ContactForm";
import { useState } from "react";
import msg from "@/locales/en/contacts/contacts.json";
import Button from "@/components/Button";

interface ContactInquiryProps {
  isDark: boolean;
}

const ContactInquiry = ({ isDark }: ContactInquiryProps) => {
  const [isShowingForm, setIsShowingForm] = useState(false);

  const toggleInquiryForm = () => {
    setIsShowingForm((prevState) => !prevState);
  };

  return (
    <div className={styles.inquiryBox}>
      <p className={styles.inquiryHeader}>{msg.contactInquiry.header}</p>
      <div className={styles.inquiryText}>{msg.contactInquiry.body}</div>
      <div className={styles.inquryButtonContainer}>
        <Button
          label={msg.contactInquiry.buttonText}
          className={`${styles.inquryButton} ${isDark && styles.dark}`}
          onClick={toggleInquiryForm}
        />
      </div>
      <Dialog open={isShowingForm} onClose={toggleInquiryForm}>
        <ContactForm isDark={isDark} onClick={toggleInquiryForm} />
      </Dialog>
    </div>
  );
};

export default ContactInquiry;
