package hr.fer.progi.dto.stationManagerDto;

public class AvailableSearcherDto {

    private Long searcherId;
    private String firstName;
    private String lastName;

    public AvailableSearcherDto(Long id, String firstName, String lastName) {
        this.searcherId = id;
        this.firstName = firstName;
        this.lastName = lastName;
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
}
