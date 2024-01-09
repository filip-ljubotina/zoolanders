import * as React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from "prop-types"
import ApiService from '../../services/ApiService';
import Choose from './Choose'


function ChooseSearcher({card, onSave}) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);

    const fetchData = async () => {
        try {
            const responseData = await ApiService.get(`/wildTrack/manager/getAllAvailableSearchersForAction?actionId=${card.actionId}`);
            setData(responseData.data.map((row) => ({ ...row, id: row.searcherId })));
        } catch (error) {
            console.error('Error fetching table data:', error);
        }
      };
    
    const updateData = async () => {
        try {
            await ApiService.put(`/wildTrack/manager/putActionSearcherRequestToNull?actionId=${card.actionId}`, null);
            onSave();
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
        updateData();
        setOpen(false);
    };

    const handleChoose = async () => {
        try {
            fetchData();
        } catch (error) {
          console.error('Error approving row:', error);
        }
    };


    const columns = [
        { field: "id", headerName: "ID" , width: 100},
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
            field: "qualification",
            headerName: "Osposobljenje",
            width: 150,
            renderCell: ({ row: { qualification } }) => {
                return ( 
                <Box m="0 auto" p="5px"
                    display="flex" justifyContent="center" 
                    borderRadius="4px">
                    {qualification === "FOOT" && <a>Pješke</a>}
                    {qualification === "DRONE" && <a>Dron</a>}
                    {qualification === "CAR" && <a>Automobil</a>}
                    {qualification === "CROSS_MOTOR" && <a>Cross Motor</a>}
                    {qualification === "BOAT" && <a>Brod</a>}
                    {qualification === "HELICOPTER" && <a>Helikopter</a>}
                </Box>
            );
            },
        }
    ];

    const chooseColumn = [
    {
        field: "choose",
        headerName: "Dodavanje Akciji",
        width: 150,
        renderCell: (params) => {
        return (
            <div className="cellAction">
                <Choose cardInfo={card} data={params.row} onChoose={handleChoose}/>
            </div>
        );
        },
    },
    ]; 

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Odabir Tragača 
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>Odaberite Tragače Za Akciju: {card.actionName}</DialogTitle>
                <DialogContent>
                <Box m="20px" >
                    <Box m="40px 0 0 0" height="75vh" sx={{"& .MuiDataGrid-root": { border: "none", },
                                                        "& .MuiDataGrid-cell": { borderBottom: "none", },}} >
                        <DataGrid rows={data} columns={columns.concat(chooseColumn)} />
                    </Box>
                </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Spremi</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

ChooseSearcher.propTypes = {
    card: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired
};

export default ChooseSearcher;
