package hr.fer.progi.dto.researcherDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AvailableQualificationsDto {
    private HashMap<String, List<String>> stationQualifications;
}
