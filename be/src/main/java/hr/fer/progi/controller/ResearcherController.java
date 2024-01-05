package hr.fer.progi.controller;

import hr.fer.progi.dto.researcherDto.*;
import hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto;
import hr.fer.progi.jsonentities.CoordinatesJson;
import hr.fer.progi.repository.StationRepository;
import hr.fer.progi.security.JwtTokenProvider;
import hr.fer.progi.service.impl.ResearcherServiceJpa;
import hr.fer.progi.service.impl.StationManagerJpa;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/wildTrack")
public class ResearcherController {
    private final ResearcherServiceJpa researcherServiceJpa;
    private final JwtTokenProvider jwtTokenProvider;
    private final StationRepository stationRepository;

    public ResearcherController(ResearcherServiceJpa researcherServiceJpa, JwtTokenProvider jwtTokenProvider, StationRepository stationRepository) {
        this.researcherServiceJpa = researcherServiceJpa;
        this.jwtTokenProvider = jwtTokenProvider;
        this.stationRepository = stationRepository;
    }

    @PostMapping("/researcher/postNewAction")
    public HttpStatus postNewAction(@RequestBody ActionDto actionDto, @RequestHeader("Authorization") String authorizationHeader) {
        researcherServiceJpa.postNewAction(actionDto, jwtTokenProvider.extractAppUserId(authorizationHeader));
        return HttpStatus.CREATED;
    }

    @GetMapping("/researcher/getAllActions")
    public ResponseEntity<List<ActionDto>> getAllActions(@RequestHeader("Authorization") String authorizationHeader) {
        List<ActionDto> actionDtos = researcherServiceJpa.getAllActions(jwtTokenProvider.extractAppUserId(authorizationHeader));
        return new ResponseEntity<>(actionDtos, HttpStatus.OK);
    }

    @GetMapping("/researcher/getAvailableStationQualifications")
    public ResponseEntity<AvailableQualificationsDto> getAvailableStationQualifications() {
        AvailableQualificationsDto availableQualificationsDto = researcherServiceJpa.getAvailableStationQualifications();
        return new ResponseEntity<>(availableQualificationsDto, HttpStatus.OK);
    }

    @PutMapping("/researcher/putNewRequest")
    public HttpStatus putNewRequest(@RequestBody RequestDto requestDto) {
        researcherServiceJpa.putNewRequest(requestDto);
        return HttpStatus.OK;
    }

    @GetMapping("/researcher/getAllSearchersOnAction/{actionId}")
    public ResponseEntity<List<AvailableSearcherDto>> getAllSearchersOnAction(@PathVariable Long actionId) {
        List<AvailableSearcherDto> availableSearcherDtos = researcherServiceJpa.getAllSearchersOnAction(actionId);
        return new ResponseEntity<>(availableSearcherDtos, HttpStatus.OK);
    }

    @GetMapping("/researcher/getStationCoordinatesJson/{stationName}")
    public ResponseEntity<CoordinatesJson> getCoordinatesJson(@PathVariable String stationName) {
        CoordinatesJson coordinatesJson = stationRepository.findByStationName(stationName).getCoordinatesJson(); //TODO:napraviti zasebni station service
        return new ResponseEntity<>(coordinatesJson, HttpStatus.OK);
    }

    @PutMapping("/researcher/putMapViewCriteria/{actionId}")
    public HttpStatus putMapViewCriteria(@PathVariable Long actionId, @RequestBody MapViewCriteriaDto mapViewCriteriaDto) {
        researcherServiceJpa.putMapViewCriteria(actionId, mapViewCriteriaDto);
        return HttpStatus.OK;
    }

    @GetMapping("/researcher/getMapViewCriteria/{actionId}")
    public ResponseEntity<MapViewCriteriaDto> getMapViewCriteria(@PathVariable Long actionId) {
        MapViewCriteriaDto mapViewCriteriaDto = researcherServiceJpa.getMapViewCriteria(actionId);
        return new ResponseEntity<>(mapViewCriteriaDto, HttpStatus.OK);
    }

    @PostMapping("/researcher/postNewTask/{actionId}")
    public HttpStatus postNewTask(@RequestBody TaskDto taskDto, @PathVariable Long actionId) {

        researcherServiceJpa.postNewTask(taskDto, actionId);
        return HttpStatus.CREATED;
    }
}