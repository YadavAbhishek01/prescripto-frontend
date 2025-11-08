import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRef } from "react";

export default function DraggableDialog({ submitBtn,open, onClose, onConfirm, title, message }) {
  const nodeRef = useRef(null);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        {title || 'Confirm'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message || 'Are you sure?'}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            onConfirm(); // call the action callback
            onClose();   // then close the dialog
          }}
          color="error"
        >
          {submitBtn}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
