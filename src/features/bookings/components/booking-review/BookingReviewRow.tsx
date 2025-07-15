import { capitalizeFirstLetter } from "@/utils/textUtils";
import styles from "./BookingReviewRow.module.css";

interface BookingReviewRowProps {
  category: string;
  values: string | string[] | undefined;
}

const BookingReviewRow = ({ category, values }: BookingReviewRowProps) => {
  const isUndefined = values === undefined;
  const isEmptyStr = typeof values === "string" && values.trim() === "";
  const isEmptyArr = Array.isArray(values) && values.length === 0;

  if (isUndefined || isEmptyStr || isEmptyArr) {
    return null;
  }

  const isList = typeof values !== "string";
  const renderValue = isList ? (
    <ul className={styles.list}>
      {values.map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  ) : (
    <p className={styles.values}>{values}</p>
  );

  return (
    <div className={styles.container}>
      <p className={styles.category}>{capitalizeFirstLetter(category)}</p>
      {renderValue}
    </div>
  );
};

export default BookingReviewRow;
