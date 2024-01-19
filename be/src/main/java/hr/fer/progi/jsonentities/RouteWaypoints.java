package hr.fer.progi.jsonentities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.List;

public class RouteWaypoints {
    private List<List<Double>> routeWaypoints;

    public RouteWaypoints() {
    }

    public RouteWaypoints(List<List<Double>> routeWaypoints) {
        this.routeWaypoints = routeWaypoints;
    }

    @JsonProperty("routeWaypoints")
    public List<List<Double>> getRouteWaypoints() {
        return routeWaypoints;
    }

    public void setRouteWaypoints(List<List<Double>> routeWaypoints) {
        this.routeWaypoints = routeWaypoints;
    }
}
