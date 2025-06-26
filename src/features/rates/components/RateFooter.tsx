import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styles from "./RateFooter.module.css";
import msg from "@/locales/en/rates/rates.json";
import { ROUTES } from "@/constants/routes";

const renderLinkText = (text: string, link: string) => {
  const parts = text.split(/(\*.*?\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      const linkText = part.slice(1, -1);
      return (
        <Link key={index} to={link} className={styles.link}>
          {linkText}
        </Link>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

const RateFooter = () => {
  return (
    <div className={styles.footerContainer}>
      <p className={styles.footer}>
        {renderLinkText(msg.footer.msgs.msg1, ROUTES.BOOK)}
      </p>
      <p className={styles.footer}>{msg.footer.msgs.msg2}</p>
      <div className={styles.disclaimer}>
        <ReactMarkdown>{msg.footer.disclaimer}</ReactMarkdown>
      </div>
    </div>
  );
};

export default RateFooter;
