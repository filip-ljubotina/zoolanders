package hr.fer.progi.dto.researcherDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class MapViewCriteriaDto {
    private String subject;
    private List<Object> checkedItems;
}
