package hr.fer.progi.service.impl;

import hr.fer.progi.dto.researcherDto.*;
import hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto;
import hr.fer.progi.entity.*;
import hr.fer.progi.mapper.ActionDtoMapper;
import hr.fer.progi.mapper.JsonToClass;
import hr.fer.progi.mapper.ReqDtoToSearchersReqMapper;
import hr.fer.progi.repository.ActionRepository;
import hr.fer.progi.repository.StationRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@AllArgsConstructor
public class ResearcherServiceJpa {

    private final ActionRepository actionRepository;
    private final ActionDtoMapper actionDtoMapper;
    private final AppUserServiceJpa appUserServiceJpa;
    private final StationRepository stationRepository;
    private final SearcherInTheFieldJpa searcherInTheFieldJpa;
    private final ReqDtoToSearchersReqMapper reqDtoToSearchersReqMapper;
    private final JsonToClass jsonToClass;
    private final TaskServiceJpa taskServiceJpa;
    private final PastDataServiceJpa pastDataServiceJpa;

    public void postNewAction(ActionDto actionDto, Long appUserId) {
        AppUser appUser = appUserServiceJpa.findById(appUserId);
        Action newAction = actionDtoMapper.dtoToClass(actionDto, appUser);
        actionRepository.save(newAction);
    }

    public List<ActionDto> getAllActions(Long appUserId) {
        AppUser appUser = appUserServiceJpa.findById(appUserId);
        List<ActionDto> actionDtos = actionRepository.findAllActions(appUser);
        return actionDtos;
    }

    public AvailableQualificationsDto getAvailableStationQualifications() {
        List<Station> stations = stationRepository.findAll();
        HashMap<String, List<String>> stationQualifications = new HashMap<>();
        for (Station station : stations){
            List<String> qualifications = searcherInTheFieldJpa.getDistinctQualificationsByStation(station);
            stationQualifications.put(station.getStationName(), qualifications);
        }
        return new AvailableQualificationsDto(stationQualifications);
    }

    public void putNewRequest(RequestDto requestDto) {
        checkRequestDto(requestDto);
        Action action = actionRepository.findById(requestDto.getActionId()).get();
        if (action.getSearchersRequest() != null) {
            throw new IllegalArgumentException("Action already has a request!");
        }
        Station station = stationRepository.findByStationName(requestDto.getStationName());
        SearchersRequest searchersRequest = reqDtoToSearchersReqMapper.mapper(station, requestDto.getQualifications());
        action.setSearchersRequest(searchersRequest);
        actionRepository.save(action);
    }

    public void checkRequestDto(RequestDto requestDto){
        if (requestDto == null) {
            throw new IllegalArgumentException("RequestDto is null");
        }
        if (requestDto.getStationName() == null || requestDto.getStationName().isEmpty()) {
            throw new IllegalArgumentException("StationName is missing");
        }
        if (requestDto.getQualifications() == null || requestDto.getQualifications().isEmpty()) {
            throw new IllegalArgumentException("Qualifications is missing");
        }
    }

    public List<AvailableSearcherDto> getAllSearchersOnAction(Long actionId) {
        Action action = actionRepository.findById(actionId).get();
        List<AvailableSearcherDto> availableSearcherDtos = searcherInTheFieldJpa.getAllSearchersOnAction(action);
        return  availableSearcherDtos;
    }

    public void putMapViewCriteria(Long actionId, MapViewCriteriaDto mapViewCriteriaDto) {
        Action action = actionRepository.findById(actionId).get();
        action.setMapViewCriteria(jsonToClass.jsonToMapViewCriteria(mapViewCriteriaDto));
        actionRepository.save(action);
    }

    public MapViewCriteriaDto getMapViewCriteria(Long actionId) {
        Action action = actionRepository.findById(actionId).get();
        return jsonToClass.mapViewCriteriaToDto(action.getMapViewCriteria());
    }

    public void postNewTask(TaskDto taskDto, Long actionId) {
        Action action = actionRepository.findById(actionId).get();
        taskServiceJpa.postNewTask(taskDto, action, searcherInTheFieldJpa.findById(taskDto.getSearcherId()));
    }

    public List<PastSearcherRoutesDto> getPastSearcherRoutes (Long actionId, Long searcherInTheFieldId){
        Action action = actionRepository.findById(actionId).get();
        SearcherInTheField searcherInTheField = searcherInTheFieldJpa.findById(searcherInTheFieldId);
        return pastDataServiceJpa.getPastSearcherRoutes(searcherInTheField, action);
    }

    public List<PastSearcherLocationDto> getPastSearchersLocations (Long actionId){
        Action action = actionRepository.findById(actionId).get();
        return pastDataServiceJpa.getPastSearchersLocations(action);
    }

    public List<PastAnimalLocationsDto> getPastAnimalsLocations (Long actionId){
        Action action = actionRepository.findById(actionId).get();
        return pastDataServiceJpa.getPastAnimalsLocations(action);
    }
}
