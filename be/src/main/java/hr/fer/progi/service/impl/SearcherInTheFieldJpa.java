package hr.fer.progi.service.impl;

import hr.fer.progi.dto.researcherDto.ActionDto;
import hr.fer.progi.dto.researcherDto.AnimalDto;
import hr.fer.progi.dto.researcherDto.TaskDto;
import hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto;
import hr.fer.progi.dto.stationManagerDto.ChosenSearcherDto;
import hr.fer.progi.entity.*;
import hr.fer.progi.entity.enums.Qualification;
import hr.fer.progi.jsonentities.PositionCoordinates;
import hr.fer.progi.jsonentities.MapViewCriteria;
import hr.fer.progi.jsonentities.RouteWaypoints;
import hr.fer.progi.mapper.ActionDtoMapper;
import hr.fer.progi.mapper.AvailableSearcherDtoMapper;
import hr.fer.progi.repository.SearcherInTheFieldRepository;
import hr.fer.progi.repository.StationRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class SearcherInTheFieldJpa {

    private final SearcherInTheFieldRepository searcherInTheFieldRepository;
    private final StationRepository stationRepository;
    private final AppUserServiceJpa appUserServiceJpa;
    private final ActionDtoMapper actionDtoMapper;
    private final AvailableSearcherDtoMapper availableSearcherDtoMapper;
    private final AnimalServiceJpa animalServiceJpa;
    private final TaskServiceJpa taskServiceJpa;
    private final PastDataServiceJpa pastDataServiceJpa;


    public void createSearcherInTheField(AppUser appUser){
        SearcherInTheField searcherInTheField = new SearcherInTheField();
        searcherInTheField.setAppUser(appUser);
        searcherInTheFieldRepository.save(searcherInTheField);
    }

    public List<AvailableSearcherDto> getAllAvailableSearchers() {
        return searcherInTheFieldRepository.findAllAvailableSearchers();
    }

    public void updateChosenSearcher(ChosenSearcherDto chosenSearcherDto, Station station){
        Qualification qualification = Qualification.valueOf(chosenSearcherDto.getQualification());
        Long searcherId = chosenSearcherDto.getSearcherId();
        SearcherInTheField searcherInTheField = searcherInTheFieldRepository.findById(searcherId).get();
        searcherInTheField.setQualification(qualification);
        searcherInTheField.setStation(station);
        searcherInTheFieldRepository.save(searcherInTheField);
    }

    public List<String> getDistinctQualificationsByStation(Station station) {
        List<Qualification> qualifications = searcherInTheFieldRepository.findDistinctQualificationsByStation(station);

        List<String> qualificationStrings = qualifications.stream()
                .map(Qualification::name)
                .collect(Collectors.toList());

        return qualificationStrings;
    }

    public List<AvailableSearcherDto> getAllAvailableSearchersForAction(Station station, List<Qualification> qualifications) {
        return searcherInTheFieldRepository.findAllAvailableSearchersForAction(station, qualifications);
    }

    public void putChosenSearcherForAction(AvailableSearcherDto availableSearcherDto, Action action) {
        Long searcherId = availableSearcherDto.getSearcherId();
        String locationName = action.getLocationName();
        List<Double> stationCoordinates = stationRepository.findByStationName(locationName).getCoordinatesJson().getCenter();
        PositionCoordinates positionCoordinates = new PositionCoordinates(stationCoordinates);
        SearcherInTheField searcherInTheField = searcherInTheFieldRepository.findById(searcherId).get();
        searcherInTheField.setAction(action);
        searcherInTheField.setCurrentPosition(positionCoordinates);
        searcherInTheFieldRepository.save(searcherInTheField);
    }

    public List<AvailableSearcherDto> getAllSearchersOnAction(Action action) {
        List<AvailableSearcherDto> availableSearcherDtos = searcherInTheFieldRepository.findAllSearchersOnActionByAction(action);
        return availableSearcherDtos;
    }

    public SearcherInTheField findById(Long searcherId) {
        return searcherInTheFieldRepository.findById(searcherId).get();
    }

    public SearcherInTheField findByAppUserId(Long appUserId){
        return searcherInTheFieldRepository.findByAppUser(appUserServiceJpa.findById(appUserId));
    }

    public Action getActionByAppUserId(Long appUserId){
        return findByAppUserId(appUserId).getAction();
    }

    public ActionDto getActionInfoByAppUserId(Long appUserId) {
        return actionDtoMapper.actionToDto(getActionByAppUserId(appUserId));
    }

    public Boolean getCheckUserOnAction(Long appUserId) {
        Action action = getActionByAppUserId(appUserId);
        if(getActionByAppUserId(appUserId) == null){
            return false;
        }else {
            return true;
        }
    }

    public AvailableSearcherDto getSearcherInfoByAppUserId(Long appUserId) {
        return availableSearcherDtoMapper.searcherInTheFieldClassToDto(findByAppUserId(appUserId));
    }

    public List<AvailableSearcherDto> getAllSearchersOnActionByAppUserId(Long appUserId) {
        Action action = getActionByAppUserId(appUserId);
        SearcherInTheField searcherInTheField = findByAppUserId(appUserId);
        List<AvailableSearcherDto> availableSearcherDtos = searcherInTheFieldRepository.findAllSearchersOnActionByAction(action);
        return availableSearcherDtos.stream()
                .filter(dto -> !dto.getSearcherId().equals(searcherInTheField.getSearcherInTheFieldId()))
                .collect(Collectors.toList());
    }

    public List<AnimalDto> getAllAnimalsOnActionByAppUserId(Long appUserId) {
        Action action = getActionByAppUserId(appUserId);
        MapViewCriteria mapViewCriteria = action.getMapViewCriteria();
        return animalServiceJpa.findAllAnimalsByCriteria(action.getLocationName(), mapViewCriteria);
    }

    public List<TaskDto> getAllActiveTaskByAppUserId(Long appUserId) {
        return taskServiceJpa.getAllActiveTasksBySearcherInTheField(findByAppUserId(appUserId));
    }

    public void postNewAnimal(AnimalDto animalDto, Long appUserId) {
        checkAnimalDto(animalDto);
        SearcherInTheField searcherInTheField = findByAppUserId(appUserId);
        String stationName = searcherInTheField.getAction().getLocationName();
        animalServiceJpa.postNewAnimal(animalDto, stationRepository.findByStationName(stationName));
    }

    public void checkAnimalDto(AnimalDto animalDto){
        if (animalDto == null) {
            throw new IllegalArgumentException("AnimalDto is null");
        }
        if (animalDto.getAnimalName() == null || animalDto.getAnimalName().isEmpty()) {
            throw new IllegalArgumentException("AnimalName is missing");
        }
        if (animalDto.getBreed() == null || animalDto.getBreed().isEmpty()) {
            throw new IllegalArgumentException("Breed is missing");
        }
        if (animalDto.getDescription() == null || animalDto.getDescription().isEmpty()) {
            throw new IllegalArgumentException("Description is missing");
        }
        if (animalDto.getCurrentPosition() == null || animalDto.getCurrentPosition().isEmpty()) {
            throw new IllegalArgumentException("Current position is missing");
        }
    }


    public void putTaskCompleted(Long taskId, Long appUserId) {
        SearcherInTheField searcherInTheField = findByAppUserId(appUserId);
        taskServiceJpa.putTaskCompleted(taskId);

        RouteWaypoints pastRouteWaypoints = taskServiceJpa.getRouteWaypoints(taskId);
        PositionCoordinates pastCurrentPosition = taskServiceJpa.findPastCurrentPosition(taskId);
        pastDataServiceJpa.searcherPastDataSave(searcherInTheField, pastRouteWaypoints, pastCurrentPosition);

        PositionCoordinates newCurrentPosition = taskServiceJpa.findNewCurrentPosition(taskId);
        searcherInTheField.setCurrentPosition(newCurrentPosition);
        searcherInTheFieldRepository.save(searcherInTheField);
    }

    public void putRemoveFromAction(Long appUserId) {
        SearcherInTheField searcherInTheField = findByAppUserId(appUserId);
        if (searcherInTheField == null) {
            throw new IllegalArgumentException("SearcherInTheField is null");
        }
        pastDataServiceJpa.searcherPositionSave(searcherInTheField);
        searcherInTheField.setAction(null);
        searcherInTheField.setCurrentPosition(null);
        searcherInTheFieldRepository.save(searcherInTheField);
    }

    public List<AvailableSearcherDto> getAllSearchersInStation(Station station) {
        return searcherInTheFieldRepository.findAllSearchersByStation(station);
    }
}

