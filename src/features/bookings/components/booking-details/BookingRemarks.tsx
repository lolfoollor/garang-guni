import { TextField } from "@mui/material";
import { Controller, FieldError } from "react-hook-form";
import styles from "./BookingRemarks.module.css";
import msg from "@/locales/en/bookings/components/bookingDetails.json";

interface BookingRemarksProps {
  name: string;
  control: any;
  header?: string;
  error: FieldError | undefined;
}

const BookingRemarks = ({
  name,
  control,
  header = msg.bookingRemarks.defaultHeader,
  error,
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
            FormHelperTextProps={{
              sx: { marginLeft: 0 },
            }}
            hiddenLabel
            variant="outlined"
            value={field.value}
            onChange={field.onChange}
            error={!!error}
            helperText={error?.message}
            multiline
            fullWidth
          />
        </>
      )}
    />
  );
};

export default BookingRemarks;
