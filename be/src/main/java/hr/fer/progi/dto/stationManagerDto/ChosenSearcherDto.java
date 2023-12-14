package hr.fer.progi.dto.stationManagerDto;

public class ChosenSearcherDto {
    private long searcherId;
    private String qualification;

    public ChosenSearcherDto(long searcherId, String qualification) {
        this.searcherId = searcherId;
        this.qualification = qualification;
    }

    public long getSearcherId() {
        return searcherId;
    }

    public void setSearcherId(long searcherId) {
        this.searcherId = searcherId;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }
}
