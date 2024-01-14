import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useMapEvents } from "react-leaflet/hooks";
import ApiService from "../../services/ApiService";

const AddComment = (onAddComment) => {
  const [open, setOpen] = React.useState(false);
  const [newComment, setNewComment] = React.useState({
    location: "",
    content: "",
  });

  const postData = async () => {
    try {
      await ApiService.post(
        "/wildTrack/searcherInTheField/postNewCommentOnMap",
        newComment
      );
      onAddComment();
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLocation = (e) => {
    setNewComment({
      ...newComment,
      ["location"]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    postData();
    setOpen(false);
  };

  const map = useMapEvents({
    dblclick: (e) => {
      handleLocation(e);
      setOpen(true);
      console.log(map);
    },
  });

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle> Dodajte svoj komentar </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="actionName"
            label="Unesite komentar"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Odbaci </Button>
          <Button onClick={handleSubmit}> Spremi </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddComment;
