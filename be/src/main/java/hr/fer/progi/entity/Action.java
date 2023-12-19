package hr.fer.progi.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long actionId;
    private String actionName;
    private String actionType;
    private String locationName;
    @ManyToOne
    private AppUser appUser;
    @Embedded
    private SearchersRequest searchersRequest;

    public Action(String actionName, String actionType, String locationName) {
        this.actionName = actionName;
        this.actionType = actionType;
        this.locationName = locationName;
    }
}
