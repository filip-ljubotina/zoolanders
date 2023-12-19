package hr.fer.progi.dto.researcherDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActionDto {
    private Long actionId;
    private String actionName;
    private String actionType;
    private String locationName;

    public ActionDto() {
    }

    public ActionDto(Long actionId, String actionName, String actionType, String locationName) {
        this.actionId = actionId;
        this.actionName = actionName;
        this.actionType = actionType;
        this.locationName = locationName;
    }
}
