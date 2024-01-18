import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import { useLocation } from "react-router-dom";
import ApiService from "../../services/ApiService";
import comment_icon_png from "../Assets/comment.png";
import home_icon_png from "../Assets/home.png";
import pawprint_icon from "../Assets/pawprint.png";
import searcher_icon_png from "../Assets/searcher.png";
import Sidebar from "../General/Sidebar";
import Topbar from "../General/Topbar";
import "./Actions.css";
import AddAnimalComment from "./AddAnimalComment";
import AddMapComment from "./AddMapComment";
import AddTask from "./AddTask";
import ChooseSubjectView from "./ChooseSubjectView";
import PastRoutesMap from "./PastRoutesMap";
import ViewAnimalComments from "./ViewAnimalComments";
import ChooseSearcherView from "./ChooseSearcherView";
import ViewTaskComments from "./ViewTaskComments";

const ActionDetails = ({ onLogout }) => {
  ActionDetails.propTypes = {
    onLogout: PropTypes.func.isRequired,
  };
  const location = useLocation();
  const { cardData } = location.state || {};
  const centerCoordinates = [44.972571, 16.21582];
  const [stationCoordinates, setStationCoordinates] = useState([]);
  const [searchers, setSearchers] = useState([]);
  const [comments, setComments] = useState([]);
  const [allAnimals, setAllAnimals] = useState([]);
  const [pastAnimals, setPastAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState([]);
  const [searcherCriteria, setSearcherCriteria] = useState(undefined);

  const fetchData = async () => {
    try {
      const response = await ApiService.get(
        `/wildTrack/researcher/getAllSearchersOnAction/${cardData.actionId}`
      );
      const responseJson = await ApiService.get(
        `/wildTrack/researcher/getStationCoordinatesJson/${cardData.locationName}`
      );
      const responseAnimals = await ApiService.get(
        `wildTrack/animal/findAllAnimalsByStation/${cardData.locationName}`
      );
      const responsePastAnimals = await ApiService.get(
        `wildTrack/researcher/getPastAnimalsLocations/${cardData.actionId}`
      );
      const responseComments = await ApiService.get(
        `/wildTrack/action/getAllMapComments/${cardData.actionId}`
      );
      setSearchers(response.data);
      setStationCoordinates(responseJson.data.center);
      setAllAnimals(responseAnimals.data);
      setPastAnimals(responsePastAnimals.data);
      setComments(responseComments.data);
      refreshSubjectMapView();
    } catch (error) {
      console.error("Error fetching action details:", error);
    }
  };

  const refreshSubjectMapView = async () => {
    try {
      const responseCriteria = await ApiService.get(
        `wildTrack/researcher/getMapViewCriteria/${cardData.actionId}`
      );
      const responsePastAnimals = await ApiService.get(
        `wildTrack/researcher/getPastAnimalsLocations/${cardData.actionId}`
      );
      setFilterCriteria(responseCriteria.data);
      setPastAnimals(responsePastAnimals.data);
    } catch (error) {
      console.error("Error getting filter criteria:", error);
    }
  };

  useEffect(() => {
    setFilteredAnimals(
      allAnimals.filter((animal) => {
        const animalValue =
          animal[
            filterCriteria.subject === "individual"
              ? "animalId"
              : filterCriteria.subject
          ];
        return filterCriteria.checkedItems.includes(animalValue);
      })
    );
  }, [filterCriteria]);

  const handleSearcherMapView = (mapView) => {
    setSearcherCriteria(mapView);
  };

  const handleSubjectMapView = () => {
    refreshSubjectMapView();
  };

  const handleAddMapComment = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const mapToQualification = (label) => {
    switch (label) {
      case "FOOT":
        return "Pješice";
      case "DRONE":
        return "Dron";
      case "CAR":
        return "Automobil";
      case "CROSS_MOTOR":
        return "Cross Motor";
      case "BOAT":
        return "Brod";
      case "HELICOPTER":
        return "Helikopter";
      default:
        return label;
    }
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

  const commentIcon = new L.Icon({
    iconUrl: comment_icon_png,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const heatmapOptions = {
    radius: 20,
    blur: 20,
    maxZoom: 18,
    minOpacity: 0.5,
    maxOpacity: 1,
  };

  return (
    <div className="users">
      <Sidebar
        categories={[{ title: "Akcije", link: "/actions" }]}
        user="researcher"
      />
      <div className="usersContainer">
        <Topbar title={cardData.actionName} onLogout={onLogout} />
        <MapContainer
          center={centerCoordinates}
          zoom={7}
          style={{ height: "80%", width: "80%", alignSelf: "center" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <AddMapComment
            cardData={cardData}
            onAddComment={handleAddMapComment}
          />

          <LayersControl position="topright">
            <LayersControl.Overlay name="Tragači" checked>
              <LayerGroup>
                <MarkerClusterGroup>
                  {stationCoordinates.length > 0 && (
                    <Marker
                      key="station-location"
                      position={stationCoordinates}
                      icon={homeIcon}
                    >
                      {" "}
                    </Marker>
                  )}
                  {searchers.map((searcher) => (
                    <Marker
                      key={searcher.searcherId}
                      position={searcher.currentPosition}
                      icon={searcherIcon}
                      fi
                    >
                      <Popup>
                        {`Ime: ${searcher.firstName} Prezime: ${searcher.lastName}`}
                        <br />
                        {`Osposobljenost: ${mapToQualification(
                          searcher.qualification
                        )}`}
                        <AddTask searcher={searcher} cardData={cardData} />
                        <ViewTaskComments searcher={searcher} />
                      </Popup>
                    </Marker>
                  ))}
                </MarkerClusterGroup>
              </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay name="Životinje" checked>
              <LayerGroup>
                <MarkerClusterGroup>
                  {filteredAnimals.map((animal) => (
                    <Marker
                      key={animal.animalId}
                      position={animal.currentPosition}
                      icon={animalIcon}
                    >
                      <Popup>
                        {`Ime: ${animal.animalName} Vrsta: ${animal.breed}`}
                        <br />
                        {`Opis: ${animal.description}`}
                        <br />
                        <div
                          className="animal-buttons"
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <AddAnimalComment
                            cardData={cardData}
                            animal={animal}
                          />
                          <ViewAnimalComments
                            cardData={cardData}
                            animal={animal}
                          />
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MarkerClusterGroup>
              </LayerGroup>
            </LayersControl.Overlay>

            <PastRoutesMap
              cardData={cardData}
              filterCriteria={searcherCriteria}
            />

            <LayersControl.Overlay name="Životinje - povijesne pozicije">
              <HeatmapLayer
                points={pastAnimals.map((animal) => {
                  return [
                    animal.pastLocation[0],
                    animal.pastLocation[1],
                    animal.intensity,
                  ];
                })}
                longitudeExtractor={(point) => point[1]}
                latitudeExtractor={(point) => point[0]}
                key={Math.random() + Math.random()}
                intensityExtractor={(point) => parseFloat(point[2])}
                {...heatmapOptions}
                max={1}
              />
            </LayersControl.Overlay>

            <LayersControl.Overlay name="Komentari">
              <LayerGroup>
                <MarkerClusterGroup>
                  {comments.map((comment) => (
                    <Marker
                      key={comment.mapCommentId}
                      position={comment.coordinates}
                      icon={commentIcon}
                    >
                      <Popup>
                        <textarea defaultValue={comment.comment} readOnly />
                        <br />
                        {`Kreirao korisnik: ${comment.userName}`}
                      </Popup>
                    </Marker>
                  ))}
                </MarkerClusterGroup>
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "5px",
            gap: "5px",
            flexWrap: "wrap",
          }}
        >
          <ChooseSubjectView
            cardData={cardData}
            onSubmit={handleSubjectMapView}
            currentCriteria={filterCriteria}
          />
          <ChooseSearcherView
            cardData={cardData}
            onSubmit={handleSearcherMapView}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionDetails;
