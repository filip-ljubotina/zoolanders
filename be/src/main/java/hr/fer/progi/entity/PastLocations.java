package hr.fer.progi.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import hr.fer.progi.jsonentities.PositionCoordinates;
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
public class PastLocations {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long pastLocationId;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private PositionCoordinates positionCoordinates;

    @ManyToOne
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @ManyToOne
    private Action action;

    @ManyToOne
    @JoinColumn(
            name = "searcherId"
    )
    private SearcherInTheField searcherInTheField;
}