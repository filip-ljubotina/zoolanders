import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import ApiService from "../../services/ApiService";
import Button from "@mui/material/Button";
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";

import "./Actions.css";

const ViewAnimalComments = ({ cardData, animal }) => {
  ViewAnimalComments.propTypes = {
    cardData: PropTypes.object.isRequired,
    animal: PropTypes.object.isRequired,
  };
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const fetchData = async () => {
    try {
      const responseData = await ApiService.get(
        `/wildTrack/animal/getAllAnimalComments/${cardData.actionId}/${animal.animalId}`
      );
      setData(responseData.data);
    } catch (error) {
      console.error("Error fetching animal comments:", error);
    }
  };

  const handleClickOpen = () => {
    fetchData();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "animalCommentId", headerName: "ID", minWidth: 50, flex: 0.5 },
    {
      field: "userName",
      headerName: "Korisnik",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "comment",
      headerName: "Komentar",
      minWidth: 200,
      flex: 1,
    },
  ];

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
        title="Pregledaj komentare"
      >
        <InsertCommentOutlinedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Svi komentari za životinju {animal.animalName}
        </DialogTitle>
        <DialogContent>
          <Box m="20px">
            <Box
              m="40px 0 0 0"
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-cell": { borderBottom: "none" },
              }}
            >
              <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => {
                  return row.animalCommentId;
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zatvori</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ViewAnimalComments;
