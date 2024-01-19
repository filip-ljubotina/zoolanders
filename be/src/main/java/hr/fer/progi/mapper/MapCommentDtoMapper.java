package hr.fer.progi.mapper;

import hr.fer.progi.dto.AnimalCommentDto;
import hr.fer.progi.dto.MapCommentDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.Animal;
import hr.fer.progi.entity.AnimalComment;
import hr.fer.progi.entity.MapComment;
import hr.fer.progi.jsonentities.PositionCoordinates;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MapCommentDtoMapper {

    public MapComment dtoToClass (MapCommentDto mapCommentDto, Action action, String userName) {
        MapComment mapComment = new MapComment();
        mapComment.setAction(action);
        PositionCoordinates positionCoordinates = new PositionCoordinates(mapCommentDto.getCoordinates());
        mapComment.setPositionCoordinates(positionCoordinates);
        mapComment.setUserName(userName);
        mapComment.setComment(mapCommentDto.getComment());
        return mapComment;
    }
}
