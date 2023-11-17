import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Select, MenuItem as SelectOption } from '@mui/material';
import ApiService from '../../Services/ApiService';
import PropTypes from "prop-types"


export default function Edit({data, onUpdate}) {
  Edit.propTypes = {
    data: PropTypes.object.isRequired
  }
  const [open, setOpen] = React.useState(false);
  const [change, setChange] = React.useState("userName");
  const [newValue, setNewValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [rowData, setRowData] = React.useState({
    id: data.id,
    userName: data.userName,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    image: data.image,
    role: data.role
  });onUpdate

  const updateData = async () => {
    try {
      setRowData((rowData) => ({ ...rowData, [change]: newValue }));
      await ApiService.put('/wildTrack/admin/putUserTable', rowData);
      onUpdate();
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setChange(e.target.value)
  }

  const handleNewValue = (e) => {
    setNewValue(e.target.value)
  }

  const handleSubmit = () => {
    if(newValue == "Tragač" && change !== "role") {
      setError(true)
    } else {
      console.log(change)
      updateData()
      setOpen(false);
    }
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}
        sx={{ borderColor: 'darkblue',
          color: 'darkblue'}}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Uredite podatke korisnika</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Unesite kategoriju podatka kojeg želite promijeniti i novu vrijednost.
          </DialogContentText>
          <Select id="select" value={change} onChange={handleChange} required>
            <SelectOption value="userName">Korisničko ime</SelectOption>
            <SelectOption value="firstName">Ime</SelectOption>
            <SelectOption value="lastName">Prezime</SelectOption>
            <SelectOption value="role">Uloga</SelectOption>
          </Select>
          {change === 'role' && <Select value={newValue} onChange={handleNewValue} required>
            <SelectOption value="SEARCHER_IN_THE_FIELD">Tragač</SelectOption>
            <SelectOption value="STATION_MANAGER">Voditelj postaje</SelectOption>
            <SelectOption value="RESEARCHER">Istraživač</SelectOption>
          </Select>
          }
          {change !== 'role' && <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nova vrijednost"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNewValue} required/>}
          {error && <h3 style={{color:"red"}}>Greška pri spremanju, pokušajte ponovno</h3>}
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Odbaci</Button>
          <Button onClick={handleSubmit}>Spremi</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

Edit.propTypes = {
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};