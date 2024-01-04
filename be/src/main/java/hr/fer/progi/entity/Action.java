package hr.fer.progi.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import hr.fer.progi.jsonentities.MapViewCriteria;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@TypeDef(name = "json", typeClass = JsonType.class)
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long actionId;
    private String actionName;
    private String actionType;
    private String locationName;
    @Type(type = "json")
    @Column(columnDefinition = "json")
    private MapViewCriteria mapViewCriteria;
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
