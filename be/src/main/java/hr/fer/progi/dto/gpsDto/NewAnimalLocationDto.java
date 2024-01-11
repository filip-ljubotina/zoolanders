package hr.fer.progi.dto.gpsDto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NewAnimalLocationDto {
    private Long animalId;
    private List<Double> newLocation;
}
