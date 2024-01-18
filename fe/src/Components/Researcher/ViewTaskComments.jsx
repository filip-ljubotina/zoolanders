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
import AddNewTaskComment from "./AddNewTaskComment";

import "./Actions.css";

const ViewTaskComments = ({ searcher }) => {
ViewTaskComments.propTypes = {
    searcher: PropTypes.object.isRequired,
  };
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const fetchData = async () => {
    try {
      const responseData = await ApiService.get(`/wildTrack/researcher/getAllSearcherTasks/${searcher.searcherId}`);
      setData(
        responseData.data.map((row) => ({ ...row, id: row.taskId, taskToDo: row.taskToDo, comment: row.taskComment}))
      );
    } catch (error) {
      console.error("Error fetching tasks comments:", error);
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
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "taskToDo",
      headerName: "Zadatak",
      width: 150,
    },
    {
      field: "taskComment",
      headerName: "Komentar",
      width: 150,
    },
  ];

  const addColumn = [
    {
      field: "add",
      headerName: "Novi komentar",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <AddNewTaskComment searcherInfo={searcher} data={params.row} onClose={handleClose} />
          </div>
        );
      },
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
        title="Pregledaj sve zadatke"
      >
        <InsertCommentOutlinedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
            Pregled svih zadataka
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
              <DataGrid rows={data} columns={columns.concat(addColumn)} />
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

export default ViewTaskComments;
