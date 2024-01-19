import Button from "@mui/material/Button";
import L from "leaflet";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import ApiService from "../../services/ApiService";
import clipboard_icon from "../Assets/clipboard.png";
import compass_icon from "../Assets/compass.png";
import pawprint_icon from "../Assets/pawprint.png";
import searcher_icon_png from "../Assets/searcher.png";
import comment_icon_png from "../Assets/comment.png";
import Sidebar from "../General/Sidebar";
import Topbar from "../General/Topbar";
import "./Actions.css";
import AddAnimalComment from "./AddAnimalComment";
import SeeMore from "./SeeMore";
import ViewAnimalComments from "./ViewAnimalComments";
import AddMapComment from "../Searcher/AddMapComment";

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
  const [comments, setComments] = useState([]);

  const checkAction = async () => {
    try {
      const response = await ApiService.get(
        `/wildTrack/searcherInTheField/getCheckUserOnAction`
      );
      // setCheckActionFlag(response.data);
      if (response.data === true) {
        await fetchData();
      }
      setCheckActionFlag(response.data);
    } catch (error) {
      console.error("Error checking searcher action:", error);
    }
  };

  const removeFromAction = async () => {
    try {
      await ApiService.put(`/wildTrack/searcherInTheField/putRemoveFromAction`);
    } catch (error) {
      console.error("Error saving action completion:", error);
    }
  };

  const fetchData = async () => {
    try {
      const actionResponse = await ApiService.get(
        `/wildTrack/searcherInTheField/getActionInfo`
      );
      const searcherResponse = await ApiService.get(
        `/wildTrack/searcherInTheField/getSearcherInfo`
      );
      const allSearchersResponse = await ApiService.get(
        `/wildTrack/searcherInTheField/getAllSearchersOnAction`
      );
      const allAnimalsResponse = await ApiService.get(
        `wildTrack/searcherInTheField/getAllAnimalsOnAction`
      );
      const allTasksResponse = await ApiService.get(
        `wildTrack/searcherInTheField/getAllActiveTasks`
      );
      const commentsResponse = await ApiService.get(
        `/wildTrack/action/getAllMapComments/${actionResponse.data.actionId}`
      );
      setActionInfo(actionResponse.data);
      setSearcher(searcherResponse.data);
      setAllSearchers(allSearchersResponse.data);
      setAllAnimals(allAnimalsResponse.data);
      setAllTasks(allTasksResponse.data);
      setComments(commentsResponse.data);
    } catch (error) {
      console.error("Error loading action:", error);
    }
  };

  useEffect(() => {
    checkAction();
  }, []);

  // useEffect(() => {
  //   if (checkActionFlag === true) {
  //     fetchData();
  //   }
  // }, [checkActionFlag]);

  const handleAddMapComment = () => {
    fetchData();
  };

  const handleDone = () => {
    removeFromAction();
    checkAction();
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

  const commentIcon = new L.Icon({
    iconUrl: comment_icon_png,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    console.log("actionInfo changed:", actionInfo);
    console.log("searcher changed:", searcher);
    console.log("allSearchers changed:", allSearchers);
    console.log("allAnimals changed:", allAnimals);
    console.log("allTasks changed:", allTasks);
  }, [actionInfo, searcher, allSearchers, allAnimals, allTasks]);

  return (
    <div className="users">
      <Sidebar
        categories={[
          { title: "Akcija", link: "/action" },
          { title: "Moji podaci", link: "/userInfo" },
        ]}
        user="searcher"
      />
      <div className="usersContainer">
        <Topbar title={actionInfo.actionName} onLogout={onLogout} />
        {checkActionFlag === true && (
          <MapContainer
            center={centerCoordinates}
            zoom={7}
            style={{ height: "80%", width: "80%", alignSelf: "center" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerClusterGroup>
              {Object.keys(searcher).length !== 0 && (
                <Marker
                  key={`${searcher.currentPosition}`}
                  position={searcher.currentPosition}
                  icon={compassIcon}
                >
                  <Popup>Vaša trenutna lokacija</Popup>
                </Marker>
              )}

              {allSearchers.length > 0 &&
                allSearchers.map((searcher) => (
                  <Marker
                    key={searcher.searcherId}
                    position={searcher.currentPosition}
                    icon={searcherIcon}
                  >
                    <Popup>
                      {`Name: ${searcher.firstName} Surname: ${searcher.lastName}`}
                      <br />
                      {`Qualification: ${searcher.qualification}`}
                    </Popup>
                  </Marker>
                ))}

              {allAnimals.length > 0 &&
                allAnimals.map((animal) => (
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
                          cardData={actionInfo}
                          animal={animal}
                        />
                        <ViewAnimalComments
                          cardData={actionInfo}
                          animal={animal}
                        />
                      </div>
                    </Popup>
                  </Marker>
                ))}

              {allTasks.length > 0 &&
                allTasks.map((task) => (
                  <Marker
                    key={`${task.taskId}task`}
                    position={
                      task.routeWaypoints[task.routeWaypoints.length - 1]
                    }
                    icon={taskIcon}
                  >
                    <Popup>
                      Vaš zadatak: Trebate postaviti&nbsp;
                      {task.taskToDo === "tracker"
                        ? "uređaj za praćenje"
                        : "kameru"}
                      <br />
                      Komentar uz zadatak:&nbsp;
                      {task.taskComment}
                      <br />
                      <SeeMore
                        searcher={searcher}
                        task={task}
                        onSubmit={fetchData}
                      />
                    </Popup>
                  </Marker>
                ))}

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

              <AddMapComment
                cardData={actionInfo}
                onAddComment={handleAddMapComment}
              />
            </MarkerClusterGroup>
            ;
          </MapContainer>
        )}
        {checkActionFlag === false && (
          <span style={{ alignSelf: "center", margin: "5px" }}>
            NE PRIPADATE NITI JEDNOJ AKCIJI
          </span>
        )}
        <React.Fragment>
          {allTasks.length === 0 && checkActionFlag === true && (
            <React.Fragment>
              <span style={{ alignSelf: "center", margin: "5px" }}>
                Nemate više zadataka, možete se maknuti s akcije
              </span>
              <Button
                variant="outlined"
                onClick={handleDone}
                sx={{
                  borderColor: "darkblue",
                  color: "darkblue",
                  width: "fit-content",
                  alignSelf: "center",
                  margin: "5px",
                }}
              >
                ZAVRŠI
              </Button>
            </React.Fragment>
          )}
        </React.Fragment>
      </div>
    </div>
  );
};

export default Action;
