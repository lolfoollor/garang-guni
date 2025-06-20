import { Link } from "react-router-dom";
import styles from "./BookingCallToAction.module.css";
import msg from "@/locales/en/bookings/components/bookingOnboarding.json";
import { ROUTES } from "@/constants/routes";

const renderHighlightedText = (text: string, link?: string) => {
  const parts = text.split(/(\*.*?\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      const highlighted = part.slice(1, -1);

      return link ? (
        <Link key={index} to={link} className={styles.highlightLink}>
          {highlighted}
        </Link>
      ) : (
        <span key={index} className={styles.highlight}>
          {highlighted}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

const BookingCallToAction = () => {
  const phraseBody = msg.phrases.map((text, i) => (
    <p key={i}>{renderHighlightedText(text)}</p>
  ));

  const phraseFooter = renderHighlightedText(msg.footer, ROUTES.LIST);

  return (
    <div className={styles.textBoxContainer}>
      <p className={styles.phraseHeader}>{msg.header}</p>
      <div className={styles.phrase}>{phraseBody}</div>
      <p className={styles.phraseFooter}>{phraseFooter}</p>
    </div>
  );
};

export default BookingCallToAction;
