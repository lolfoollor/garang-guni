import { z } from "zod";
import { bookingSchema } from "./schema";
import { useForm } from "react-hook-form";
import styles from "./BookingDetailsForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setDraft } from "./bookingDraftSlice";
import BookingFormBanner from "./components/BookingFormBanner";
import { TextField } from "@mui/material";
import BookingPictures from "./components/booking-details/BookingPictures";
import BookingRemarks from "./components/booking-details/BookingRemarks";
import DatePickerField from "@/components/DatePickerField";
import Toggle from "@/components/Toggle";
import CheckboxGroup from "@/components/CheckBoxGroup";
import Button from "@/components/Button";
import msg from "@/locales/en/bookings/bookingDetailsForm.json";

interface BookingDetailsFormProps {
  handleNextPageClick: () => void;
}

const bookingInitialDetailsSchema = bookingSchema.pick({
  date: true,
  address: true,
  preferredTiming: true,
  categories: true,
  images: true,
  remarks: true,
});

type BookingDetailsSchema = z.infer<typeof bookingInitialDetailsSchema>;

const BookingDetailsForm = ({
  handleNextPageClick,
}: BookingDetailsFormProps) => {
  const dispatch = useAppDispatch();
  const draft = useAppSelector((state) => state.bookingDraft);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingDetailsSchema>({
    resolver: zodResolver(bookingInitialDetailsSchema),
    defaultValues: {
      date: draft.date ?? "",
      address: draft.address ?? "",
      preferredTiming: draft.preferredTiming ?? "",
      categories: draft.categories ?? [],
      images: draft.images ?? [],
      remarks: draft.remarks ?? "",
    },
  });

  const onSubmit = (data: BookingDetailsSchema) => {
    dispatch(setDraft(data));
    handleNextPageClick();
  };

  return (
    <form className={styles.bookNowContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.bookingFormBannerContainer}>
        <BookingFormBanner bannerText={msg.banner} />
      </div>
      <div className={styles.bookingFormContentContainer}>
        <div className={styles.dateTimeContainer}>
          <div className={styles.datePickerContainer}>
            <DatePickerField
              label={msg.dateLabel}
              control={control}
              name="date"
              error={errors.date?.message}
            />
          </div>
          <Toggle
            options={msg.timeOptions}
            control={control}
            name="preferredTiming"
            error={errors.preferredTiming?.message}
          />
        </div>
        <div className={styles.addressInputContainer}>
          <p>{msg.addressLabel}</p>
          <TextField
            variant="standard"
            {...register("address")}
            error={!!errors.address}
            helperText={errors.address?.message}
            className={styles.addressInput}
          />
        </div>
        <p>{msg.itemTypesLabel}</p>
        <CheckboxGroup
          categories={msg.categoryOptions}
          name="categories"
          control={control}
          error={errors.categories?.message}
        />
        <BookingPictures name="images" control={control} />
        <BookingRemarks name="remarks" control={control} />
        <div className={styles.submitBtnContainer}>
          <Button label={msg.buttonNextLabel} className={styles.submitBtn} />
        </div>
      </div>
    </form>
  );
};

export default BookingDetailsForm;
