package hr.fer.progi;

import hr.fer.progi.dto.researcherDto.ActionDto;
import hr.fer.progi.service.impl.ResearcherServiceJpa;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class CheckActionDtoTest {

    private final ResearcherServiceJpa researcherServiceJpa =
            new ResearcherServiceJpa(null, null,
            null, null, null,
            null, null,
            null, null);

    @Test
    public void testCheckActionDtoValid() {
        ActionDto validActionDto = new ActionDto(1L, "ActionName", "ActionType", "LocationName");
        assertDoesNotThrow(() -> researcherServiceJpa.checkActionDto(validActionDto));
    }

    @Test
    public void testCheckActionDtoInvalidNull() {
        ActionDto invalidActionDto = new ActionDto(null, null, "ActionType", "LocationName");
        assertThrows(IllegalArgumentException.class, () -> researcherServiceJpa.checkActionDto(invalidActionDto));
    }

    @Test
    public void testCheckActionDtoInvalidEmpty() {
        ActionDto invalidActionDto = new ActionDto(1L, "", "ActionType", "LocationName");
        assertThrows(IllegalArgumentException.class, () -> researcherServiceJpa.checkActionDto(invalidActionDto));
    }

    @Test
    public void testCheckActionDtoInvalidWhitespace() {
        ActionDto invalidActionDto = new ActionDto(1L, " ActionName", "ActionType", "LocationName");
        assertThrows(IllegalArgumentException.class, () -> researcherServiceJpa.checkActionDto(invalidActionDto));
    }
}
