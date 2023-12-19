import * as React from 'react';
import Sidebar from './Sidebar'
import './AddSearchers.css'
import ApiService from '../../services/ApiService';
import Topbar from './Topbar';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import ChooseSearcher from './ChooseSearcher';


const Requests = ({onLogout}) => {
  Requests.propTypes = {
    onLogout: PropTypes.object.isRequired
  };
  const [cards, setCards] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await ApiService.get('/wildTrack/manager/getActionsRequestingNewSearches');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      fetchData();
    } catch (error) {
      console.error('Error approving row:', error);
    }
  };

  return (
    <div className='users'>
        <Sidebar />
        <div className='usersContainer'>
          <Topbar title="Zahtjevi za tragače postaje" onLogout={onLogout} />
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
                  <ChooseSearcher card={card} onSave={handleSave}></ChooseSearcher>
                </CardActions>
              </Card>
            ))}    
          </div>
      </div>
    </div>
  )
}

export default Requests
