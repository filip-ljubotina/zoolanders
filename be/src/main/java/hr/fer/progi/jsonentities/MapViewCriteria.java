package hr.fer.progi.jsonentities;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class MapViewCriteria {
    private String subject;
    private List<Object> checkedItems;

    public MapViewCriteria() {
    }

    public MapViewCriteria(String subject, List<Object> checkedItems) {
        this.subject = subject;
        this.checkedItems = checkedItems;
    }

    @JsonProperty("subject")
    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    @JsonProperty("checkedItems")
    public List<Object> getCheckedItems() {
        return checkedItems;
    }

    public void setCheckedItems(List<Object> checkedItems) {
        this.checkedItems = checkedItems;
    }
}

