package hr.fer.progi.service.impl;

import hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto;
import hr.fer.progi.dto.stationManagerDto.ChosenSearcherDto;
import hr.fer.progi.entity.AppUser;
import hr.fer.progi.entity.SearcherInTheField;
import hr.fer.progi.entity.Station;
import hr.fer.progi.entity.enums.AppUserRole;
import hr.fer.progi.entity.enums.Qualification;
import hr.fer.progi.repository.SearcherInTheFieldRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SearcherInTheFieldJpa {

    private final SearcherInTheFieldRepository searcherInTheFieldRepository;

    public void createSearcherInTheField(AppUser appUser){
        SearcherInTheField searcherInTheField = new SearcherInTheField();
        searcherInTheField.setAppUser(appUser);
        searcherInTheFieldRepository.save(searcherInTheField);
    }

    public List<AvailableSearcherDto> getAllAvailableSearchers() {
        return searcherInTheFieldRepository.findAllAvailableSearchers();
    }

    public void updateChosenSearcher(ChosenSearcherDto chosenSearcherDto, Station station){
        Qualification qualification = Qualification.valueOf(chosenSearcherDto.getQualification());
        Long searcherId = chosenSearcherDto.getSearcherId();
        SearcherInTheField searcherInTheField = searcherInTheFieldRepository.findById(searcherId).get();
        searcherInTheField.setQualification(qualification);
        searcherInTheField.setStation(station);
        searcherInTheFieldRepository.save(searcherInTheField);
    }
}

