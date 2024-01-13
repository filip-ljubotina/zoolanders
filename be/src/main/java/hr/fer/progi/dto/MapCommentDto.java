package hr.fer.progi.dto;

import hr.fer.progi.jsonentities.PositionCoordinates;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MapCommentDto {
    private Long mapCommentId;
    private String comment;
    private String userName;
    private List<Double> coordinates;

    public MapCommentDto() {
    }

    public MapCommentDto(Long mapCommentId, String comment, String userName, Object positionCoordinatesObject) {
        this.mapCommentId = mapCommentId;
        this.comment = comment;
        this.userName = userName;
        PositionCoordinates positionCoordinatesClass = (PositionCoordinates) positionCoordinatesObject;
        this.coordinates = positionCoordinatesClass.getCoordinates();
    }
}
