package hr.fer.progi.controller;

import hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto;
import hr.fer.progi.dto.stationManagerDto.ChosenSearcherDto;
import hr.fer.progi.jsonentities.CoordinatesJson;
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

    public StationManagerController(SearcherInTheFieldJpa searcherInTheFieldJpa, StationManagerJpa stationManagerJpa) {
        this.searcherInTheFieldJpa = searcherInTheFieldJpa;
        this.stationManagerJpa = stationManagerJpa;
    }

    @GetMapping("/manager/getAvailableSearchers")
    public ResponseEntity<List<AvailableSearcherDto>> adminGetAllUsers() {
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
}
