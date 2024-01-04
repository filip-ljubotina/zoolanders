package hr.fer.progi.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import hr.fer.progi.jsonentities.RouteWaypoints;
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
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long taskId;
    private String taskComment;
    private String taskToDo;
    private boolean completed = false;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private RouteWaypoints routeWaypoints;

    @ManyToOne
    private SearcherInTheField searcherInTheField;

    @ManyToOne
    private Action action;
}
