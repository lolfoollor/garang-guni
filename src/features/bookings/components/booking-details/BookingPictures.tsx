import { Controller } from "react-hook-form";
import BookingPicturesComponent from "./BookingPicturesComponent";
import msg from "@/locales/en/bookings/components/bookingDetails.json";

interface BookingPicturesProps {
  name: string;
  control: any;
  header?: string;
}

const BookingPictures = ({
  name,
  control,
  header = msg.bookingPictures.defaultHeader,
}: BookingPicturesProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <BookingPicturesComponent
          images={field.value ?? []}
          onChange={field.onChange}
          header={header}
        />
      )}
    />
  );
};

export default BookingPictures;
