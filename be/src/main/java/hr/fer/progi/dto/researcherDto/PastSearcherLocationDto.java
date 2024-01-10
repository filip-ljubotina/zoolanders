package hr.fer.progi.dto.researcherDto;

import hr.fer.progi.jsonentities.PositionCoordinates;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PastSearcherLocationDto {
    private Long pastLocationId;
    private Long searcherId;
    private String userName;
    private List<Double> pastLocation;

    public PastSearcherLocationDto() {
    }

    public PastSearcherLocationDto(Long pastLocationId, Long searcherId, String userName, Object pastLocationObject) {
        this.pastLocationId = pastLocationId;
        this.searcherId = searcherId;
        this.userName = userName;
        PositionCoordinates positionCoordinates = (PositionCoordinates) pastLocationObject;
        this.pastLocation = positionCoordinates.getCoordinates();
    }
}
