import { toReadableDate } from "@/utils/dateUtils";
import styles from "./BookingReviewCalandar.module.css";

interface BookingReviewCalandarProps {
  dateInIso: string;
}

const BookingReviewCalandar = ({ dateInIso }: BookingReviewCalandarProps) => {
  return (
    <div className={styles.reviewCalandar}>
      <i className="fa-solid fa-calendar-days"></i>
      <p>{toReadableDate(dateInIso)}</p>
    </div>
  );
};

export default BookingReviewCalandar;
