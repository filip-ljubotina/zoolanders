package hr.fer.progi;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import hr.fer.progi.dto.researcherDto.RequestDto;
import hr.fer.progi.service.impl.ResearcherServiceJpa;
import org.junit.jupiter.api.Test;

public class CheckRequestDtoTest {
    private final ResearcherServiceJpa service = new ResearcherServiceJpa(null, null, null, null, null, null, null, null, null);
    @Test
    public void testCheckRequestDtoValid() {
        RequestDto validRequestDto = new RequestDto();
        validRequestDto.setStationName("StationA");
        List<String> qualifications = Arrays.asList("QualificationA", "QualificationB");
        validRequestDto.setQualifications(qualifications);

        assertDoesNotThrow(() -> service.checkRequestDto(validRequestDto));
    }

    @Test
    public void testCheckRequestDtoNull() {
        RequestDto nullRequestDto = null;

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> service.checkRequestDto(nullRequestDto));

        assertEquals("RequestDto is null", exception.getMessage());
    }

    @Test
    public void testCheckRequestDtoMissingStationName() {
        RequestDto missingStationNameDto = new RequestDto();
        List<String> qualifications = Arrays.asList("QualificationA", "QualificationB");
        missingStationNameDto.setQualifications(qualifications);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> service.checkRequestDto(missingStationNameDto));

        assertEquals("StationName is missing", exception.getMessage());
    }

    @Test
    public void testCheckRequestDtoMissingQualifications() {
        RequestDto missingQualificationsDto = new RequestDto();
        missingQualificationsDto.setStationName("StationA");

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> service.checkRequestDto(missingQualificationsDto));

        assertEquals("Qualifications is missing", exception.getMessage());
    }
}
