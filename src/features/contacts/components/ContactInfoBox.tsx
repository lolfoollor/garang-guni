import { CSSProperties } from "react";
import styles from "./ContactInfoBox.module.css";

interface ContactInfoBoxProps {
  additionalStyles?: CSSProperties;
  title: string;
  infoList: string[];
}

function ContactInfoBox({
  additionalStyles,
  title,
  infoList,
}: ContactInfoBoxProps) {
  return (
    <div style={additionalStyles} className={styles.infoBox}>
      <p className={styles.header}>{title}:</p>
      {infoList.map((item, i) => (
        <p className={styles.indentItems} key={i}>
          {item}
        </p>
      ))}
    </div>
  );
}

export default ContactInfoBox;
