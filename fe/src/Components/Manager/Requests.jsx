import * as React from "react";
import Sidebar from "./Sidebar";
import "./AddSearchers.css";
import ApiService from "../../services/ApiService";
import Topbar from "./Topbar";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import ChooseSearcher from "./ChooseSearcher";

const Requests = ({ onLogout }) => {
  Requests.propTypes = {
    onLogout: PropTypes.object.isRequired,
  };
  const [cards, setCards] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await ApiService.get(
        "/wildTrack/manager/getActionsRequestingNewSearches"
      );
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      fetchData();
    } catch (error) {
      console.error("Error approving row:", error);
    }
  };

  return (
    <div className="users">
      <Sidebar
        categories={[
          { title: "Dodavanje tragača", link: "/addUsers" },
          { title: "Zahtjevi istraživača", link: "/requests" },
        ]}
        user="manager"
      />
      <div className="usersContainer">
        <Topbar title="Zahtjevi za tragače postaje" onLogout={onLogout} />
        <div className="researcher-cardsGrid">
          {cards.map((card) => (
            <Card
              key={card.actionId}
              sx={{ minWidth: 275, margin: 2, height: "fit-content" }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {card.actionName}
                </Typography>
                <Typography sx={{ mb: 1 }} color="text.secondary">
                  {card.locationName
                    .replace(/_/g, " ")
                    .replace(/./, (c) => c.toUpperCase())}{" "}
                </Typography>
                <Typography variant="body2">
                  {" "}
                  {card.actionType.replace(/./, (c) => c.toUpperCase())}{" "}
                </Typography>
              </CardContent>
              <CardActions>
                <ChooseSearcher
                  card={card}
                  onSave={handleSave}
                ></ChooseSearcher>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Requests;
