package hr.fer.progi.dto.researcherDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class RequestDto {
    private Long actionId;
    private String stationName;
    private List<String> qualifications;

    public RequestDto() {
    }
}
