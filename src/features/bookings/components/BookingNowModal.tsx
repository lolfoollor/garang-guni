import { Dialog } from "@mui/material";
import BookNowForm from "../BookNowForm";

interface BookingNowModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const BookingNowModal = ({ isOpen, handleClose }: BookingNowModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          overflowY: "visible",
        },
      }}
    >
      <BookNowForm handleClick={handleClose} />
    </Dialog>
  );
};

export default BookingNowModal;
