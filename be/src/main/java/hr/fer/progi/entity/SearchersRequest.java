package hr.fer.progi.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import hr.fer.progi.jsonentities.QualificationsJson;
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
@Embeddable
@TypeDef(name = "json", typeClass = JsonType.class)
public class SearchersRequest {
    @OneToOne
    private Station station;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private QualificationsJson qualificationsJson;

    public SearchersRequest(Station station, QualificationsJson qualificationsJson) {
        this.station = station;
        this.qualificationsJson = qualificationsJson;
    }
}
