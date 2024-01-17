import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import * as React from "react";
import { useMap } from "react-leaflet";
import ApiService from "../../services/ApiService";
import { DialogContentText } from "@mui/material";

const AddMapComment = ({ cardData, onAddComment }) => {
  AddMapComment.propTypes = {
    cardData: PropTypes.object.isRequired,
    onAddComment: PropTypes.func.isRequired,
  };

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [newComment, setNewComment] = React.useState({
    comment: "",
    coordinates: [],
  });

  const postData = async () => {
    try {
      await ApiService.post(
        `/wildTrack/researcher/postMapComment/${cardData.actionId}`,
        newComment
      );
      onAddComment();
    } catch (error) {
      console.error("Error saving map comment:", error);
    }
  };

  const handleClose = () => {
    setError("");
    setOpen(false);
  };

  const handleLocation = (e) => {
    console.log(e.latlng);
    setNewComment({
      ...newComment,
      ["coordinates"]: [e.latlng.lat, e.latlng.lng],
    });
  };

  const handleChange = (e) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!newComment.comment.trim()) {
      setError("Potrebno je unijeti sadržaj komentara");
      return null;
    }
    postData();
    setError("");
    setOpen(false);
  };

  const map = useMap();
  map.on("dblclick", (e) => {
    handleLocation(e);
    setOpen(true);
  });

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle> Dodajte svoj komentar </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            name="comment"
            label="Unesite komentar"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            required
          />
          {error && (
            <DialogContentText
              style={{ color: "var(--error-color)", textAlign: "center" }}
              className="error"
            >
              {error}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose}>
            {" "}
            Odbaci{" "}
          </Button>
          <Button type="button" onClick={handleSubmit}>
            {" "}
            Spremi{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddMapComment;
