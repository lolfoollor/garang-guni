import { useAppDispatch, useAppSelector } from "@/app/hooks";
import ImageGrid from "@/components/ImageGrid";
import Button from "@/components/Button";
import { clearBookingDraft } from "./bookingDraftSlice";
import BookingFormBanner from "./components/BookingFormBanner";
import BookingReviewCalendar from "./components/booking-review/BookingReviewCalendar";
import styles from "./BookingReviewForm.module.css";
import BookingReviewRow from "./components/booking-review/BookingReviewRow";
import { Image } from "@/components/Image";
import { createBookingFormData } from "@/utils/bookingUtils";
import { BookingSchema } from "./schema";
import msg from "@/locales/en/bookings/bookingReviewForm.json";

interface BookingReviewFormProps {
  handlePrevPageClick: () => void;
  handleNextPageClick: () => void;
}

const BookingReviewForm = ({
  handlePrevPageClick,
  handleNextPageClick,
}: BookingReviewFormProps) => {
  const draft = useAppSelector((state) => state.bookingDraft);
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    /* TODO: Implement optimistic booking in RTK Query
     - Temporarily push booking to cache
     - Replace it with real data on success
     - Roll back on failure
    */
    const bookingData = createBookingFormData(draft as BookingSchema);
    // const response = await backEnd.post(`/bookings`, bookingData);
    dispatch(clearBookingDraft());
    handleNextPageClick();
  };

  return (
    <section className={styles.bookingReviewFormContainer}>
      <div className={styles.bookingBannerContainer}>
        <BookingFormBanner bannerText="Review Booking" />
      </div>
      <div className={styles.bookingContentContainer}>
        <BookingReviewCalendar dateInIso={draft.date!} />
        <BookingReviewRow
          category={msg.reviewItems.pickupTime}
          values={draft.preferredTiming}
        />
        <BookingReviewRow
          category={msg.reviewItems.address}
          values={draft.address}
        />
        <BookingReviewRow
          category={msg.reviewItems.recyclableItems}
          values={draft.categories}
        />
        <BookingReviewRow
          category={msg.reviewItems.remarks}
          values={draft.remarks}
        />
        {draft.images!.length > 0 && (
          <>
            <p className={styles.imageHeader}>{msg.reviewItems.images}</p>
            <ImageGrid images={(draft.images ?? []) as Image[]} />
          </>
        )}

        <div className={styles.submitBtns}>
          <Button
            onClick={handlePrevPageClick}
            className={styles.submitBtn}
            label={msg.buttons.previous}
          />
          <Button
            onClick={handleSubmit}
            className={styles.submitBtn}
            label={msg.buttons.submit}
          />
        </div>
      </div>
    </section>
  );
};

export default BookingReviewForm;
