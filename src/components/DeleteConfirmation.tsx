import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import styles from "./DeleteConfirmation.module.css";
import msg from "@/locales/en/components/modalMsg.json";

interface DeleteConfirmationProps {
  open: boolean;
  handleClose: () => void;
  header: string;
  body: string;
  cancelText?: string;
  deleteText?: string;
  handleDelete: () => void;
}

const DeleteConfirmation = ({
  open,
  handleClose,
  header,
  body = "",
  cancelText = msg.button.cancel,
  deleteText = msg.button.delete,
  handleDelete,
}: DeleteConfirmationProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={styles.headerText}>
        {header}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          className={styles.bodyText}
        >
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          onClick={handleClose}
          className={styles.customBtn}
        >
          {cancelText}
        </Button>
        <Button
          type="button"
          onClick={handleDelete}
          className={styles.customBtn}
        >
          {deleteText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
