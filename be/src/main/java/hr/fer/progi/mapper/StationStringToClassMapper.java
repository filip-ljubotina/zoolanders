package hr.fer.progi.mapper;

import hr.fer.progi.entity.Station;
import hr.fer.progi.repository.StationRepository;
import org.springframework.stereotype.Component;

@Component
public class StationStringToClassMapper {

    private final StationRepository stationRepository;

    public StationStringToClassMapper(StationRepository stationRepository) {
        this.stationRepository = stationRepository;
    }

    public Station stationStringToClass(String stationName){
        Station station = stationRepository.findByStationName(stationName);
        return station;
    }
}
