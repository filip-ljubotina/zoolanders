package hr.fer.progi.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import hr.fer.progi.jsonentities.CoordinatesJson;
import hr.fer.progi.jsonentities.PositionCoordinates;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;

@Getter
@Setter
@Entity
@TypeDef(name = "json", typeClass = JsonType.class)
public class MapComment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long mapCommentId;

    private String comment;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private PositionCoordinates positionCoordinates;

    @ManyToOne
    private Action action;

    private String userName;
}
