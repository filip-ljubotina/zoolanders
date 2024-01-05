import {useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import PropTypes from 'prop-types';
import './Actions.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import ApiService from '../../services/ApiService';
import AddTask from './AddTask'
import ChooseSubjectView from './ChooseSubjectView'
import home_icon_png from '../Assets/home.png'
import searcher_icon_png from '../Assets/searcher.png'
import pawprint_icon from '../Assets/pawprint.png'

const ActionDetails = ({ onLogout }) => {
  ActionDetails.propTypes = {
    onLogout: PropTypes.func.isRequired,
  };
  const location = useLocation();
  const { cardData } = location.state || {};
  const centerCoordinates = [44.972571, 16.21582];
  const [stationCoordinates, setStationCoordinates] = useState([]);
  const [searchers, setSearchers] = useState([]);
  const [allAnimals, setAllAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [filterCriteria, setfilterCriteria] = useState([]);


  const fetchData = async () => {
    try {
      const response = await ApiService.get(`/wildTrack/researcher/getAllSearchersOnAction/${cardData.actionId}`);
      const responseJson = await ApiService.get(`/wildTrack/researcher/getStationCoordinatesJson/${cardData.locationName}`);
      const responseAnimals = await ApiService.get(`wildTrack/animal/findAllAnimalsByStation/${cardData.locationName}`);
      setSearchers(response.data);
      setStationCoordinates(responseJson.data.center);
      setAllAnimals(responseAnimals.data);
      refreshSubjectMapView()
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const refreshSubjectMapView = async () => {
    try {
      const responseCriteria = await ApiService.get(`wildTrack/researcher/getMapViewCriteria/${cardData.actionId}`);
      setfilterCriteria(responseCriteria.data)
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  useEffect(() => {
    setFilteredAnimals(allAnimals.filter(animal => {
      const animalValue = animal[filterCriteria.subject === "individual" ? "animalId" : filterCriteria.subject];
      return filterCriteria.checkedItems.includes(animalValue);
    }));
  }, [filterCriteria]);


  const handleSubjectMapView = () => {
    refreshSubjectMapView()
  };

  const homeIcon = new L.Icon({
    iconUrl: home_icon_png,
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32], 
  });

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
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="users">
      <Sidebar />
      <div className="usersContainer">
        <Topbar title={cardData.actionName} onLogout={onLogout} />
        <MapContainer center={centerCoordinates} zoom={7} style={{ height: '80%', width: '80%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
            <MarkerClusterGroup>
            {stationCoordinates.length > 0  && (<Marker key="station-location" position={stationCoordinates} icon={homeIcon}>
            </Marker>)}

            {searchers.map((searcher) => (
              <Marker key={searcher.searcherId} position={searcher.currentPosition} icon={searcherIcon}>
                <Popup>
                  {`Name: ${searcher.firstName} Surname: ${searcher.lastName}`}
                  <br />
                  {`Qualification: ${searcher.qualification}`}
                  <AddTask searcher={searcher} cardData={cardData}/>
                </Popup>
              </Marker>
            ))}

            {filteredAnimals.map((animal) => (
              <Marker key={animal.animalId} position={animal.currentPosition} icon={animalIcon}>
                <Popup>
                  {`Name: ${animal.animalName} Breed: ${animal.breed}`}
                  <br />
                  {`Description: ${animal.description}`}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>;
        </MapContainer>
        <ChooseSubjectView cardData={cardData} onSubmit={handleSubjectMapView}/>
      </div>
    </div>
  );
};

export default ActionDetails;

