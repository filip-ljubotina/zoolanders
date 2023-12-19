package hr.fer.progi.entity;

import hr.fer.progi.entity.enums.Qualification;
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
public class SearcherInTheField {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long searcherInTheFieldId;
    @Enumerated(EnumType.STRING)
    private Qualification qualification;

    @OneToOne
    @JoinColumn(name = "user_id")
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(name = "station_id")
    private Station station;

    @ManyToOne
    private Action action;
}
