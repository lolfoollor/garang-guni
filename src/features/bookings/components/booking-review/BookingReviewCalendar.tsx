import { toReadableDate } from "@/utils/dateUtils";
import styles from "./BookingReviewCalendar.module.css";

interface BookingReviewCalendarProps {
  dateInIso: string;
}

const BookingReviewCalendar = ({ dateInIso }: BookingReviewCalendarProps) => {
  return (
    <div className={styles.reviewCalendar}>
      <i className="fa-solid fa-calendar-days"></i>
      <p>{toReadableDate(dateInIso)}</p>
    </div>
  );
};

export default BookingReviewCalendar;
