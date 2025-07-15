import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { saveImage } from "@/app/db";
import { Image } from "@/components/Image";
import styles from "./BookingPicturesComponent.module.css";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import Notice from "@/components/Notice";
import UploadPictures from "@/components/upload-pictures/UploadPictures";
import ImageGrid from "@/components/ImageGrid";
import msg from "@/locales/en/bookings/components/bookingDetails.json";
import { interpolateMessage } from "@/utils/textUtils";

interface BookingPicturesComponentProps {
  images: Image[];
  onChange: (images: Image[]) => void;
  header: string;
}

const MAX_PHOTO_LIMIT = 10;

const BookingPicturesComponent = ({
  images,
  onChange,
  header,
}: BookingPicturesComponentProps) => {
  const [isNoticeOpen, setNoticeOpen] = useState<boolean>(false);
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState<boolean>(false);
  const [imageToDeleteId, setImageToDeleteId] = useState<string | null>(null);

  const onAcceptFiles = useCallback(
    async (acceptedFiles: File[]) => {
      if (images.length + acceptedFiles.length > MAX_PHOTO_LIMIT) {
        setNoticeOpen(true);
        throw new Error(msg.bookingPicturesComponent.maxLimitReached.header);
      }

      const readFile = (file: File): Image => ({
        id: uuidv4(),
        src: URL.createObjectURL(file),
      });

      const newImages = await Promise.all(
        acceptedFiles.map(async (file) => {
          const newImage = readFile(file);
          await saveImage(newImage.id, file);
          return newImage;
        }),
      );

      const updatedImages = [...images, ...newImages];
      onChange(updatedImages);
    },
    [images, onChange],
  );

  const handleDeleteRequest = (id: string) => {
    setImageToDeleteId(id);
    setDeleteAlertOpen(true);
  };

  const confirmDelete = () => {
    if (imageToDeleteId) {
      const updated = images.filter((img) => img.id !== imageToDeleteId);
      onChange(updated);
    }
    setDeleteAlertOpen(false);
    setImageToDeleteId(null);
  };

  return (
    <>
      <section className={styles.bookingPictures}>
        <p>{header}</p>
        <ImageGrid images={images} handleDeleteImg={handleDeleteRequest} />
        <UploadPictures onAcceptFiles={onAcceptFiles} />
      </section>
      <Notice
        open={isNoticeOpen}
        handleClose={() => setNoticeOpen(false)}
        header={msg.bookingPicturesComponent.maxLimitReached.header}
        body={interpolateMessage(
          msg.bookingPicturesComponent.maxLimitReached.body,
          {
            amount: MAX_PHOTO_LIMIT,
          },
        )}
      />
      <DeleteConfirmation
        open={isDeleteAlertOpen}
        handleClose={() => setDeleteAlertOpen(false)}
        header={msg.bookingPicturesComponent.deleteConfirmation.header}
        body={msg.bookingPicturesComponent.deleteConfirmation.body}
        handleDelete={confirmDelete}
      />
    </>
  );
};

export default BookingPicturesComponent;
