import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import * as React from "react";
import ApiService from "../../services/ApiService";

export default function Approve({ row, onApprove }) {
  Approve.propTypes = {
    row: PropTypes.object.isRequired,
    onApprove: PropTypes.func.isRequired,
  };

  const [open, setOpen] = React.useState(false);

  const updateData = async ({ row }) => {
    try {
      await ApiService.put("/wildTrack/admin/putApprovalTable", row);
      onApprove();
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleReject = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    updateData({ row });
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ borderColor: "darkblue", color: "darkblue" }}
      >
        Obradi
      </Button>
      <Dialog
        open={open}
        onClose={handleReject}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Želite li potvrditi registraciju korisnika?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ova naredba se ne može poništiti nakon odabira.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReject}>Odustani</Button>
          <Button onClick={handleConfirm} autoFocus>
            Potvrdi
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
