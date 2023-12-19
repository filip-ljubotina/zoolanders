package hr.fer.progi.mapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import hr.fer.progi.jsonentities.CoordinatesJson;
import hr.fer.progi.jsonentities.QualificationsJson;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JsonToClass {

    public CoordinatesJson mapper(String jsonString){
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(jsonString, CoordinatesJson.class);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public QualificationsJson listToQualificationJson(List<String> stringQualifications){
        return new QualificationsJson(stringQualifications);
    }
}
