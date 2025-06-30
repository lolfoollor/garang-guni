import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import styles from "./UploadPictures.module.css";
import msg from "@/locales/en/components/uploadPictures.json";
import { useState } from "react";
import { interpolateMessage } from "@/utils/textUtils";

interface UploadPicturesProps {
  accept?: any;
  onAcceptFiles: (
    acceptedFiles: File[],
    event: DropEvent,
  ) => void | Promise<void>;
  maxSizeInMb?: number;
  maxFiles?: number;
}

interface UploadPictureStatusMsg {
  message: string;
  isError: boolean;
}

const DEFAULT_MAX_SIZE_IN_MB = 5;
const DEFAULT_MAX_FILE_UPLOAD_AT_ONCE = 10;

const megaBytesToBytes = (numberOfMb: number) => numberOfMb * 1024 * 1024;

function UploadPictures({
  accept = { "image/jpeg": [], "image/png": [], "image/webp": [] },
  onAcceptFiles,
  maxSizeInMb = DEFAULT_MAX_SIZE_IN_MB,
  maxFiles = DEFAULT_MAX_FILE_UPLOAD_AT_ONCE,
}: UploadPicturesProps) {
  const [statusMessage, setStatusMessage] =
    useState<UploadPictureStatusMsg | null>(null);

  const onDropAccepted = async (acceptedFiles: File[], event: DropEvent) => {
    try {
      await onAcceptFiles(acceptedFiles, event);
      const lastAccepted = acceptedFiles[acceptedFiles.length - 1];
      setStatusMessage({
        message: interpolateMessage(msg.dropzone.successUpload, {
          fileName: lastAccepted.name,
          fileSize: lastAccepted.size,
        }),
        isError: false,
      });
    } catch (err) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : msg.dropzone.errorUnknown;

      setStatusMessage({
        message: interpolateMessage(msg.dropzone.errorUpload, {
          errorMsg,
        }),
        isError: true,
      });
    }
  };

  const onDropRejected = (fileRejections: FileRejection[]) => {
    const lastRejected = fileRejections[fileRejections.length - 1];
    const reason =
      lastRejected.errors[0]?.message ?? msg.dropzone.errorReasonDefault;
    setStatusMessage({
      message: interpolateMessage(msg.dropzone.errorFileRejected, {
        reason,
        fileName: lastRejected.file.name,
      }),
      isError: true,
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles,
    maxSize: megaBytesToBytes(maxSizeInMb),
    accept,
    onDropAccepted,
    onDropRejected,
  });

  const renderText = (text: string) => {
    return text.split("\n").map((line, index) => (
      <p
        key={index}
        className={`${styles.text} 
          group-hover:!text-gray-600 group-active:!text-gray-800`}
      >
        {line}
      </p>
    ));
  };

  return (
    <div
      {...getRootProps({
        className: `${styles.dropZoneContainer} group`,
      })}
    >
      <input className="input-zone" {...getInputProps()} />
      <div className={styles.uploadContainer}>
        <i
          className={`${styles.uploadIcon} ${isDragActive && styles.dragged}
            fa-solid fa-upload group-active:!text-primary-800`}
        />
        {renderText(isDragActive ? msg.dropzone.dragged : msg.dropzone.default)}
        {!isDragActive && (
          <button
            type="button"
            className={`${styles.btn} group-hover:!bg-primary-700
                group-active:!bg-primary-800`}
          >
            {msg.dropzone.buttonText}
          </button>
        )}
        <aside className={styles.statusMsgContainer}>
          <ul className={`${statusMessage?.isError && styles.error}`}>
            {statusMessage?.message}
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default UploadPictures;
