import { getImage } from "@/app/db";
import { Image } from "@/components/Image";

export const createBookingFormData = (values: {
  date: string;
  address: string;
  preferredTiming: string;
  categories?: string[] | undefined;
  images?: Image[] | undefined;
  remarks?: string | undefined;
}) => {
  const formData = new FormData();

  formData.append("date", values.date);
  formData.append("address", values.address);
  formData.append("preferredTiming", values.preferredTiming);

  if (values.categories) {
    values.categories.forEach((category, i) =>
      formData.append(`categories[${i}]`, category)
    );
  }

  if (values.remarks) {
    formData.append("remarks", values.remarks);
  }

  if (values.images) {
    values.images.forEach(async (img, i) => {
      const imgFile = await getImage(img.id);
      if (imgFile) {
        formData.append(`images[${i}]`, imgFile);
      }
    });
  }

  return formData;
};