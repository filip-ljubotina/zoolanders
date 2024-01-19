import * as React from "react";
import { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { Select, MenuItem as SelectOption } from "@mui/material";
import PropTypes from "prop-types";
import ApiService from "../../services/ApiService";
import Button from "@mui/material/Button";
import "./Actions.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function ChooseSubjectView({ cardData, onSubmit }) {
  ChooseSubjectView.propTypes = {
    cardData: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = React.useState("individual");
  const [allBreeds, setAllBreeds] = React.useState([]);
  const [checkedBreeds, setCheckedBreeds] = React.useState([]);
  const [allAnimals, setAllAnimals] = React.useState([]);
  const [checkedAnimals, setCheckedAnimals] = React.useState([]);

  const [subjectMapView, setSubjectMapView] = React.useState({
    subject: "individual",
    checkedItems: [],
  });

  const fetchData = async () => {
    try {
      const responseBreeds = await ApiService.get(
        `/wildTrack/animal/findAllBreedsByStation/${cardData.locationName}`
      );
      const responseAnimals = await ApiService.get(
        `wildTrack/animal/findAllAnimalsByStation/${cardData.locationName}`
      );
      const responseCriteria = await ApiService.get(
        `wildTrack/researcher/getMapViewCriteria/${cardData.actionId}`
      );
      setAllBreeds(responseBreeds.data);
      setAllAnimals(responseAnimals.data);
      if (responseCriteria.data.subject === "individual") {
        setSubject("individual");
        setCheckedAnimals(responseCriteria.data.checkedItems);
      } else {
        setSubject("breed");
        setCheckedBreeds(responseCriteria.data.checkedItems);
      }
    } catch (error) {
      console.error("Error fetching animal criteria:", error);
    }
  };

  const putData = async () => {
    try {
      await ApiService.put(
        `/wildTrack/researcher/putMapViewCriteria/${cardData.actionId}`,
        subjectMapView
      );
    } catch (error) {
      console.error("Error saving animal criteria:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.name === "subject") {
      setSubject(e.target.value);
      setCheckedAnimals([]);
      setCheckedBreeds([]);
    }
  };

  const handleCheckboxBreedsChange = (breed) => {
    setCheckedBreeds((prevCheckedItems) => {
      if (prevCheckedItems.includes(breed)) {
        return prevCheckedItems.filter((item) => item !== breed);
      } else {
        return [...prevCheckedItems, breed];
      }
    });
  };

  const handleCheckboxAnimalsChange = (animalId) => {
    setCheckedAnimals((prevCheckedItems) => {
      if (prevCheckedItems.includes(animalId)) {
        return prevCheckedItems.filter((item) => item !== animalId);
      } else {
        return [...prevCheckedItems, animalId];
      }
    });
  };

  useEffect(() => {
    setSubjectMapView({
      ...subjectMapView,
      ["checkedItems"]: checkedBreeds,
    });
  }, [checkedBreeds]);

  useEffect(() => {
    setSubjectMapView({
      ...subjectMapView,
      ["checkedItems"]: checkedAnimals,
    });
  }, [checkedAnimals]);

  useEffect(() => {
    setSubjectMapView({
      ...subjectMapView,
      ["subject"]: subject,
    });
  }, [subject]);

  const handleSubmit = async () => {
    try {
      await putData();
      onSubmit();
      setOpen(false);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          borderColor: "darkblue",
          color: "darkblue",
          width: "180px",
          alignSelf: "center",
        }}
      >
        Odabir predmeta <br /> za proučavanje
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Odaberite što će se na akciji proučavati</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Odaberite predmet za proučavanje
          </DialogContentText>
          <Select
            id="subject"
            name="subject"
            value={subject}
            onChange={handleChange}
            required
          >
            <SelectOption key="individual" value="individual">
              Jedinka
            </SelectOption>
            <SelectOption key="breed" value="breed">
              Vrsta
            </SelectOption>
          </Select>
          {subject === "breed" && (
            <DialogContentText>
              Odaberite vrste životinja za proučavanje
            </DialogContentText>
          )}
          {subject === "breed" && (
            <FormGroup>
              {allBreeds.map((breed) => (
                <FormControlLabel
                  key={breed}
                  control={
                    <Checkbox
                      checked={checkedBreeds.includes(breed)}
                      onChange={() => handleCheckboxBreedsChange(breed)}
                    />
                  }
                  label={breed}
                />
              ))}
            </FormGroup>
          )}

          {subject === "individual" && (
            <DialogContentText>
              Odaberite životinje za proučavanje
            </DialogContentText>
          )}
          {subject === "individual" && (
            <FormGroup>
              {allAnimals.map((animal) => (
                <FormControlLabel
                  key={animal.animalId}
                  control={
                    <Checkbox
                      checked={checkedAnimals.includes(animal.animalId)}
                      onChange={() =>
                        handleCheckboxAnimalsChange(animal.animalId)
                      }
                    />
                  }
                  label={animal.animalName}
                />
              ))}
            </FormGroup>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Odbaci</Button>
          <Button onClick={handleSubmit}>Spremi</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ChooseSubjectView;
