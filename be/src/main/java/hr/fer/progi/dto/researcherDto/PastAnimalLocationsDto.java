package hr.fer.progi.dto.researcherDto;

import hr.fer.progi.jsonentities.PositionCoordinates;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PastAnimalLocationsDto {

    private Long pastLocationId;
    private Long animalId;
    private String animalName;
    private String breed;
    private List<Double> pastLocation;

    public PastAnimalLocationsDto() {
    }

    public PastAnimalLocationsDto(Long pastLocationId, Long animalId, String animalName, String breed, Object pastLocationObject) {
        this.pastLocationId = pastLocationId;
        this.animalId = animalId;
        this.animalName = animalName;
        this.breed = breed;
        PositionCoordinates positionCoordinates = (PositionCoordinates) pastLocationObject;
        this.pastLocation = positionCoordinates.getCoordinates();
    }
}
