package hr.fer.progi.service.impl;

import hr.fer.progi.dto.MapCommentDto;
import hr.fer.progi.entity.Action;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import hr.fer.progi.repository.ActionRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class ActionServiceJpa {

    private final ActionRepository actionRepository;
    private final CommentServiceJpa commentServiceJpa;
    private final AppUserServiceJpa appUserServiceJpa;

    public List<MapCommentDto> getAllMapComments (Long actionId) {
        Action action = actionRepository.findById(actionId).get();
        return commentServiceJpa.getAllMapComments(action);
    }

    public void postMapComment (MapCommentDto mapCommentDto, Long actionId, Long appUserId) {
        Action action = actionRepository.findById(actionId).get();
        String userName = appUserServiceJpa.findById(appUserId).getUsername();
        commentServiceJpa.postMapComment(mapCommentDto, action, userName);
    }
}
