package hr.fer.progi;

import static org.junit.jupiter.api.Assertions.*;

import hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto;
import hr.fer.progi.service.impl.StationManagerJpa;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

public class CheckAvailableSearcherDtoTest {

    private final StationManagerJpa stationManagerJpa = new StationManagerJpa(null, null, null, null, null, null, null, null);

    @Test
    public void testCheckAvailableSearcherDtoValid() {
        AvailableSearcherDto validSearcherDto = new AvailableSearcherDto();
        validSearcherDto.setFirstName("John");
        validSearcherDto.setLastName("Doe");
        validSearcherDto.setQualification("Biologist");
        validSearcherDto.setCurrentPosition(Arrays.asList(1.0, 2.0));

        assertDoesNotThrow(() -> stationManagerJpa.checkAvailableSearcherDto(validSearcherDto));
    }

    @Test
    public void testCheckAvailableSearcherDtoNull() {
        AvailableSearcherDto nullSearcherDto = null;

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> stationManagerJpa.checkAvailableSearcherDto(nullSearcherDto));

        assertEquals("AvailableSearcherDto is null", exception.getMessage());
    }

    @Test
    public void testCheckAvailableSearcherDtoMissingFirstName() {
        AvailableSearcherDto missingFirstNameDto = new AvailableSearcherDto();
        missingFirstNameDto.setLastName("Doe");
        missingFirstNameDto.setQualification("Biologist");
        missingFirstNameDto.setCurrentPosition(Arrays.asList(1.0, 2.0));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> stationManagerJpa.checkAvailableSearcherDto(missingFirstNameDto));

        assertEquals("First name is missing", exception.getMessage());
    }

}
