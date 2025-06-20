import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePickerField.module.css";
import msg from "@/locales/en/components/datePicker.json";
import { createPortal } from "react-dom";
import { Controller } from "react-hook-form";

interface DatePickerFieldProps {
  label?: string;
  placeholderText?: string;
  control: any;
  name: string;
  error?: string;
  customClassName?: string;
}

const DatePickerField = ({
  label,
  placeholderText = msg.placeholderText,
  control,
  name,
  error,
  customClassName,
}: DatePickerFieldProps) => {
  return (
    <>
      {label && <p>{label}</p>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            showIcon
            placeholderText={placeholderText}
            closeOnScroll={true}
            selected={field.value ? new Date(field.value) : null}
            onChange={(date) => field.onChange(date ? date.toISOString() : "")}
            className={`${customClassName} ${
              error ? styles.datePickerError : ""
            }`}
            dateFormat="dd/MM/yyyy"
            calendarIconClassName={styles.calandarIcon}
            popperPlacement="bottom-start"
            popperClassName={styles.popper}
            popperContainer={({ children }) =>
              createPortal(children, document.body)
            }
          />
        )}
      />
    </>
  );
};

export default DatePickerField;
