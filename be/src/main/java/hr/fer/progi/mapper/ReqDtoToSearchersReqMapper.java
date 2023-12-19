package hr.fer.progi.mapper;

import hr.fer.progi.entity.SearchersRequest;
import hr.fer.progi.entity.Station;
import hr.fer.progi.entity.enums.Qualification;
import hr.fer.progi.jsonentities.QualificationsJson;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ReqDtoToSearchersReqMapper {
    private final QualificationEnumMapper qualificationEnumMapper;
    private final JsonToClass jsonToClass;
    public ReqDtoToSearchersReqMapper(QualificationEnumMapper qualificationEnumMapper,
                                      JsonToClass jsonToClass) {
        this.qualificationEnumMapper = qualificationEnumMapper;
        this.jsonToClass = jsonToClass;
    }

    public SearchersRequest mapper(Station station, List<String> stringQualifications){
        QualificationsJson qualificationsJson = jsonToClass.listToQualificationJson(stringQualifications);
        SearchersRequest searchersRequest = new SearchersRequest();
        searchersRequest.setQualificationsJson(qualificationsJson);
        searchersRequest.setStation(station);
        return searchersRequest;
    }
}
