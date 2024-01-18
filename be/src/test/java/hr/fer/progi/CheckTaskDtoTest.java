package hr.fer.progi;

import hr.fer.progi.dto.researcherDto.TaskDto;
import hr.fer.progi.jsonentities.RouteWaypoints;
import hr.fer.progi.service.impl.TaskServiceJpa;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class CheckTaskDtoTest {

    private final TaskServiceJpa taskServiceJpa = new TaskServiceJpa(null, null);

    @Test
    void testCheckTaskDtoValid() {
        TaskDto validTaskDto = new TaskDto(1L, 1L, new RouteWaypoints(), "TaskComment", "TaskToDo");
        assertDoesNotThrow(() -> taskServiceJpa.checkTaskDto(validTaskDto));
    }

    @Test
    void testCheckTaskDtoInvalidNull() {
        TaskDto invalidTaskDtoNull = new TaskDto(null, null, new RouteWaypoints(), "TaskComment", "TaskToDo");
        assertThrows(IllegalArgumentException.class, () -> taskServiceJpa.checkTaskDto(invalidTaskDtoNull));
    }

    @Test
    void testCheckTaskDtoInvalidEmpty() {
        TaskDto invalidTaskDtoEmpty = new TaskDto(null, 1L, new RouteWaypoints(), "TaskComment", "");
        assertThrows(IllegalArgumentException.class, () -> taskServiceJpa.checkTaskDto(invalidTaskDtoEmpty));
    }

    @Test
    void testCheckTaskDtoInvalidWhitespace() {
        TaskDto invalidTaskDtoWhitespace = new TaskDto(null, 1L, new RouteWaypoints(), "TaskComment", "  TaskToDo");
        assertThrows(IllegalArgumentException.class, () -> taskServiceJpa.checkTaskDto(invalidTaskDtoWhitespace));
    }
}
