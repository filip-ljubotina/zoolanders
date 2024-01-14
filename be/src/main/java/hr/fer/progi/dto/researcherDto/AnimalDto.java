package hr.fer.progi.dto.researcherDto;

import hr.fer.progi.jsonentities.PositionCoordinates;

import java.util.List;

public class AnimalDto {
    private Long animalId;
    private String animalName;
    private String breed;
    private String description;
    private List<Double> currentPosition;
    private byte[] image;

    public AnimalDto() {
    }

    public AnimalDto(Long animalId, String animalName,
                     String breed, String description,
                     Object currentPositionObject, byte[] image) {
        this.animalId = animalId;
        this.animalName = animalName;
        this.breed = breed;
        this.description = description;
        PositionCoordinates positionCoordinates = (PositionCoordinates) currentPositionObject;
        this.currentPosition = positionCoordinates.getCoordinates();
        this.image = image;
    }

    public Long getAnimalId() {
        return animalId;
    }

    public void setAnimalId(Long animalId) {
        this.animalId = animalId;
    }

    public String getAnimalName() {
        return animalName;
    }

    public void setAnimalName(String animalName) {
        this.animalName = animalName;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Double> getCurrentPosition() {
        return currentPosition;
    }

    public void setCurrentPosition(List<Double> currentPosition) {
        this.currentPosition = currentPosition;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
