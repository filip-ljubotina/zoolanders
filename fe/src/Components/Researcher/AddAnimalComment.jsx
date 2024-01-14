import * as React from "react";
import { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import ApiService from "../../services/ApiService";
import Button from "@mui/material/Button";
import "./Actions.css";
import TextField from "@mui/material/TextField";

const AddAnimalComment = ({ cardData, animal }) => {
  AddAnimalComment.propTypes = {
    cardData: PropTypes.object.isRequired,
    animal: PropTypes.object,
  };
  const [open, setOpen] = React.useState(false);
  const [newComment, setNewComment] = React.useState({
    comment: "",
  });

  const postData = async () => {
    try {
      await ApiService.post(
        `/wildTrack/researcher/postAnimalComment/${cardData.actionId}/${animal.animalId}`,
        newComment
      );
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewComment({ ...newComment, ["comment"]: e.target.value });
  };

  const handleSubmit = () => {
    postData();
    setOpen(false);
  };

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          borderColor: "darkblue",
          color: "darkblue",
          fontSize: "12px",
          padding: "8px 16px",
        }}
      >
        Add Commment
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Ostavite novi komentar komentar životinji {animal.animalName}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="animalComment"
            name="animalComment"
            label="Unesite komentar"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Odbaci</Button>
          <Button onClick={handleSubmit}>Spremi</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddAnimalComment;
