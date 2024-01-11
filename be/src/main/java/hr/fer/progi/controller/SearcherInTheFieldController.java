package hr.fer.progi.controller;

import hr.fer.progi.dto.AnimalCommentDto;
import hr.fer.progi.dto.researcherDto.ActionDto;
import hr.fer.progi.dto.researcherDto.AnimalDto;
import hr.fer.progi.dto.researcherDto.MapViewCriteriaDto;
import hr.fer.progi.dto.researcherDto.TaskDto;
import hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto;
import hr.fer.progi.security.JwtTokenProvider;
import hr.fer.progi.service.impl.AnimalServiceJpa;
import hr.fer.progi.service.impl.SearcherInTheFieldJpa;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/wildTrack")
@AllArgsConstructor
public class SearcherInTheFieldController {

    private final SearcherInTheFieldJpa searcherInTheFieldJpa;
    private final JwtTokenProvider jwtTokenProvider;
    private final AnimalServiceJpa animalServiceJpa;

    @GetMapping("/searcherInTheField/getCheckUserOnAction")
    public ResponseEntity<Boolean> getCheckUserOnAction(@RequestHeader("Authorization") String authorizationHeader) {
        Boolean check = searcherInTheFieldJpa.getCheckUserOnAction(jwtTokenProvider.extractAppUserId(authorizationHeader));
        return new ResponseEntity<>(check, HttpStatus.CREATED);
    }

    @GetMapping("/searcherInTheField/getSearcherInfo")
    public ResponseEntity<AvailableSearcherDto> getSearcherInfoByAppUserId(@RequestHeader("Authorization") String authorizationHeader) {
        AvailableSearcherDto searcherDto = searcherInTheFieldJpa.getSearcherInfoByAppUserId(jwtTokenProvider.extractAppUserId(authorizationHeader));
        return new ResponseEntity<>(searcherDto, HttpStatus.CREATED);
    }

    @GetMapping("/searcherInTheField/getAllSearchersOnAction")
    public ResponseEntity<List<AvailableSearcherDto>> getAllSearchersOnActionByAppUserId(@RequestHeader("Authorization") String authorizationHeader) {
        List<AvailableSearcherDto> availableSearcherDtos = searcherInTheFieldJpa.getAllSearchersOnActionByAppUserId(jwtTokenProvider.extractAppUserId(authorizationHeader));
        return new ResponseEntity<>(availableSearcherDtos, HttpStatus.CREATED);
    }

    @GetMapping("/searcherInTheField/getActionInfo")
    public ResponseEntity<ActionDto> getActionInfoByAppUserId(@RequestHeader("Authorization") String authorizationHeader) {
        ActionDto actionDto = searcherInTheFieldJpa.getActionInfoByAppUserId(jwtTokenProvider.extractAppUserId(authorizationHeader));
        return new ResponseEntity<>(actionDto, HttpStatus.CREATED);
    }

    @GetMapping("/searcherInTheField/getAllAnimalsOnAction")
    public ResponseEntity<List<AnimalDto>> getAllAnimalsOnActionByAppUserId(@RequestHeader("Authorization") String authorizationHeader) {
        List<AnimalDto> animalDtos = searcherInTheFieldJpa.getAllAnimalsOnActionByAppUserId(jwtTokenProvider.extractAppUserId(authorizationHeader));
        return new ResponseEntity<>(animalDtos, HttpStatus.CREATED);
    }

    @GetMapping("/searcherInTheField/getAllActiveTasks")
    public ResponseEntity<List<TaskDto>> getAllActiveTaskByAppUserId(@RequestHeader("Authorization") String authorizationHeader) {
        List<TaskDto> taskDtos = searcherInTheFieldJpa.getAllActiveTaskByAppUserId(jwtTokenProvider.extractAppUserId(authorizationHeader));
        return new ResponseEntity<>(taskDtos, HttpStatus.CREATED);
    }

    @PostMapping("/searcherInTheField/postNewAnimal")
    public HttpStatus postNewAnimal(@RequestBody AnimalDto animalDto, @RequestHeader("Authorization") String authorizationHeader) {
        searcherInTheFieldJpa.postNewAnimal(animalDto, jwtTokenProvider.extractAppUserId(authorizationHeader));
        return HttpStatus.CREATED;
    }

    @PutMapping("/searcherInTheField/putTaskCompleted/{taskId}")
    public HttpStatus putTaskCompleted(@PathVariable Long taskId, @RequestHeader("Authorization") String authorizationHeader) {
        searcherInTheFieldJpa.putTaskCompleted(taskId, jwtTokenProvider.extractAppUserId(authorizationHeader));
        return HttpStatus.OK;
    }

    @PutMapping("/searcherInTheField/putRemoveFromAction")
    public HttpStatus putRemoveFromAction(@RequestHeader("Authorization") String authorizationHeader) {
        searcherInTheFieldJpa.putRemoveFromAction(jwtTokenProvider.extractAppUserId(authorizationHeader));
        return HttpStatus.OK;
    }

    @PostMapping("/searcherInTheField/postAnimalComment/{actionId}/{animalId}")
    public HttpStatus postAnimalComment(@RequestBody AnimalCommentDto animalCommentDto, @PathVariable Long actionId, @PathVariable Long animalId, @RequestHeader("Authorization") String authorizationHeader) {
        animalServiceJpa.postAnimalComment(animalCommentDto, actionId, animalId, jwtTokenProvider.extractAppUserId(authorizationHeader));
        return HttpStatus.CREATED;
    }
}
