package hr.fer.progi;

import static org.junit.jupiter.api.Assertions.*;

import hr.fer.progi.dto.researcherDto.AnimalDto;
import hr.fer.progi.service.impl.SearcherInTheFieldJpa;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

public class CheckAnimalDtoTest {
    private final SearcherInTheFieldJpa searcherJpa = new SearcherInTheFieldJpa(null, null, null, null, null, null, null, null);

    @Test
    public void testCheckAnimalDtoValid() {

        AnimalDto validAnimalDto = new AnimalDto();
        validAnimalDto.setAnimalName("Vuk");
        validAnimalDto.setBreed("Lički");
        validAnimalDto.setDescription("Sivi, brzi vuk");
        validAnimalDto.setCurrentPosition(Arrays.asList(1.0, 2.0));

        assertDoesNotThrow(() -> searcherJpa.checkAnimalDto(validAnimalDto));
    }

    @Test
    public void testCheckAnimalDtoNull() {
        AnimalDto nullAnimalDto = null;

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> searcherJpa.checkAnimalDto(nullAnimalDto));

        assertEquals("AnimalDto is null", exception.getMessage());
    }

    @Test
    public void testCheckAnimalDtoMissingName() {
        AnimalDto missingNameDto = new AnimalDto();
        missingNameDto.setBreed("Lički");
        missingNameDto.setDescription("Sivi, brzi vuk");
        missingNameDto.setCurrentPosition(Arrays.asList(1.0, 2.0));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> searcherJpa.checkAnimalDto(missingNameDto));

        assertEquals("AnimalName is missing", exception.getMessage());
    }

    @Test
    public void testCheckAnimalDtoMissingBreed() {
        AnimalDto missingBreedDto = new AnimalDto();
        missingBreedDto.setAnimalName("Vuk");
        missingBreedDto.setDescription("Sivi, brzi vuk");
        missingBreedDto.setCurrentPosition(Arrays.asList(1.0, 2.0));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> searcherJpa.checkAnimalDto(missingBreedDto));

        assertEquals("Breed is missing", exception.getMessage());
    }

}
