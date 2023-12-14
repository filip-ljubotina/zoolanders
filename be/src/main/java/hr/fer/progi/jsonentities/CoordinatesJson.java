package hr.fer.progi.jsonentities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class CoordinatesJson {
    private List<Double> center;
    private List<List<Double>> FOOT;
    private List<List<Double>> DRONE;
    private List<List<Double>> CAR;
    private List<List<Double>> CROSS_MOTOR;
    private List<List<Double>> BOAT;
    private List<List<Double>> HELICOPTER;

    public CoordinatesJson() {
    }

    public CoordinatesJson(List<Double> center,
                           List<List<Double>> FOOT,
                           List<List<Double>> DRONE,
                           List<List<Double>> CAR,
                           List<List<Double>> CROSS_MOTOR,
                           List<List<Double>> BOAT,
                           List<List<Double>> HELICOPTER) {
        this.center = center;
        this.FOOT = FOOT;
        this.DRONE = DRONE;
        this.CAR = CAR;
        this.CROSS_MOTOR = CROSS_MOTOR;
        this.BOAT = BOAT;
        this.HELICOPTER = HELICOPTER;
    }

    @JsonProperty("center")
    public List<Double> getCenter() {
        return center;
    }

    public void setCenter(List<Double> center) {
        this.center = center;
    }

    @JsonProperty("FOOT")
    public List<List<Double>> getFOOT() {
        return FOOT;
    }

    public void setFOOT(List<List<Double>> FOOT) {
        this.FOOT = FOOT;
    }

    @JsonProperty("DRONE")
    public List<List<Double>> getDRONE() {
        return DRONE;
    }

    public void setDRONE(List<List<Double>> DRONE) {
        this.DRONE = DRONE;
    }

    @JsonProperty("CAR")
    public List<List<Double>> getCAR() {
        return CAR;
    }

    public void setCAR(List<List<Double>> CAR) {
        this.CAR = CAR;
    }

    @JsonProperty("CROSS_MOTOR")
    public List<List<Double>> getCROSS_MOTOR() {
        return CROSS_MOTOR;
    }

    public void setCROSS_MOTOR(List<List<Double>> CROSS_MOTOR) {
        this.CROSS_MOTOR = CROSS_MOTOR;
    }

    @JsonProperty("BOAT")
    public List<List<Double>> getBOAT() {
        return BOAT;
    }

    public void setBOAT(List<List<Double>> BOAT) {
        this.BOAT = BOAT;
    }

    @JsonProperty("HELICOPTER")
    public List<List<Double>> getHELICOPTER() {
        return HELICOPTER;
    }

    public void setHELICOPTER(List<List<Double>> HELICOPTER) {
        this.HELICOPTER = HELICOPTER;
    }
}
