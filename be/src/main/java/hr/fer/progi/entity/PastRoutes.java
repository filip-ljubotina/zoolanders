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
public class PastRoutes {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long pastRoutesId;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private RouteWaypoints routeWaypoints;

    @ManyToOne
    private Action action;

    @ManyToOne
    private SearcherInTheField searcherInTheField;
}
