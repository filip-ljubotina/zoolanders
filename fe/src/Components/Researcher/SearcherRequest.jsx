import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { Select, MenuItem as SelectOption } from '@mui/material';
import PropTypes from "prop-types"
import ApiService from '../../services/ApiService';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function SearcherRequest({card}) {
    const [open, setOpen] = useState(false);
    const [changeLocation, setChangeLocation] = useState("biokovo");
    const [availableCertifications, setAvailableCertifications] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [requset, setRequset] = useState({
        actionId: card.actionId,
        stationName: "biokovo",
        qualifications: []
      });
      const [requestFlag, setRequestFlag] = useState(false);


    const allQualifications = ["Pješke", "Dron", "Automobil", "Cross Motor", "Brod", "Helikopter"];

    const fetchData = async () => {
        try {
            const response = await ApiService.get('/wildTrack/researcher/getAvailableStationQualifications');
            setAvailableCertifications(response.data.stationQualifications[changeLocation] || []);
        } catch (error) {
            console.error('Error fetching table data:', error);
        }
    };

    const updateData = async () => {
        try {
            await ApiService.put('/wildTrack/researcher/putNewRequest', requset);
        } catch (error) {
          console.error('Error fetching table data:', error);
        }
    };

    useEffect(() => { 
        setCheckedItems([]);
        fetchData(); 
    }, [changeLocation]);

    useEffect(() => {
        if (requestFlag){
            setRequestFlag(false)
            updateData();
        }
    }, [requset]);

    const handleClickOpen = () => {
        fetchData();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        setRequestFlag(true)
        setRequset((prevRequest) => ({
            ...prevRequest,
            qualifications: checkedItems,
            stationName: changeLocation
          }));
        setOpen(false);
    }

    const handleChange = (e) => {
        setChangeLocation(e.target.value);
    }

    const handleCheckboxChange = (qualification) => {
        setCheckedItems(prevCheckedItems => {
            if (prevCheckedItems.includes(qualification)) {
                return prevCheckedItems.filter(item => item !== qualification);
            } else {
                return [...prevCheckedItems, qualification];
            }
        });
    };

    const mapToQualification = (label) => {
        switch (label) {
            case "Pješke":
                return "FOOT";
            case "Dron":
                return "DRONE";
            case "Automobil":
                return "CAR";
            case "Cross Motor":
                return "CROSS_MOTOR";
            case "Brod":
                return "BOAT";
            case "Helikopter":
                return "HELICOPTER";
            default:
                return label;
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Zahtjev Za Tragačima
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Izradite Novi Zahtjev</DialogTitle>
                <DialogContent>
                    <DialogContentText>Odabir Postaje:</DialogContentText>
                    <Select
                        id="locationName"
                        name="locationName"
                        value={changeLocation}
                        onChange={handleChange}
                        required
                    >
                        <SelectOption key="biokovo" value="biokovo">
                            Biokovo
                        </SelectOption>
                        <SelectOption key="lonjsko_polje" value="lonjsko_polje">
                            Lonjsko polje
                        </SelectOption>
                    </Select>
                    <DialogContentText>Dostupna Osposobljenja:</DialogContentText>
                    <FormGroup>
                        {allQualifications.map((qualification) => (
                            <FormControlLabel
                                key={qualification}
                                control={
                                    <Checkbox
                                        checked={checkedItems.includes(mapToQualification(qualification))}
                                        onChange={() => handleCheckboxChange(mapToQualification(qualification))}
                                        disabled={!availableCertifications.includes(mapToQualification(qualification))}
                                    />
                                }
                                label={qualification}
                            />
                        ))}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Spremi</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

SearcherRequest.propTypes = {
    card: PropTypes.object.isRequired,
};

export default SearcherRequest;
