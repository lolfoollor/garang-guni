import { useState } from "react";
import styles from "./ImageGrid.module.css";
import { Dialog } from "@mui/material";
import { Image } from "./Image";
import msg from "@/locales/en/components/imageGrid.json";
import { interpolateMessage } from "@/utils/textUtils";

interface ImageGridProps {
  images: Image[];
  handleDeleteImg?: (id: string) => void;
}

const ImageGrid = ({ images, handleDeleteImg }: ImageGridProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImagePreviewOpen, setImagePreviewOpen] = useState<boolean>(false);

  const handleClick = (src: string) => {
    setImagePreviewOpen(true);
    setSelectedImage(src);
  };

  const closeModal = () => {
    setImagePreviewOpen(false);
    setSelectedImage(null);
  };

  const renderImages = (images: Image[]) => {
    return images.map((image) => (
      <div className={styles.imgContainer} key={image.id}>
        <img
          onClick={() => handleClick(image.src)}
          alt={interpolateMessage(msg.imgAltDefault, {
            id: image.id,
          })}
          src={image.src}
          className={styles.img}
        />
        {handleDeleteImg && (
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={() => handleDeleteImg(image.id)}
          >
            <i className="fa-solid fa-trash" />
          </button>
        )}
      </div>
    ));
  };

  return (
    <>
      <div className={styles.imgGridContainer}>{renderImages(images)}</div>
      {selectedImage && (
        <Dialog
          fullScreen={true}
          open={isImagePreviewOpen}
          onClick={closeModal}
          PaperProps={{
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt={msg.imgAltEnlargeMsg}
              className={styles.fullImage}
            />
            <button
              type="button"
              className={styles.closeBtn}
              onClick={closeModal}
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default ImageGrid;
