package hr.fer.progi.controller;

import hr.fer.progi.dto.researcherDto.ActionDto;
import hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto;
import hr.fer.progi.dto.stationManagerDto.ChosenSearcherDto;
import hr.fer.progi.jsonentities.CoordinatesJson;
import hr.fer.progi.security.JwtTokenProvider;
import hr.fer.progi.service.impl.SearcherInTheFieldJpa;
import hr.fer.progi.service.impl.StationManagerJpa;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/wildTrack")
public class StationManagerController {

    private final SearcherInTheFieldJpa searcherInTheFieldJpa;
    private final StationManagerJpa stationManagerJpa;
    private final JwtTokenProvider jwtTokenProvider;

    public StationManagerController(SearcherInTheFieldJpa searcherInTheFieldJpa, StationManagerJpa stationManagerJpa, JwtTokenProvider jwtTokenProvider) {
        this.searcherInTheFieldJpa = searcherInTheFieldJpa;
        this.stationManagerJpa = stationManagerJpa;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/manager/getAvailableSearchers")
    public ResponseEntity<List<AvailableSearcherDto>> getAvailableSearchers() {
        List<AvailableSearcherDto> listOfAvailableSearchers = searcherInTheFieldJpa.getAllAvailableSearchers();
        return new ResponseEntity<>(listOfAvailableSearchers, HttpStatus.CREATED);
    }

    @GetMapping("/manager/getCoordinatesJson")
    public ResponseEntity<CoordinatesJson> getCoordinatesJson(@RequestHeader("Authorization") String authorizationHeader) {
        CoordinatesJson coordinatesJson = stationManagerJpa.getCoordinatesJson(authorizationHeader);
        return new ResponseEntity<>(coordinatesJson, HttpStatus.CREATED);
    }

    @PutMapping("/manager/putChosenSearcher")
    public HttpStatus updateChosenSearcher(@RequestBody ChosenSearcherDto chosenSearcherDto,
                                           @RequestHeader("Authorization") String authorizationHeader) {
        searcherInTheFieldJpa.updateChosenSearcher(chosenSearcherDto, stationManagerJpa.findStationByToken(authorizationHeader));
        return HttpStatus.OK;
    }

    @GetMapping("/manager/getActionsRequestingNewSearches")
    public ResponseEntity<List<ActionDto>> getActionsRequestingNewSearches(@RequestHeader("Authorization") String authorizationHeader) {
        List<ActionDto> actionDtos = stationManagerJpa.getActionsRequestingNewSearches(jwtTokenProvider.extractAppUserId(authorizationHeader));
        return new ResponseEntity<>(actionDtos, HttpStatus.CREATED);
    }

    @GetMapping("/manager/getAllAvailableSearchersForAction")
    public ResponseEntity<List<AvailableSearcherDto>> getAllAvailableSearchersForAction(@RequestHeader("Authorization") String authorizationHeader,
                                                                                        @RequestParam Long actionId) {
        List<AvailableSearcherDto> listOfAvailableSearchers =
                stationManagerJpa.getAllAvailableSearchersForAction(jwtTokenProvider.extractAppUserId(authorizationHeader), actionId);
        return new ResponseEntity<>(listOfAvailableSearchers, HttpStatus.CREATED);
    }

    @PutMapping("/manager/putChosenSearcherForAction")
    public HttpStatus putChosenSearcherForAction(@RequestBody AvailableSearcherDto availableSearcherDto,
                                                 @RequestParam Long actionId) {
        stationManagerJpa.putChosenSearcherForAction(availableSearcherDto, actionId);
        return HttpStatus.OK;
    }

    @PutMapping("/manager/putActionSearcherRequestToNull")
    public HttpStatus putActionSearcherRequestToNull(@RequestParam Long actionId) {
        stationManagerJpa.putActionSearcherRequestToNull(actionId);
        return HttpStatus.OK;
    }
}
