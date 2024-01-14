package hr.fer.progi.controller;

import hr.fer.progi.dto.gpsDto.NewAnimalLocationDto;
import hr.fer.progi.service.impl.AnimalServiceJpa;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@CrossOrigin
@RestController
@RequestMapping(path = "/gps")
public class GpsController {

    private final AnimalServiceJpa animalServiceJpa;

    @PutMapping("/putNewAnimalLocation")
    public HttpStatus putNewAnimalLocation(@RequestBody NewAnimalLocationDto newAnimalLocationDto) {
        animalServiceJpa.putNewAnimalLocation(newAnimalLocationDto);
        return HttpStatus.CREATED;
    }
}

