import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { LayersControl } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import ApiService from "../../services/ApiService";
import "./Actions.css";

const PastRoutesMap = ({ cardData, filterCriteria }) => {
  PastRoutesMap.propTypes = {
    cardData: PropTypes.object.isRequired,
    filterCriteria: PropTypes.object,
  };

  const [currentData, setCurrentData] = useState([]);

  const fetchData = async () => {
    try {
      const responsePastRoutes = await ApiService.get(
        `wildTrack/researcher/getPastAllSearchersRoutes/${cardData.actionId}`
      );
      handleData(responsePastRoutes.data);
      console.log(responsePastRoutes.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const handleData = (data) => {
    const points = [];
    if (filterCriteria !== undefined) {
      data = data.map((route) => {
        const routeValue =
          route[
            filterCriteria.subject === "individual"
              ? "searcherId"
              : filterCriteria.subject
          ];
        return filterCriteria.checkedItems.includes(routeValue);
      });
    }
    data.map((pastRoute) => {
      if (mapToQualification(pastRoute.qualification) !== false) {
        var myRoute = L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1",
          profile: mapToQualification("FOOT"),
        });
        myRoute.route(
          pastRoute.routeWaypoints.map((coordinate) =>
            L.Routing.waypoint(L.latLng(coordinate[0], coordinate[1]))
          ),
          function (err, routes) {
            if (err === null) {
              routes[0].coordinates.map((coordinate) => {
                points.push([coordinate.lat, coordinate.lng, 0.1]);
              });
            }
          }
        );
      } else {
        pastRoute.routeWaypoints.map((coordinate) => {
          points.push([coordinate[0], coordinate[1], 0.2]);
        });
      }
    });
    setCurrentData(points);
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

  useEffect(() => {
    fetchData();
  }, []);

  const heatmapOptions = {
    radius: 20,
    blur: 20,
    maxZoom: 18,
    minOpacity: 0.5,
    maxOpacity: 1,
  };

  return (
    <LayersControl.Overlay name="Tragači - povijesne pozicije">
      <HeatmapLayer
        points={currentData}
        longitudeExtractor={(point) => point[1]}
        latitudeExtractor={(point) => point[0]}
        key={Math.random() + Math.random()}
        intensityExtractor={(point) => parseFloat(point[2])}
        {...heatmapOptions}
        max={1}
      />
    </LayersControl.Overlay>
  );
};

export default PastRoutesMap;
