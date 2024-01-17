package hr.fer.progi.dto.stationManagerDto;

import hr.fer.progi.entity.enums.Qualification;
import hr.fer.progi.jsonentities.PositionCoordinates;

import java.util.List;

public class AvailableSearcherDto {

    private Long searcherId;
    private String firstName;
    private String lastName;
    private String qualification;
    private List<Double> currentPosition;

    public AvailableSearcherDto() {
    }

    public AvailableSearcherDto(Long id, String firstName, String lastName) {
        this.searcherId = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public AvailableSearcherDto(Long id, String firstName, String lastName, Qualification qualificationEnum) {
        this.searcherId = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.qualification = qualificationEnum.toString();
    }

    public AvailableSearcherDto(Long searcherId, String firstName, String lastName, Qualification qualificationEnum, Object currentPositionObject) {
        this.searcherId = searcherId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.qualification = qualificationEnum.toString();
        PositionCoordinates positionCoordinates = (PositionCoordinates) currentPositionObject;
        this.currentPosition = positionCoordinates.getCoordinates();
    }

    public Long getSearcherId() {
        return searcherId;
    }

    public void setSearcherId(Long id) {
        this.searcherId = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public List<Double> getCurrentPosition() {
        return currentPosition;
    }

    public void setCurrentPosition(List<Double> currentPosition) {
        this.currentPosition = currentPosition;
    }
}
