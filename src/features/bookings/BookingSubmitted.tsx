import styles from "./BookingSubmitted.module.css";
import msg from "@/locales/en/bookings/bookingSubmitted.json";

interface BookingSubmitProps {
  handleClick: () => void;
}

const BookingSubmitted = ({ handleClick }: BookingSubmitProps) => {
  return (
    <div className={styles.bookingSubmittedContainer}>
      <div>
        <i className={`fa-solid fa-circle-check ${styles.checkMark}`}></i>
        <p className={styles.title}>{msg.title}</p>
      </div>
      <div className={styles.body}>
        <p>{msg.body}</p>
      </div>
      <div>
        <button className={styles.submitBtn} onClick={handleClick}>
          {msg.buttonText}
        </button>
      </div>
    </div>
  );
};

export default BookingSubmitted;
