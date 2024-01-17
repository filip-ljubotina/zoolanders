import * as React from 'react';
import {useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Actions.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ApiService from '../../services/ApiService';
import SeeMore from './SeeMore'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import searcher_icon_png from '../Assets/searcher.png'
import pawprint_icon from '../Assets/pawprint.png'
import compass_icon from '../Assets/compass.png'
import clipboard_icon from '../Assets/clipboard.png'
import Button from '@mui/material/Button';
import AddAnimalComment from './AddAnimalComment'
import ViewAnimalComments from './ViewAnimalComments'

const Action = ({ onLogout }) => {
    Action.propTypes = {
    onLogout: PropTypes.func.isRequired,
  };
  const centerCoordinates = [44.972571, 16.21582];
  const [checkActionFlag, setCheckActionFlag] = useState(null); 
  const [actionInfo, setActionInfo] = useState({});
  const [searcher, setSearcher] = useState({});
  const [allSearchers, setAllSearchers] = useState([]);
  const [allAnimals, setAllAnimals] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  
  const checkAction = async () => {
    try {
      const response = await ApiService.get(`/wildTrack/searcherInTheField/getCheckUserOnAction`);
      setCheckActionFlag(response.data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const removeFromAction = async () => {
    try {
      await ApiService.put(`/wildTrack/searcherInTheField/putRemoveFromAction`);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const actionResponse = await ApiService.get(`/wildTrack/searcherInTheField/getActionInfo`);
      const searcherResponse = await ApiService.get(`/wildTrack/searcherInTheField/getSearcherInfo`);
      const allSearchersResponse = await ApiService.get(`/wildTrack/searcherInTheField/getAllSearchersOnAction`);
      const allAnimalsResponse = await ApiService.get(`wildTrack/searcherInTheField/getAllAnimalsOnAction`);
      const allTasksResponse = await ApiService.get(`wildTrack/searcherInTheField/getAllActiveTasks`);
      setActionInfo(actionResponse.data);
      setSearcher(searcherResponse.data);
      setAllSearchers(allSearchersResponse.data);
      setAllAnimals(allAnimalsResponse.data);
      setAllTasks(allTasksResponse.data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  useEffect(() => {
    checkAction();
  }, []);

  useEffect(() => {
    if(checkActionFlag === true){
      fetchData();
    }
  }, [checkActionFlag]);

  const handleDone = () => {
    removeFromAction();
    fetchData();
  };

  const searcherIcon = new L.Icon({
    iconUrl: searcher_icon_png,
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32], 
  });

  const animalIcon = new L.Icon({
    iconUrl: pawprint_icon,
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32], 
  });

  const compassIcon = new L.Icon({
    iconUrl: compass_icon,
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32], 
  });

  const taskIcon = new L.Icon({
    iconUrl: clipboard_icon,
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32], 
  });

  useEffect(() => {
    console.log('actionInfo changed:', actionInfo);
    console.log('searcher changed:', searcher);
    console.log('allSearchers changed:', allSearchers);
    console.log('allAnimals changed:', allAnimals);
    console.log('allTasks changed:', allTasks);
  }, [actionInfo, searcher, allSearchers, allAnimals, allTasks]);

  return (
    <div className="users">
      <Sidebar />
      <div className="usersContainer">
        <Topbar title={actionInfo.actionName} onLogout={onLogout} /> 
        {checkActionFlag === true && (
        <MapContainer center={centerCoordinates} zoom={7} style={{ height: '80%', width: '80%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MarkerClusterGroup>
            {Object.keys(searcher).length !== 0 && (<Marker key={`${searcher.currentPosition}`} position={searcher.currentPosition} icon={compassIcon}>
              <Popup>
                Vaša Trenutna Lokacija
              </Popup>
            </Marker>)}

            {allSearchers.length > 0 && allSearchers.map((searcher) => (
              <Marker key={searcher.searcherId} position={searcher.currentPosition} icon={searcherIcon}>
                <Popup>
                  {`Name: ${searcher.firstName} Surname: ${searcher.lastName}`}
                  <br />
                  {`Qualification: ${searcher.qualification}`}
                </Popup>
              </Marker>
            ))}

            {allAnimals.length > 0 && allAnimals.map((animal) => (
              <Marker key={animal.animalId} position={animal.currentPosition} icon={animalIcon}>
                <Popup>
                  {`Name: ${animal.animalName} Breed: ${animal.breed}`}
                  <br />
                  {`Description: ${animal.description}`}
                  <br />
                  <AddAnimalComment cardData={actionInfo} animal={animal}/>
                  <ViewAnimalComments cardData={actionInfo} animal={animal}/>
                </Popup>
              </Marker>
            ))}

            {allTasks.length > 0 && allTasks.map((task) => (
              <Marker key={`${task.taskId}task`} position={task.routeWaypoints[task.routeWaypoints.length - 1]} icon={taskIcon}>
                <Popup>
                  Vaš zadatak:
                  <br />
                  Trebate postaviti&nbsp;
                  {task.taskToDo === "tracker" ? "uređaj za praćenje":"kameru"}
                  <SeeMore searcher={searcher} task={task} onSubmit={fetchData}/>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>;
        </MapContainer> 
        )}
        {checkActionFlag === false && <div>NE PRIPADATE NITI JEDNOJ AKCIJI</div>}
        <React.Fragment>
          {allTasks.length === 0 && checkActionFlag !== false && (
            <React.Fragment>
              <h3 style={{ color: '#e8e8ec' }}>Nemate više zadataka, možete se maknuti s akcije</h3>
              <Button variant="outlined" onClick={handleDone}
                      sx={{ borderColor:'#bfbfbc' ,
                      color: '#e8e8ec'}}>
                Done
              </Button>
            </React.Fragment>
          )}
        </React.Fragment>
      </div>
    </div>
  );
};

export default Action;

