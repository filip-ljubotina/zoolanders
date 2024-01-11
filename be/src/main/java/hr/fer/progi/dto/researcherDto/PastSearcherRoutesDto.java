package hr.fer.progi.dto.researcherDto;

import hr.fer.progi.jsonentities.RouteWaypoints;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PastSearcherRoutesDto {
    private Long pastRoutesId;
    private List<List<Double>> routeWaypoints;

    public PastSearcherRoutesDto() {
    }

    public PastSearcherRoutesDto(Long pastRoutesId, Object routeWaypointsObject) {
        this.pastRoutesId = pastRoutesId;
        RouteWaypoints routeWaypoints = (RouteWaypoints) routeWaypointsObject;
        this.routeWaypoints = routeWaypoints.getRouteWaypoints();
    }
}
