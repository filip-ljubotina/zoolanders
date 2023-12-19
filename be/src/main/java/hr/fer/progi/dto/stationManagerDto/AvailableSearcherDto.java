package hr.fer.progi.dto.stationManagerDto;

import hr.fer.progi.entity.enums.Qualification;

public class AvailableSearcherDto {

    private Long searcherId;
    private String firstName;
    private String lastName;
    private String qualification;

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

    public Long getId() {
        return searcherId;
    }

    public void setId(Long id) {
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
}
