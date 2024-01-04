package hr.fer.progi.repository;

import hr.fer.progi.dto.researcherDto.TaskDto;
import hr.fer.progi.entity.SearcherInTheField;
import hr.fer.progi.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT new hr.fer.progi.dto.researcherDto.TaskDto(t.taskId, t.searcherInTheField.searcherInTheFieldId, t.routeWaypoints, t.taskComment, t.taskToDo)" +
            " FROM Task t WHERE t.completed IS FALSE AND t.searcherInTheField = :searcherInTheField")
    List<TaskDto> findAllActiveTasksBySearcherInTheField(@Param("searcherInTheField")SearcherInTheField searcherInTheField);
}
