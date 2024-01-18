import { Select, MenuItem as SelectOption } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect } from "react";
import ApiService from "../../services/ApiService";
import "./Actions.css";

const ChooseSearcherView = ({ cardData, onSubmit }) => {
  ChooseSearcherView.propTypes = {
    cardData: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };
  const [open, setOpen] = React.useState(false);
  const [pastRoutesData, setPastRoutesData] = React.useState([]);
  const [subject, setSubject] = React.useState("individual");
  const [checkedQualifications, setCheckedQualifications] = React.useState([]);
  const [checkedSearchers, setCheckedSearchers] = React.useState([]);

  const [subjectMapView, setSubjectMapView] = React.useState({
    subject: "individual",
    checkedItems: [],
  });

  const fetchData = async () => {
    try {
      const responsePastRoutes = await ApiService.get(
        `wildTrack/researcher/getPastAllSearchersRoutes/${cardData.actionId}`
      );
      setPastRoutesData(
        responsePastRoutes.data.filter((route, i, self) => {
          for (let j = 0; j < i; i++) {
            if (self[j].searcherId === route.searcherId) {
              return false;
            }
          }
          return true;
        })
      );
      setCheckedSearchers(
        responsePastRoutes.data.map((pastRoute) => {
          return pastRoute.searcherId;
        })
      );
    } catch (error) {
      console.error("Error fetching past routes:", error);
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
      setCheckedQualifications([]);
      setCheckedSearchers([]);
    }
  };

  const handleCheckboxQualificationChange = (qualification) => {
    setCheckedQualifications((prevCheckedItems) => {
      if (prevCheckedItems.includes(qualification)) {
        return prevCheckedItems.filter((item) => item !== qualification);
      } else {
        return [...prevCheckedItems, qualification];
      }
    });
  };

  const handleCheckboxSearcherChange = (searcherId) => {
    setCheckedSearchers((prevCheckedItems) => {
      if (prevCheckedItems.includes(searcherId)) {
        return prevCheckedItems.filter((item) => item !== searcherId);
      } else {
        return [...prevCheckedItems, searcherId];
      }
    });
  };

  useEffect(() => {
    setSubjectMapView({
      ...subjectMapView,
      ["checkedItems"]: checkedQualifications,
    });
  }, [checkedQualifications]);

  useEffect(() => {
    setSubjectMapView({
      ...subjectMapView,
      ["checkedItems"]: checkedSearchers,
    });
  }, [checkedSearchers]);

  useEffect(() => {
    setSubjectMapView({
      ...subjectMapView,
      ["subject"]: subject,
    });
  }, [subject]);

  const handleSubmit = async () => {
    try {
      onSubmit(subjectMapView);
      setOpen(false);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const allQualifications = [
    "Pješice",
    "Dron",
    "Automobil",
    "Cross Motor",
    "Brod",
    "Helikopter",
  ];

  const mapToQualification = (label) => {
    switch (label) {
      case "Pješice":
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
        Odabir tragača <br /> za prikaz
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Odaberite koje tragače želite proučavati na karti
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Odaberite vrstu filtriranja</DialogContentText>
          <Select
            id="subject"
            name="subject"
            value={subject}
            onChange={handleChange}
            required
          >
            <SelectOption key="individual" value="individual">
              Pojedinac
            </SelectOption>
            <SelectOption key="qualification" value="qualification">
              Vrsta prijevoza
            </SelectOption>
          </Select>
          {subject === "qualification" && (
            <DialogContentText>
              Odaberite koju grupu tragača želite proučavati
            </DialogContentText>
          )}
          {subject === "qualification" && (
            <FormGroup>
              {allQualifications.map((qualification) => (
                <FormControlLabel
                  key={qualification}
                  control={
                    <Checkbox
                      checked={checkedQualifications.includes(
                        mapToQualification(qualification)
                      )}
                      onChange={() =>
                        handleCheckboxQualificationChange(
                          mapToQualification(qualification)
                        )
                      }
                    />
                  }
                  label={qualification}
                />
              ))}
            </FormGroup>
          )}
          {subject === "individual" && (
            <DialogContentText>
              Odaberite tragača za proučavanje
            </DialogContentText>
          )}
          {subject === "individual" && (
            <FormGroup>
              {pastRoutesData.map((pastRoute) => (
                <FormControlLabel
                  key={pastRoute.searcherId}
                  control={
                    <Checkbox
                      checked={checkedSearchers.includes(pastRoute.searcherId)}
                      onChange={() =>
                        handleCheckboxSearcherChange(pastRoute.searcherId)
                      }
                    />
                  }
                  label={pastRoute.searcherId}
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
};

export default ChooseSearcherView;
