import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import * as React from "react";
import ApiService from "../../services/ApiService";
import Choose from "./Choose";

const ChooseSearcher = ({ card, onSave }) => {
  ChooseSearcher.propTypes = {
    card: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    try {
      const responseData = await ApiService.get(
        `/wildTrack/manager/getAllAvailableSearchersForAction?actionId=${card.actionId}`
      );
      setData(responseData.data.map((row) => ({ ...row, id: row.searcherId })));
    } catch (error) {
      console.error("Error fetching available searchers:", error);
    }
  };

  const updateData = async () => {
    try {
      await ApiService.put(
        `/wildTrack/manager/putActionSearcherRequestToNull?actionId=${card.actionId}`,
        null
      );
      onSave();
    } catch (error) {
      console.error("Error closing searcher request:", error);
    }
  };

  const handleClickOpen = () => {
    fetchData();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    updateData();
    setOpen(false);
  };

  const handleChoose = async () => {
    try {
      fetchData();
    } catch (error) {
      console.error(
        "Error fetching available searchers after adding to action:",
        error
      );
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100, flex: 0.5 },
    {
      field: "firstName",
      headerName: "Ime",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Prezime",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "qualification",
      headerName: "Osposobljenje",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row: { qualification } }) => {
        return (
          <Box
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            {qualification === "FOOT" && <a>Pješke</a>}
            {qualification === "DRONE" && <a>Dron</a>}
            {qualification === "CAR" && <a>Automobil</a>}
            {qualification === "CROSS_MOTOR" && <a>Cross Motor</a>}
            {qualification === "BOAT" && <a>Brod</a>}
            {qualification === "HELICOPTER" && <a>Helikopter</a>}
          </Box>
        );
      },
    },
  ];

  const chooseColumn = [
    {
      field: "choose",
      headerName: "Dodaj akciji",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Choose cardInfo={card} data={params.row} onChoose={handleChoose} />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Odabir tragača
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          Odaberite tragače za akciju: {card.actionName}
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
              <DataGrid rows={data} columns={columns.concat(chooseColumn)} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Odbaci</Button>
          <Button onClick={handleSubmit}>Spremi</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChooseSearcher;
