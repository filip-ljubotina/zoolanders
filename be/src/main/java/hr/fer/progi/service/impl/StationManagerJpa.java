package hr.fer.progi.service.impl;

import hr.fer.progi.entity.AppUser;
import hr.fer.progi.jsonentities.CoordinatesJson;
import hr.fer.progi.entity.Station;
import hr.fer.progi.entity.StationManager;
import hr.fer.progi.mapper.StationStringToClassMapper;
import hr.fer.progi.repository.AppUserRepository;
import hr.fer.progi.repository.StationManagerRepository;
import hr.fer.progi.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StationManagerJpa {

    private final StationStringToClassMapper stationStringToClassMapper;
    private final StationManagerRepository stationManagerRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AppUserRepository appUserRepository;

    public void createStationManager(AppUser appUser, String reqStation){
        Station station = stationStringToClassMapper.stationStringToClass(reqStation);
        if (checkForExistingStationManagers(station)){
            throw new IllegalStateException("StationManager Already Exists");
        }
        StationManager stationManager = new StationManager();
        stationManager.setAppUser(appUser);
        stationManager.setStation(station);
        stationManagerRepository.save(stationManager);
    }

    private boolean checkForExistingStationManagers(Station station){
        Optional<StationManager> optionalStationManager= stationManagerRepository.findByStation(station);
        if (optionalStationManager.isPresent()) {
            return true;
        }
        return false;
    }
    public CoordinatesJson getCoordinatesJson(String authorizationHeader) {
        CoordinatesJson coordinatesJson = findStationByToken(authorizationHeader).getCoordinatesJson();
        return coordinatesJson;
    }

    public Station findStationByToken(String authorizationHeader) {
        Long appUserId = jwtTokenProvider.extractAppUserId(authorizationHeader);
        AppUser appUser = appUserRepository.findById(appUserId).get();
        Station station = stationManagerRepository.findStationByUserId(appUser);
        return station;
    }


}
