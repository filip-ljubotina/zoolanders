//import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar'
import Topbar from './Topbar';
import PropTypes from "prop-types";
import './Actions.css'

const ActionDetails = ({onLogout}) => {
    ActionDetails.propTypes = {
        onLogout: PropTypes.func
    }
    const location = useLocation();
    const { cardData } = location.state || {};

  return (
    <div className='users'>
        <Sidebar />
        <div className='usersContainer'>
            <Topbar title={cardData.actionName} onLogout={onLogout} />
        <div className='cardsGrid'>
          
        </div>

        </div>
    </div>
  );
};

export default ActionDetails;
