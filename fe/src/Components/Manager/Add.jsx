import { Select, MenuItem as SelectOption } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import * as React from "react";
import ApiService from "../../services/ApiService";
import SearchTypeMap from "./SearchTypeMap";

export default function Add({ data, coordinates, onSave }) {
  Add.propTypes = {
    data: PropTypes.object.isRequired,
    coordinates: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
  };
  const [open, setOpen] = React.useState(false);
  const [change, setChange] = React.useState("FOOT");
  const [rowData, setRowData] = React.useState({
    searcherId: data.id,
    qualification: "FOOT",
  });

  const updateData = async () => {
    try {
      await ApiService.put("/wildTrack/manager/putChosenSearcher", rowData);
      onSave();
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
    setRowData((rowData) => ({ ...rowData, qualification: e.target.value }));
    setChange(e.target.value);
  };

  const handleSubmit = () => {
    updateData();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ borderColor: "darkblue", color: "darkblue" }}
      >
        Dodaj
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Odredite osposobljenost tragača</DialogTitle>
        <DialogContent>
          <Select id="select" value={change} onChange={handleChange} required>
            <SelectOption value="FOOT">Pješice</SelectOption>
            <SelectOption value="DRONE">Dron</SelectOption>
            <SelectOption value="CAR">Automobil</SelectOption>
            <SelectOption value="CROSS_MOTOR">Cross Motor</SelectOption>
            <SelectOption value="BOAT">Brod</SelectOption>
            <SelectOption value="HELICOPTER">Helikopter</SelectOption>
          </Select>
          <div style={{ marginTop: "20px", width: "100%" }}>
            <SearchTypeMap coordinates={coordinates} searchType={change} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Odbaci</Button>
          <Button onClick={handleSubmit}>Spremi</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
