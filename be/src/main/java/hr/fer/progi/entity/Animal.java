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
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@TypeDef(name = "json", typeClass = JsonType.class)
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long animalId;

    private String name;

    private String breed;

    private String description;

    private byte[] image;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private PositionCoordinates currentPosition;

    @ManyToOne
    private Station station;

    @OneToMany(mappedBy = "animal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PastLocations> pastLocations;

    public Animal(String name, String breed, String description,
                  PositionCoordinates currentPosition, Station station) {
        this.name = name;
        this.breed = breed;
        this.description = description;
        this.currentPosition = currentPosition;
        this.station = station;
    }
}