package hr.fer.progi.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import hr.fer.progi.entity.enums.Qualification;
import hr.fer.progi.jsonentities.PositionCoordinates;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@TypeDef(name = "json", typeClass = JsonType.class)
public class SearcherInTheField {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long searcherInTheFieldId;
    @Enumerated(EnumType.STRING)
    private Qualification qualification;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private PositionCoordinates currentPosition;

    @OneToOne
    @JoinColumn(name = "user_id")
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station station;

    @ManyToOne
    @JoinColumn(name = "action_id")
    private Action action;
}