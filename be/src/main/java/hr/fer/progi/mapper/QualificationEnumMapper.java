package hr.fer.progi.mapper;

import hr.fer.progi.entity.enums.Qualification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class QualificationEnumMapper {

    public List<Qualification> qualificationStringToEnums(List<String> qualifications) {
        List<Qualification> qualificationList = new ArrayList<>();

        for (String qualification : qualifications) {
            try {
                Qualification enumValue = Qualification.valueOf(qualification);
                qualificationList.add(enumValue);
            } catch (IllegalArgumentException e) {
                System.err.println("Unknown qualification: " + qualification);
            }
        }

        return qualificationList;
    }
}
