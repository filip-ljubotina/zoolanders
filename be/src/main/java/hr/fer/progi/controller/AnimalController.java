package hr.fer.progi.controller;

import hr.fer.progi.dto.researcherDto.ActionDto;
import hr.fer.progi.dto.researcherDto.AnimalDto;
import hr.fer.progi.service.impl.AnimalServiceJpa;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/wildTrack")
public class AnimalController {

    private final AnimalServiceJpa animalServiceJpa;

    public AnimalController(AnimalServiceJpa animalServiceJpa) {
        this.animalServiceJpa = animalServiceJpa;
    }

    @GetMapping("/animal/findAllBreedsByStation/{stationName}")
    public ResponseEntity<List<String>> findAllBreedsByStation(@PathVariable String stationName) {
        List<String> allBreeds = animalServiceJpa.findAllBreedsByStation(stationName);
        return new ResponseEntity<>(allBreeds, HttpStatus.OK);
    }

    @GetMapping("/animal/findAllAnimalsByStation/{stationName}")
    public ResponseEntity<List<AnimalDto>> findAllAnimalsByStation(@PathVariable String stationName) {
        List<AnimalDto> allAnimals = animalServiceJpa.findAllAnimalsByStation(stationName);
        return new ResponseEntity<>(allAnimals, HttpStatus.OK);
    }
}
