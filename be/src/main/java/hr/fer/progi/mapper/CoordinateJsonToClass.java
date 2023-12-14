package hr.fer.progi.mapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import hr.fer.progi.jsonentities.CoordinatesJson;
import org.springframework.stereotype.Component;

@Component
public class CoordinateJsonToClass {

    public CoordinatesJson mapper(String jsonString){
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(jsonString, CoordinatesJson.class);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
