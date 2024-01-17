package hr.fer.progi.service.impl;

import hr.fer.progi.dto.researcherDto.TaskDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.SearcherInTheField;
import hr.fer.progi.entity.Task;
import hr.fer.progi.jsonentities.PositionCoordinates;
import hr.fer.progi.jsonentities.RouteWaypoints;
import hr.fer.progi.mapper.TaskDtoMapper;
import hr.fer.progi.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class TaskServiceJpa {
    private final TaskRepository taskRepository;
    private final TaskDtoMapper taskDtoMapper;

    public Task findById(Long taskId){
        return taskRepository.findById(taskId).get();
    }

    public void postNewTask(TaskDto taskDto, Action action, SearcherInTheField searcherInTheField) {
        checkTaskDto(taskDto);
        try {
            Task newTask = taskDtoMapper.newTaskDtoAndActionMapper(taskDto, searcherInTheField, action);
            taskRepository.save(newTask);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void checkTaskDto(TaskDto taskDto){
        if (taskDto.getSearcherId() == null || taskDto.getRouteWaypoints() == null || taskDto.getTaskToDo() == null || taskDto.getTaskComment() == null) {
            throw new IllegalArgumentException("All attributes in TaskDto must not be null");
        }
        if (taskDto.getTaskToDo().trim().isEmpty()) {
            throw new IllegalArgumentException("TaskToDo in TaskDto must not be empty");
        }
    }

    public void putTaskCompleted(Long taskId){
        Task task = findById(taskId);
        task.setCompleted(true);
        taskRepository.save(task);
    }

    public PositionCoordinates findNewCurrentPosition(Long taskId){
        Task task = findById(taskId);
        return new PositionCoordinates(task.getRouteWaypoints().getRouteWaypoints().get(task.getRouteWaypoints().getRouteWaypoints().size() - 1));
    }

    public PositionCoordinates findPastCurrentPosition(Long taskId){
        Task task = findById(taskId);
        return new PositionCoordinates(task.getRouteWaypoints().getRouteWaypoints().get(0));
    }

    public RouteWaypoints getRouteWaypoints(Long taskId){
        Task task = findById(taskId);
        return task.getRouteWaypoints();
    }

    public List<TaskDto> getAllActiveTasksBySearcherInTheField(SearcherInTheField searcherInTheField){
        return taskRepository.findAllActiveTasksBySearcherInTheField(searcherInTheField);
    }
}
