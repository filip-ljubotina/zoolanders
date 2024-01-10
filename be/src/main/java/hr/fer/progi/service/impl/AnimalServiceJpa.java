package hr.fer.progi.service.impl;

import hr.fer.progi.dto.gpsDto.NewAnimalLocationDto;
import hr.fer.progi.dto.researcherDto.AnimalDto;
import hr.fer.progi.entity.Animal;
import hr.fer.progi.entity.Station;
import hr.fer.progi.jsonentities.MapViewCriteria;
import hr.fer.progi.mapper.AnimalDtoMapper;
import hr.fer.progi.repository.AnimalRepository;
import hr.fer.progi.repository.StationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AnimalServiceJpa {

    private final AnimalRepository animalRepository;
    private final StationRepository stationRepository;
    private final AnimalDtoMapper animalDtoMapper;
    private final PastDataServiceJpa pastDataServiceJpa;

    public List<String> findAllBreedsByStation(String stationName){
        Station station = stationRepository.findByStationName(stationName);
        List<String> allBreeds = animalRepository.findAllBreedsByStation(station);
        return allBreeds;
    }

    public List<AnimalDto> findAllAnimalsByStation(String stationName){
        Station station = stationRepository.findByStationName(stationName);
        List<AnimalDto> allAnimals = animalRepository.findAllAnimalsByStation(station);
        return allAnimals;
    }

    public List<AnimalDto> findAllAnimalsByCriteria(String stationName, MapViewCriteria mapViewCriteria) {
        Station station = stationRepository.findByStationName(stationName);
        List<AnimalDto> allAnimals = animalRepository.findAllAnimalsByStation(station);

        return allAnimals.stream()
                .filter(animalDto -> {
                    Object animalValue = getValueBySubject(mapViewCriteria.getSubject(), animalDto);
                    return mapViewCriteria.getCheckedItems().contains(animalValue);
                })
                .collect(Collectors.toList());
    }

    private Object getValueBySubject(String subject, AnimalDto animalDto) {
        switch (subject) {
            case "individual":
                return animalDto.getAnimalId().intValue();
            case "breed":
                return animalDto.getBreed();
            default:
                throw new IllegalArgumentException("Invalid subject: " + subject);
        }
    }

    public void postNewAnimal(AnimalDto animalDto, Station station){
        animalRepository.save(animalDtoMapper.AnimalDtoToClass(animalDto, station));
    }

    public void putNewAnimalLocation(NewAnimalLocationDto newAnimalLocationDto) {
        Animal animal = animalRepository.findById(newAnimalLocationDto.getAnimalId()).get();
        pastDataServiceJpa.animalPostitionSave(animal);
        animal.getCurrentPosition().setCoordinates(newAnimalLocationDto.getNewLocation());
        animalRepository.save(animal);
    }
}
