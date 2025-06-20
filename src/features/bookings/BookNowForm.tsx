import { useState } from "react";
import BookingDetailsForm from "./BookingDetailsForm";
import BookingReviewForm from "./BookingReviewForm";
import BookingSubmitted from "./BookingSubmitted";
import msg from "@/locales/en/bookings/bookNowForm.json";

interface BookNowFormProps {
  handleClick: () => void;
}

enum BookingFormPage {
  InitialDetailsPage = 1,
  ReviewAndSubmitPage,
  SubmittedPage,
}

const BookNowForm = ({ handleClick }: BookNowFormProps) => {
  const [page, setPage] = useState<number>(BookingFormPage.InitialDetailsPage);

  const handleNextPageClick = () => {
    setPage((prevPage) => (prevPage + 1) as BookingFormPage);
  };

  const handlePrevPageClick = () => {
    setPage((prevPage) => (prevPage - 1) as BookingFormPage);
  };

  const renderPage = () => {
    switch (page) {
      case BookingFormPage.InitialDetailsPage:
        return <BookingDetailsForm handleNextPageClick={handleNextPageClick} />;
      case BookingFormPage.ReviewAndSubmitPage:
        return (
          <BookingReviewForm
            handlePrevPageClick={handlePrevPageClick}
            handleNextPageClick={handleNextPageClick}
          />
        );
      case BookingFormPage.SubmittedPage:
        return <BookingSubmitted handleClick={handleClick} />;
      default:
        return <div>{msg.errorPageMsg}</div>;
    }
  };

  return <>{renderPage()}</>;
};

export default BookNowForm;
