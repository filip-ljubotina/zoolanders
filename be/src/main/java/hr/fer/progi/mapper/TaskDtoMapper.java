package hr.fer.progi.mapper;

import hr.fer.progi.dto.researcherDto.TaskDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.SearcherInTheField;
import hr.fer.progi.entity.Task;
import hr.fer.progi.jsonentities.RouteWaypoints;
import org.springframework.stereotype.Component;

@Component
public class TaskDtoMapper {
    public Task newTaskDtoAndActionMapper(TaskDto taskDto, SearcherInTheField searcherInTheField, Action action){
        RouteWaypoints routeWaypoints = new RouteWaypoints(taskDto.getRouteWaypoints());
        Task task = new Task();
        task.setTaskComment(taskDto.getTaskComment());
        task.setTaskToDo(taskDto.getTaskToDo());
        task.setRouteWaypoints(routeWaypoints);
        task.setAction(action);
        task.setSearcherInTheField(searcherInTheField);
        return task;
    }

    public TaskDto classTaskToDto(Task task){
        TaskDto taskDto = new TaskDto();
        taskDto.setSearcherId(taskDto.getSearcherId());
        taskDto.setRouteWaypoints(task.getRouteWaypoints().getRouteWaypoints());
        taskDto.setTaskComment(task.getTaskComment());
        taskDto.setTaskToDo(task.getTaskToDo());
        return taskDto;
    }
}
