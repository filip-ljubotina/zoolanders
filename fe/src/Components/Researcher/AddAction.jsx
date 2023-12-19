import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import { Select, MenuItem as SelectOption } from '@mui/material';
import PropTypes from "prop-types"
import ApiService from '../../services/ApiService';
import Button from '@mui/material/Button';



function AddAction({onAddCard}) {
    const [open, setOpen] = React.useState(false);
    const [changeType, setChangeType] = React.useState("pretraživanje");
    const [changeLocation, setChangeLocation] = React.useState("biokovo");
    const [newCard, setNewCard] = React.useState({
        actionType: "pretraživanje",
        locationName: "biokovo", //zamjeniti u stationName
        actionName: ""
      });
    
    const postData = async () => {
        try {
            await ApiService.post('/wildTrack/researcher/postNewAction', newCard);
            onAddCard()
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
        setNewCard({
            ...newCard,
            [e.target.name]: e.target.value,
        })
        if(e.target.name === "actionType"){
            setChangeType(e.target.value)    
        }
        if(e.target.name === "locationName"){
            setChangeLocation(e.target.value)    
        }
        console.log(newCard)
    }   

    const handleSubmit = () => {
        postData();
        setOpen(false);
    }

    return (
        <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}
            sx={{ borderColor: 'darkblue',
            color: 'darkblue'}}>
            Add Action
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Izradite novu akciju</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Unesite Područje Pretraživanja:
            </DialogContentText>
            <Select id="locationName" name="locationName" value={changeLocation} onChange={handleChange} required>
                <SelectOption key="biokovo" value="biokovo">Biokovo</SelectOption>
                <SelectOption key="lonjsko_polje" value="lonjsko_polje">Lonjsko polje</SelectOption>
            </Select>
            <DialogContentText>
                Unesite tip akcije:
            </DialogContentText>
            <Select id="actionType" name="actionType" value={changeType} onChange={handleChange} required>
                <SelectOption key="pretraživanje" value="pretraživanje">Pretraživanje</SelectOption>
                <SelectOption key="praćenje" value="praćenje">Praćenje</SelectOption>
            </Select>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            name="actionName"
            label="Unesite naziv akcije"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange} required/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Odbaci</Button>
                <Button onClick={handleSubmit}>Spremi</Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
    }

AddAction.propTypes = {
    onAddCard: PropTypes.func.isRequired,
};
    
export default AddAction;