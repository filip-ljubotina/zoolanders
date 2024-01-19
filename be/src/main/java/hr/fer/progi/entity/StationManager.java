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
public class StationManager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stationMangaerId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station station;
}