import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import * as React from "react";
import ApiService from "../../services/ApiService";

export default function Choose({ cardInfo, data, onChoose }) {
  Choose.propTypes = {
    data: PropTypes.object.isRequired,
    cardInfo: PropTypes.object.isRequired,
    onChoose: PropTypes.func.isRequired,
  };

  const updateData = async () => {
    try {
      await ApiService.put(
        `/wildTrack/manager/putChosenSearcherForAction?actionId=${cardInfo.actionId}`,
        data
      );
      onChoose();
    } catch (error) {
      console.error("Error adding chosen searcher to action:", error);
    }
  };

  const handleClick = () => {
    updateData();
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{ borderColor: "darkblue", color: "darkblue" }}
      >
        Dodaj
      </Button>
    </React.Fragment>
  );
}
