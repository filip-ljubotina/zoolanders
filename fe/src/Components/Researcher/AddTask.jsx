import * as React from 'react';
import { useRef, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { Select, MenuItem as SelectOption } from '@mui/material';
import PropTypes from "prop-types"
import ApiService from '../../services/ApiService';
import Button from '@mui/material/Button';
import './Actions.css';
import { MapContainer, TileLayer, useMap, Marker, Polyline} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import TextField from '@mui/material/TextField';
import flag_icon from '../Assets/flag.png'
import circle_icon from '../Assets/circle.png'
import searcher_icon_png from '../Assets/searcher.png'


const Routing = ({waypointsRef, profile, isRoutingActive, reRenderKey,setReRenderKey}) => {
    Routing.propTypes = {
      waypointsRef: PropTypes.object.isRequired,
      profile: PropTypes.string.isRequired,
      isRoutingActive: PropTypes.Boolean,
      setReRenderKey: PropTypes.func,
      reRenderKey: PropTypes.number
    };
    const routingControlRef = useRef(null);
    const clickHandlerRef = useRef(null);
    const map = useMap(); 
  
    const handleMapClick = (event) => {
      const clickedLatLng = event.latlng;
      waypointsRef.current.push(clickedLatLng);
      if(isRoutingActive == true){
        routingControlRef.current.setWaypoints(waypointsRef.current);  
      }else{
        setReRenderKey(reRenderKey += 1);
      }
    };
  
    useEffect(() => {
  
      clickHandlerRef.current = handleMapClick;
      map.on('click', clickHandlerRef.current);
        if(isRoutingActive == true){
            routingControlRef.current = L.Routing.control({
                waypoints: waypointsRef.current,
                show: false,
                router: L.Routing.osrmv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1',
                    profile: profile, 
                }),
                createMarker: (i, waypoint, n) => {
                    const iconUrl = i === 0 ? searcher_icon_png : i === n - 1 ? flag_icon : circle_icon;
                    return L.marker(waypoint.latLng, {
                        icon: L.icon({
                            iconUrl: iconUrl,
                            iconSize: [32, 32], 
                            iconAnchor: [16, 32], 
                        }),
                    });
                }, 
            }).addTo(map);      
        }
      
  
    }, []);
  };

function AddTask({cardData, searcher}) {
    AddTask.propTypes = {
        cardData: PropTypes.object.isRequired,
        searcher: PropTypes.object,
    };
    const [open, setOpen] = React.useState(false);
    const [taskToDo, setTaskToDo] = React.useState("camera");
    const [taskComment, setTaskComment] = React.useState("");
    const [isRoutingActive, setIsRoutingActive] = React.useState(false);
    const [reRenderKey, setReRenderKey] = React.useState(1);
    const waypointsRef = useRef([]);
    if(waypointsRef.current.length === 0){
        waypointsRef.current.push(searcher.currentPosition);    
    }
    const [newTask, setNewTask] = React.useState({
        searcherId: searcher.searcherId,
        taskToDo: "camera",
        routeWaypoints: [],
        taskComment:""
      });

    const postData = async () => {
        try {
            await ApiService.post(`/wildTrack/researcher/postNewTask/${cardData.actionId}`, newTask);
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
        if(e.target.name === "taskToDo"){
            setTaskToDo(e.target.value) 
        }

        if(e.target.name === "taskComment"){
            setTaskComment(e.target.value) 
        }
    } 

    useEffect(() => {
        const latLngArray = extractLatLng(waypointsRef.current);
        setNewTask({
            ...newTask,
            ["taskToDo"]: taskToDo,
            ["routeWaypoints"]: latLngArray,
            ["taskComment"]: taskComment,
        })
    }, [ taskToDo, waypointsRef.current, taskComment]);

    function extractLatLng(inputArray) {
        return inputArray.map(item => {
            if (Array.isArray(item) && item.length === 2) {
                return item;
            } else if (typeof item === 'object' && item.lat && item.lng) {
                return [item.lat, item.lng];
            }
            return null;
        }).filter(Boolean);
    }

    const handleSubmit = () => {
        const latLngArray = extractLatLng(waypointsRef.current);
        console.log(latLngArray);
        setNewTask({
            ...newTask,
            ["routeWaypoints"]: latLngArray,
        })
        postData();
        waypointsRef.current = [];
        setTaskToDo("camera")
        setOpen(false);
    }

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
        return extractLatLng(waypointsRef.current).map((marker, index) => {
          let iconUrl;
      
          if (index === 0) {
            iconUrl = searcher_icon_png;
          } else if (index === waypointsRef.current.length - 1) {
            iconUrl = flag_icon;
          } else {
            iconUrl = circle_icon;
          }
      
          return <Marker key={index} position={marker} icon={L.icon({
            iconUrl: iconUrl,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })} />;
        });
      }

    useEffect(() => {
        if (mapToQualification(searcher.qualification) !== false){
            setIsRoutingActive(true);
        }
    }, []);

    return (
        <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}
            sx={{ borderColor: 'darkblue',
            color: 'darkblue'}}>
            Add Task
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Izradite novi zadatak tragaču {searcher.firstName}</DialogTitle>
            <DialogContent>


            <DialogContentText>
                Što je zadatak tragača?
            </DialogContentText>
            <Select id="taskToDo" name="taskToDo" value={taskToDo} onChange={handleChange} required>
                <SelectOption key="camera" value="camera">Postavljanje Kamere</SelectOption>
                <SelectOption key="tracker" value="tracker">Postavljanje Uređaja Za Praćenje</SelectOption>
            </Select>
            
            <DialogContentText>
                Odaberite rutu i lokaciju dolaska za tragača
            </DialogContentText>
            <MapContainer key={reRenderKey} center={searcher.currentPosition} zoom={10} style={{ height: '300px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Routing waypointsRef={waypointsRef} profile={mapToQualification(searcher.qualification)}
                isRoutingActive={isRoutingActive} reRenderKey={reRenderKey} setReRenderKey={setReRenderKey}/>
                {isRoutingActive === false && renderMarkers()}
                {isRoutingActive === false && (
                    <Polyline positions={extractLatLng(waypointsRef.current)} color="blue" />
                )}
            </MapContainer>
            <TextField
                autoFocus
                margin="dense"
                id="taskComment"
                name="taskComment"
                label="Unesite komentar za zadatak"
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


    
export default AddTask;