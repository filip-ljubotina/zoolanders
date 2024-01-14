import { MapContainer, TileLayer, Marker, Popup, Polygon} from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';
import home_icon_png from '../Assets/home.png'

const SearchTypeMap = ({ coordinates, searchType }) => {
  const polygonOpacity = {
    FOOT: 0.8,     
    DRONE: 0.4,
    CAR: 0.5,
    CROSS_MOTOR: 0.5,
    BOAT: 0.5,
    HELICOPTER: 0.3,
  };

  const polygon = coordinates[searchType] || coordinates["FOOT"];
  const opacity = polygonOpacity[searchType] || polygonOpacity["FOOT"]
  
  return (
    <MapContainer center={coordinates["center"]} zoom={10} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates["center"]} icon={L.icon({
            iconUrl: home_icon_png,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })}>
        <Popup>Kordinate Postaje: {coordinates["center"][0]}, {coordinates["center"][1]}</Popup>
      </Marker>
      {searchType && <Polygon key={searchType} positions={polygon} fillOpacity={opacity} color="blue" />}
    </MapContainer>
  );
};

SearchTypeMap.propTypes = {
  coordinates: PropTypes.object.isRequired, 
  searchType: PropTypes.string.isRequired,
};

export default SearchTypeMap;
