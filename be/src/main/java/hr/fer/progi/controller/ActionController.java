package hr.fer.progi.controller;

import hr.fer.progi.dto.AnimalCommentDto;
import hr.fer.progi.dto.MapCommentDto;
import hr.fer.progi.service.impl.ActionServiceJpa;
import hr.fer.progi.service.impl.AnimalServiceJpa;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/wildTrack")
public class ActionController {

    private final ActionServiceJpa actionServiceJpa;

    public ActionController(ActionServiceJpa actionServiceJpa) {
        this.actionServiceJpa = actionServiceJpa;
    }

    @GetMapping("/animal/getAllMapComments/{actionId}")
    public ResponseEntity<List<MapCommentDto>> getAllMapComments(@PathVariable Long actionId) {
        List<MapCommentDto> allMapComments = actionServiceJpa.getAllMapComments(actionId);
        return new ResponseEntity<>(allMapComments, HttpStatus.OK);
    }

}
