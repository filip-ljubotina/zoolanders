package hr.fer.progi.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import hr.fer.progi.jsonentities.CoordinatesJson;
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
public class Station {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stationId;
    private String stationName;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private CoordinatesJson coordinatesJson;

    public Station(String stationName, CoordinatesJson coordinatesJson) {
        this.stationName = stationName;
        this.coordinatesJson = coordinatesJson;
    }
}
