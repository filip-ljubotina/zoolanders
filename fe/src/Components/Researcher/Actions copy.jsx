import * as React from 'react';
import Sidebar from './Sidebar'
import AddAction from './AddAction'
import SearcherRequest from './SearcherRequest'
import './Actions.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import ApiService from '../../services/ApiService';
import Topbar from './Topbar';
import PropTypes from "prop-types";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const Actions = ({onLogout}) => {
  Actions.propTypes = {
    onLogout: PropTypes.func
  }
  const [cards, setCards] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await ApiService.get('/wildTrack/researcher/getAllActions');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  const handleAddCard = () => {
    fetchData();
  };


  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='users'>
        <Sidebar />
        <div className='usersContainer'>
            <Topbar title="Pregled korisnika" onLogout={onLogout} />
            <AddAction onAddCard={handleAddCard}></AddAction>
        <div className='cardsGrid'>
          {cards.map((card) => (
            <Card key={card.id} sx={{ minWidth: 275, margin: 2 }}>
              <CardContent>
              <Typography variant="h5" component="div">
                {card.actionName}
              </Typography>
              <Typography sx={{mb: 1}} color="text.secondary">
                {card.locationName.replace(/_/g, ' ')}
              </Typography>
              <Typography variant="body2">
                {card.actionType}
              </Typography>
              </CardContent>
              <CardActions>
                <SearcherRequest card={card}></SearcherRequest>
                <Link to={`/dashboard/researcher/action-details/${card.actionId}`} state={{ cardData: card }} style={{ textDecoration: 'none' }}>
                  <Button variant="outlined"
                    sx={{
                      borderColor: 'darkblue',
                      color: 'darkblue'
                    }}>
                    See More
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}    
        </div>
        
        </div>
    </div>
  )
}

const columns = [
  { field: "id", headerName: "ID" , width: 100},
  {
      field: "userName",
      headerName: "Korisničko ime",
      width: 150, 
      cellClassName: "username-column--cell",
  },
  {
      field: "firstName",
      headerName: "Ime",
      width: 150,
  },
  {
      field: "lastName",
      headerName: "Prezime",
      width: 150,
  },
  {
      field: "email",
      headerName: "Email",
      width: 250,
  },
  {
      field: "role",
      headerName: "Uloga",
      width: 150,
      renderCell: ({ row: { role } }) => {
          return ( 
          <Box m="0 auto" p="5px"
              display="flex" justifyContent="center" 
              borderRadius="4px">
              {role === "ADMIN" && <AdminPanelSettingsOutlinedIcon />}
              {role === "ADMIN" && <a>Admin</a>}
              {role === "SEARCHER_IN_THE_FIELD" && <a>Tragač</a>}
              {role === "STATION_MANAGER" && <a>Voditelj postaje</a>}
              {role === "RESEARCHER" && <a>Istraživač</a>}
          </Box>
      );
    },
  },
];

export default Actions;