import MoreOutlinedIcon from "@mui/icons-material/MoreOutlined";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
} from "react-leaflet";
import ApiService from "../../services/ApiService";
import circle_icon from "../Assets/circle.png";
import compass_icon from "../Assets/compass.png";
import flag_icon from "../Assets/flag.png";
import Placeholder from "../Assets/camera.png";
import "./Actions.css";

const Routing = ({ waypointsRef, profile }) => {
  Routing.propTypes = {
    waypointsRef: PropTypes.object.isRequired,
    profile: PropTypes.string.isRequired,
  };
  const routingControlRef = useRef(null);
  const map = useMap();

  useEffect(() => {
    routingControlRef.current = L.Routing.control({
      waypoints: waypointsRef.current,
      show: false,
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
        profile: profile,
      }),
      createMarker: (i, waypoint, n) => {
        const iconUrl =
          i === 0 ? compass_icon : i === n - 1 ? flag_icon : circle_icon;
        return L.marker(waypoint.latLng, {
          icon: L.icon({
            iconUrl: iconUrl,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          }),
        });
      },
    }).addTo(map);
  }, []);
};

function SeeMore({ searcher, task, onSubmit }) {
  SeeMore.propTypes = {
    searcher: PropTypes.object,
    task: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
  };
  const [open, setOpen] = React.useState(false);
  const [isRoutingActive, setIsRoutingActive] = React.useState(false);
  const [error, setError] = React.useState("");
  const [image, setImage] = React.useState(Placeholder);
  const waypointsRef = useRef([]);
  if (waypointsRef.current.length === 0) {
    waypointsRef.current = task.routeWaypoints;
    waypointsRef.current[0] = searcher.currentPosition;
  }
  const [newAnimal, setNewAnimal] = React.useState({
    animalName: "",
    breed: "",
    description: "",
    image: "",
    currentPosition: task.routeWaypoints[task.routeWaypoints.length - 1],
  });
  const [isStored, setIsStored] = React.useState(
    task.taskToDo === "tracker" ? false : true
  );

  const postNewAnimal = async () => {
    try {
      await ApiService.post(
        `/wildTrack/searcherInTheField/postNewAnimal/`,
        newAnimal
      );
    } catch (error) {
      console.error("Error saving new animal:", error);
    }
  };

  const putTaskComplete = async () => {
    try {
      await ApiService.put(
        `/wildTrack/searcherInTheField/putTaskCompleted/${task.taskId}`,
        null
      );
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const handleClickOpen = () => {
    console.log(searcher.currentPosition);
    console.log(task.routeWaypoints);
    setOpen(true);
  };

  const handleClose = () => {
    setError("");
    setImage(Placeholder);
    setOpen(false);
  };

  const handleSubmit = () => {
    if (isStored !== false) {
      putTaskComplete();
      setOpen(false);
      onSubmit();
    }
  };

  const handleSave = () => {
    if (
      !newAnimal.animalName.trim() ||
      !newAnimal.breed.trim() ||
      !newAnimal.description.trim()
    ) {
      setError("Molimo Vas da unesete sve potrebne podatke.");
      return null;
    }
    if (isStored === false) {
      setIsStored(true);
      setError("");
      postNewAnimal();
    }
  };

  const mapToQualification = (label) => {
    switch (label) {
      case "FOOT":
        return "foot";
      case "CAR":
        return "car";
      case "CROSS_MOTOR":
        return "bike";
      default:
        return false;
    }
  };

  const renderMarkers = () => {
    return waypointsRef.current.map((marker, index) => {
      let iconUrl;

      if (index === 0) {
        iconUrl = compass_icon;
      } else if (index === waypointsRef.current.length - 1) {
        iconUrl = flag_icon;
      } else {
        iconUrl = circle_icon;
      }

      return (
        <Marker
          key={index}
          position={marker}
          icon={L.icon({
            iconUrl: iconUrl,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })}
        />
      );
    });
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1]; // Extracting the Base64-encoded string

          setNewAnimal({ ...newAnimal, image: base64String });
          setImage(reader.result);
        };

        reader.readAsDataURL(file);
      }
    }
    setNewAnimal({
      ...newAnimal,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (mapToQualification(searcher.qualification) !== false) {
      setIsRoutingActive(true);
    }
  }, []);

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
        title="Detalji"
      >
        <MoreOutlinedIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Prikaz rute</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pratite označenu rutu na karti za dolazak na lokaciju.
          </DialogContentText>
          <DialogContentText>
            Na lokaciji trebate postaviti{" "}
            {task.taskToDo === "tracker" ? "uređaj za praćenje" : "kameru"}.
          </DialogContentText>
          <MapContainer
            center={searcher.currentPosition}
            zoom={10}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {isRoutingActive === true && (
              <Routing
                waypointsRef={waypointsRef}
                profile={mapToQualification(searcher.qualification)}
              />
            )}
            {isRoutingActive === false && renderMarkers()}
            {isRoutingActive === false && (
              <Polyline positions={waypointsRef.current} color="blue" />
            )}
          </MapContainer>
          {task.taskToDo === "tracker" && (
            <>
              <DialogContentText>
                Unesite podatke životinje s novim uređajem za prećenje.
              </DialogContentText>
              <div className="register-input-container name-photo">
                <div className="register-input">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="animalName"
                    name="animalName"
                    label="Unesite ime životinje"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="breed"
                    name="breed"
                    label="Unesite vrstu životinje"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    name="description"
                    label="Unesite dodatan opis za životinju"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="register-input-photo-animal">
                  <label
                    htmlFor="photo-upload"
                    className="custom-file-upload-animal"
                  >
                    <div className="img-wrap img-upload">
                      <img htmlFor="photo-upload" src={image} />
                    </div>
                    <input
                      id="photo-upload"
                      type="file"
                      required
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <Button
                variant="outlined"
                onClick={handleSave}
                sx={{ borderColor: "darkblue", color: "darkblue" }}
              >
                Pohrani
              </Button>
            </>
          )}
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
          <Button onClick={handleSubmit}>Gotov</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default SeeMore;
