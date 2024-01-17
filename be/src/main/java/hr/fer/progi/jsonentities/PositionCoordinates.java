package hr.fer.progi.jsonentities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class PositionCoordinates {
    private List<Double> currentPosition;

    public PositionCoordinates() {
    }

    public PositionCoordinates(List<Double> currentPosition) {
        this.currentPosition = currentPosition;
    }

    @JsonProperty("currentPosition")
    public List<Double> getCoordinates() {
        return currentPosition;
    }

    public void setCoordinates(List<Double> coordinates) {
        this.currentPosition = coordinates;
    }
}
