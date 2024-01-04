package hr.fer.progi.mapper;

import hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto;
import hr.fer.progi.entity.SearcherInTheField;
import org.springframework.stereotype.Component;

@Component
public class AvailableSearcherDtoMapper {

    public AvailableSearcherDto searcherInTheFieldClassToDto(SearcherInTheField searcherInTheField){
        AvailableSearcherDto searcherDto = new AvailableSearcherDto();
        searcherDto.setSearcherId(searcherInTheField.getSearcherInTheFieldId());
        searcherDto.setFirstName(searcherInTheField.getAppUser().getFirstName());
        searcherDto.setLastName(searcherInTheField.getAppUser().getLastName());
        searcherDto.setQualification(searcherInTheField.getQualification().toString());
        searcherDto.setCurrentPosition(searcherInTheField.getCurrentPosition().getCoordinates());
        return searcherDto;
    }
}
