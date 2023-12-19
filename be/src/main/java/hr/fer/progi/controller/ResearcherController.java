package hr.fer.progi.controller;

import hr.fer.progi.dto.researcherDto.ActionDto;
import hr.fer.progi.dto.researcherDto.AvailableQualificationsDto;
import hr.fer.progi.dto.researcherDto.RequestDto;
import hr.fer.progi.security.JwtTokenProvider;
import hr.fer.progi.service.impl.ResearcherServiceJpa;
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

    public ResearcherController(ResearcherServiceJpa researcherServiceJpa, JwtTokenProvider jwtTokenProvider) {
        this.researcherServiceJpa = researcherServiceJpa;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/researcher/postNewAction")
    public HttpStatus postNewAction(@RequestBody ActionDto actionDto, @RequestHeader("Authorization") String authorizationHeader) {
        researcherServiceJpa.postNewAction(actionDto, jwtTokenProvider.extractAppUserId(authorizationHeader));
        return HttpStatus.OK;
    }

    @GetMapping("/researcher/getAllActions")
    public ResponseEntity<List<ActionDto>> getAllActions(@RequestHeader("Authorization") String authorizationHeader) {
        List<ActionDto> actionDtos = researcherServiceJpa.getAllActions(jwtTokenProvider.extractAppUserId(authorizationHeader));
        return new ResponseEntity<>(actionDtos, HttpStatus.CREATED);
    }

    @GetMapping("/researcher/getAvailableStationQualifications")
    public ResponseEntity<AvailableQualificationsDto> getAvailableStationQualifications() {
        AvailableQualificationsDto availableQualificationsDto = researcherServiceJpa.getAvailableStationQualifications();
        return new ResponseEntity<>(availableQualificationsDto, HttpStatus.CREATED);
    }

    @PutMapping("/researcher/putNewRequest")
    public HttpStatus putNewRequest(@RequestBody RequestDto requestDto) {
        researcherServiceJpa.putNewRequest(requestDto);
        return HttpStatus.OK;
    }
}
