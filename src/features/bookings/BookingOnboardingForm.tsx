import { z } from "zod";
import { bookingSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./BookingOnboardingForm.module.css";
import { TextField } from "@mui/material";
import DatePickerField from "../../components/DatePickerField";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user-context";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setDraft } from "./bookingDraftSlice";
import msg from "@/locales/en/bookings/components/bookingOnboarding.json";
import { ROUTES } from "@/constants/routes";

const bookingOnboardingSchema = bookingSchema.pick({
  date: true,
  address: true,
});

type BookingOnboardingSchema = z.infer<typeof bookingOnboardingSchema>;

interface BookingOnboardingFormProps {
  toggleBookingModal: () => void;
}

const BookingOnboardingForm = ({
  toggleBookingModal,
}: BookingOnboardingFormProps) => {
  const draft = useAppSelector((state) => state.bookingDraft);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingOnboardingSchema>({
    resolver: zodResolver(bookingOnboardingSchema),
    defaultValues: {
      date: draft.date ?? "",
      address: draft.address ?? "",
    },
  });

  useEffect(() => {
    reset({
      date: draft.date ?? "",
      address: draft.address ?? "",
    });
  }, [draft.date, draft.address, reset]);

  const dispatch = useAppDispatch();
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = (data: BookingOnboardingSchema) => {
    dispatch(setDraft(data));
    if (!isLoggedIn) {
      navigate(ROUTES.AUTH);
    }
    toggleBookingModal();
  };

  return (
    <form className={styles.bookNowContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.datePickerContainer}>
        <DatePickerField
          label={msg.dateLabel}
          control={control}
          name="date"
          error={errors.date?.message}
        />
      </div>
      <div className={styles.addressInputContainer}>
        <p>Address</p>
        <TextField
          variant="standard"
          {...register("address")}
          error={!!errors.address}
          helperText={errors.address?.message}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.bookNowButton} type="submit">
          {msg.submitButtonLabel}
        </button>
      </div>
    </form>
  );
};

export default BookingOnboardingForm;
