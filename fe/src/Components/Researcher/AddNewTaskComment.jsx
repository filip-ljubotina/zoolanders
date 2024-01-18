import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import * as React from "react";
import ApiService from "../../services/ApiService";
import "./Actions.css";

const AddNewTaskComment = ({ searcherInfo, data, onClose}) => {
    AddNewTaskComment.propTypes = {
        searcherInfo: PropTypes.object.isRequired,
        data: PropTypes.object,
        onClose: PropTypes.func
    };
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState("");
    const [newComment, setNewComment] = React.useState({
        taskId: data.taskId,
        taskComment: "",
    });

    const postData = async () => {
        try {
        await ApiService.put(
            `/wildTrack/researcher/putNewTaskComment`,
            newComment
        );
        } catch (error) {
            console.error("Error saving task comment:", error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e) => {
        e.preventDefault();
        setOpen(false);
        setError("");
    };

    const handleChange = (e) => {
        setNewComment({ ...newComment, ["taskComment"]: e.target.value });
    };

    const handleSubmit = () => {
        if (!newComment.taskComment.trim()) {
            setError("Potrebno je unijeti sadržaj komentara.");
            return null;
        }
        postData();
        setOpen(false);
        onClose();
    };

    return (
        <React.Fragment>
        <IconButton
            variant="outlined"
            onClick={handleClickOpen}
            sx={{
            borderColor: "black",
            color: "black",
            fontSize: "12px",
            padding: "8px 16px",
            }}
            title="Dodaj komentar"
        >
        <AddCommentOutlinedIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Ostavite novi komentar tragaču {searcherInfo.firstName} za zadatak
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                Trenutni komentar: {data.comment}
            </DialogContentText>
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
            <Button onClick={handleClose}>Odbaci</Button>
            <Button onClick={handleSubmit}>Spremi</Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
};

export default AddNewTaskComment;