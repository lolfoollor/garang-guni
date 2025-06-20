import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import styles from "./Notice.module.css";

interface NoticeProps {
  open: boolean;
  handleClose: () => void;
  header: string;
  body: string;
  buttonText?: string;
}

const Notice = ({
  open,
  handleClose,
  header,
  body,
  buttonText = "Ok",
}: NoticeProps) => {
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
          className={styles.bodyText}
          id="alert-dialog-description"
        >
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className={styles.closeBtn} autoFocus>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Notice;
