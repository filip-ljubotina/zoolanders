import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from "prop-types"
import ApiService from '../../services/ApiService';
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import './Actions.css';



function ViewAnimalComments({cardData, animal}) {
    ViewAnimalComments.propTypes = {
        cardData: PropTypes.object.isRequired,
        animal: PropTypes.object,
    };
    const [data, setData] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const fetchData = async () => {
        try {
            const responseData = await ApiService.get(`/wildTrack/animal/getAllAnimalComments/${cardData.actionId}/${animal.animalId}`);
            setData(responseData.data.map((row) => ({ ...row, id: row.animalCommentId })));
        } catch (error) {
            console.error('Error fetching table data:', error);
        }
      };

    const handleClickOpen = () => {
        fetchData();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        setOpen(false);
    }

    const columns = [
        { field: "id", headerName: "ID" , width: 100},
        {
            field: "userName",
            headerName: "UserName",
            width: 150,
        },
        {
            field: "comment",
            headerName: "Komentar",
            width: 150,
        }
    ];

    return (
        <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}
            sx={{ borderColor: 'darkblue',
            color: 'darkblue',
            fontSize: '12px', 
            padding: '8px 16px',}}>
            View Commments
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Svi komentari za životinju {animal.animalName}</DialogTitle>
            <DialogContent>
            <Box m="20px" >
                <Box m="40px 0 0 0" height="75vh" sx={{"& .MuiDataGrid-root": { border: "none", },
                                                    "& .MuiDataGrid-cell": { borderBottom: "none", },}} >
                    <DataGrid rows={data} columns={columns} />
                </Box>
            </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Odbaci</Button>
                <Button onClick={handleSubmit}>Spremi</Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
    }


    
export default ViewAnimalComments;