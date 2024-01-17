package hr.fer.progi.dto.researcherDto;

import hr.fer.progi.entity.enums.Qualification;
import hr.fer.progi.jsonentities.RouteWaypoints;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PastSearcherRoutesDto {
    private Long pastRoutesId;
    private Long searcherId;
    private String qualification;
    private List<List<Double>> routeWaypoints;

    public PastSearcherRoutesDto() {
    }

    public PastSearcherRoutesDto(Long pastRoutesId, Long searcherId, Object routeWaypointsObject, Qualification qualificationObject) {
        this.pastRoutesId = pastRoutesId;
        this.searcherId = searcherId;
        RouteWaypoints routeWaypoints = (RouteWaypoints) routeWaypointsObject;
        this.qualification = qualificationObject.toString();
        this.routeWaypoints = routeWaypoints.getRouteWaypoints();
    }
}
