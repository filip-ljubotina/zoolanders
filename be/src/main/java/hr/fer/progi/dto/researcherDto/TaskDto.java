package hr.fer.progi.dto.researcherDto;

import hr.fer.progi.jsonentities.RouteWaypoints;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class TaskDto {
    private Long taskId;
    private Long searcherId;
    private List<List<Double>> routeWaypoints;
    private String taskComment;
    private String taskToDo;

    public TaskDto(Long taskId, Long searcherId, Object routeWaypointsObject, String taskComment, String taskToDo) {
        this.taskId = taskId;
        this.searcherId = searcherId;
        RouteWaypoints routeWaypointsClass = (RouteWaypoints) routeWaypointsObject;
        this.routeWaypoints = routeWaypointsClass.getRouteWaypoints();
        this.taskComment = taskComment;
        this.taskToDo = taskToDo;
    }
}
