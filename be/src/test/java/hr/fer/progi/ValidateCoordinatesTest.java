package hr.fer.progi;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

import hr.fer.progi.dto.MapCommentDto;
import hr.fer.progi.service.impl.CommentServiceJpa;
import org.junit.jupiter.api.Test;

public class ValidateCoordinatesTest {
    @Test
    public void testValidateCoordinatesValid() {
        MapCommentDto validMapCommentDto = new MapCommentDto();
        List<Double> validCoordinates = Arrays.asList(1.0, 2.0, 3.0);
        validMapCommentDto.setCoordinates(validCoordinates);

        assertDoesNotThrow(() -> CommentServiceJpa.validateCoordinates(validMapCommentDto));
    }

    @Test
    public void testValidateCoordinatesNullDto() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> CommentServiceJpa.validateCoordinates(null));

        assertEquals("Coordinates cannot be null", exception.getMessage());
    }

    @Test
    public void testValidateCoordinatesNullCoordinate() {
        MapCommentDto nullCoordinateDto = new MapCommentDto();
        List<Double> coordinatesWithNull = Arrays.asList(1.0, null, 3.0);
        nullCoordinateDto.setCoordinates(coordinatesWithNull);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> CommentServiceJpa.validateCoordinates(nullCoordinateDto));

        assertEquals("Coordinate value cannot be null", exception.getMessage());
    }
}
