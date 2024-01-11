package hr.fer.progi.dto.researcherDto;

import hr.fer.progi.entity.enums.Qualification;
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
    private String qualification;
    private List<Double> pastLocation;

    public PastSearcherLocationDto() {
    }

    public PastSearcherLocationDto(Long pastLocationId, Long searcherId, String userName, Qualification qualificationEnum, Object pastLocationObject) {
        this.pastLocationId = pastLocationId;
        this.searcherId = searcherId;
        this.userName = userName;
        this.qualification = qualificationEnum.toString();
        PositionCoordinates positionCoordinates = (PositionCoordinates) pastLocationObject;
        this.pastLocation = positionCoordinates.getCoordinates();
    }
}
