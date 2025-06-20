import { useState } from "react";
import styles from "./BookNow.module.css";
import recyclingCircle from "../assets/recycleCircle.png";
import BookingOnboardingForm from "../features/bookings/BookingOnboardingForm";
import ContentWrapper from "../components/ContentWrapper";
import BookingCallToAction from "../features/bookings/components/booking-onboarding/BookingCallToAction";
import BookingNowModal from "../features/bookings/components/BookingNowModal";

function BookNow() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.bookNowBg}>
      <ContentWrapper>
        <div className={styles.bookNowContainer}>
          <div className={styles.leftContainer}>
            <BookingCallToAction />
            <BookingOnboardingForm toggleBookingModal={handleToggleModal} />
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.recyclingCircle}>
              <img src={recyclingCircle} alt="circle" />
            </div>
          </div>
          <BookingNowModal
            isOpen={isModalOpen}
            handleClose={handleToggleModal}
          />
        </div>
      </ContentWrapper>
    </div>
  );
}

export default BookNow;
