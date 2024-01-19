import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { Link } from "react-router-dom";
import ApiService from "../../services/ApiService";
import Sidebar from "../General/Sidebar";
import Topbar from "../General/Topbar";
import "./Actions.css";
import AddAction from "./AddAction";
import SearcherRequest from "./SearcherRequest";

const Actions = ({ onLogout }) => {
  Actions.propTypes = {
    onLogout: PropTypes.func,
  };
  const [cards, setCards] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await ApiService.get(
        "/wildTrack/researcher/getAllActions"
      );
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching actions:", error);
    }
  };

  const handleAddCard = () => {
    fetchData();
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="users">
      <Sidebar
        categories={[
          { title: "Akcije", link: "/actions" },
          { title: "Moji podaci", link: "/userInfo" },
        ]}
        user="researcher"
      />
      <div className="usersContainer">
        <Topbar title="Pregled aktivnih akcija" onLogout={onLogout} />
        <AddAction onAddCard={handleAddCard} />
        <div className="researcher-cardsGrid">
          {cards.map((card) => (
            <Card key={card.actionId} sx={{ height: "fit-content" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {" "}
                  {card.actionName}{" "}
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
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <SearcherRequest card={card}></SearcherRequest>
                <Link
                  to={`/dashboard/researcher/action-details/${card.actionId}`}
                  state={{ cardData: card }}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="outlined"
                    sx={{ borderColor: "darkblue", color: "darkblue" }}
                  >
                    Više detalja
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Actions;
