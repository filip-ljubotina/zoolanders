package hr.fer.progi.jsonentities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class QualificationsJson {

    private List<String> qualifications;

    public QualificationsJson() {
    }

    public QualificationsJson(List<String> qualifications) {
        this.qualifications = qualifications;
    }

    @JsonProperty("qualifications")
    public List<String> getQualifications() {
        return qualifications;
    }

    public void setQualifications(List<String> qualifications) {
        this.qualifications = qualifications;
    }
}
