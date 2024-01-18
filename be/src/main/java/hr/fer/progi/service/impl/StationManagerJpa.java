package hr.fer.progi.service.impl;

import hr.fer.progi.dto.researcherDto.ActionDto;
import hr.fer.progi.dto.researcherDto.AnimalDto;
import hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.AppUser;
import hr.fer.progi.jsonentities.CoordinatesJson;
import hr.fer.progi.entity.Station;
import hr.fer.progi.entity.StationManager;
import hr.fer.progi.mapper.ActionDtoMapper;
import hr.fer.progi.mapper.QualificationEnumMapper;
import hr.fer.progi.mapper.StationStringToClassMapper;
import hr.fer.progi.repository.ActionRepository;
import hr.fer.progi.repository.AppUserRepository;
import hr.fer.progi.repository.StationManagerRepository;
import hr.fer.progi.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StationManagerJpa {

    private final StationStringToClassMapper stationStringToClassMapper;
    private final StationManagerRepository stationManagerRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AppUserRepository appUserRepository;
    private final ActionRepository actionRepository;
    private final ActionDtoMapper actionDtoMapper;
    private final SearcherInTheFieldJpa searcherInTheFieldJpa;
    private final QualificationEnumMapper qualificationEnumMapper;

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


    private Station findStationByAppUserId(Long appUserId){
        AppUser appUser = appUserRepository.findById(appUserId).get();
        return stationManagerRepository.findStationByUserId(appUser);
    }

    @Transactional
    public List<ActionDto> getActionsRequestingNewSearches(Long appUserId) {
        Station station = findStationByAppUserId(appUserId);
        List<Action> actions = actionRepository.findBySearchersRequest_Station(station);
        return  actionDtoMapper.actionListToDtoList(actions);
    }

    public List<AvailableSearcherDto> getAllAvailableSearchersForAction(Long appUserId, Long actionId) {
        Station station = findStationByAppUserId(appUserId);
        Action action = actionRepository.findById(actionId).get();
        List<String> qualificationsString = action.getSearchersRequest().getQualificationsJson().getQualifications();
        return searcherInTheFieldJpa.getAllAvailableSearchersForAction(station, qualificationEnumMapper.qualificationStringToEnums(qualificationsString));
    }


    public void putChosenSearcherForAction(AvailableSearcherDto availableSearcherDto, Long actionId) {
        checkAvailableSearcherDto(availableSearcherDto);
        Action action = actionRepository.findById(actionId).get();
        searcherInTheFieldJpa.putChosenSearcherForAction(availableSearcherDto, action);
    }

    public void checkAvailableSearcherDto(AvailableSearcherDto availableSearcherDto){
        if (availableSearcherDto == null) {
            throw new IllegalArgumentException("AvailableSearcherDto is null");
        }
        if (availableSearcherDto.getFirstName() == null || availableSearcherDto.getFirstName().isEmpty()) {
            throw new IllegalArgumentException("First name is missing");
        }
        if (availableSearcherDto.getLastName() == null || availableSearcherDto.getLastName().isEmpty()) {
            throw new IllegalArgumentException("Last name is missing");
        }
        if (availableSearcherDto.getQualification() == null || availableSearcherDto.getQualification().isEmpty()) {
            throw new IllegalArgumentException("Qualification is missing");
        }
    }

    public void putActionSearcherRequestToNull(Long actionId) {
        Action action = actionRepository.findById(actionId).get();
        action.setSearchersRequest(null);
        actionRepository.save(action);
    }
}
