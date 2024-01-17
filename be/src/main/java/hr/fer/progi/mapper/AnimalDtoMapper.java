package hr.fer.progi.mapper;

import hr.fer.progi.dto.researcherDto.AnimalDto;
import hr.fer.progi.entity.Animal;
import hr.fer.progi.entity.Station;
import hr.fer.progi.jsonentities.PositionCoordinates;
import org.springframework.stereotype.Component;

@Component
public class AnimalDtoMapper {

    public Animal AnimalDtoToClass(AnimalDto animalDto, Station station){
        PositionCoordinates positionCoordinates = new PositionCoordinates(animalDto.getCurrentPosition());
        Animal animal = new Animal();
        animal.setName(animalDto.getAnimalName());
        animal.setBreed(animalDto.getBreed());
        animal.setDescription(animalDto.getDescription());
        animal.setCurrentPosition(positionCoordinates);
        animal.setStation(station);
        animal.setImage(animalDto.getImage());
        return animal;
    }
}
