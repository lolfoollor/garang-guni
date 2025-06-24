import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import styles from "./BookingRemarks.module.css";
import msg from "@/locales/en/bookings/components/bookingDetails.json";

interface BookingRemarksProps {
  name: string;
  control: any;
  header?: string;
}

const BookingRemarks = ({
  name,
  control,
  header = msg.bookingRemarks.defaultHeader,
}: BookingRemarksProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <p>{header}</p>
          <TextField
            name={name}
            InputProps={{ className: styles.remarks }}
            hiddenLabel
            variant="outlined"
            value={field.value}
            onChange={field.onChange}
            multiline
            fullWidth
          />
        </>
      )}
    />
  );
};

export default BookingRemarks;
