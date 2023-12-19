package hr.fer.progi.service.impl;

import hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto;
import hr.fer.progi.dto.stationManagerDto.ChosenSearcherDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.AppUser;
import hr.fer.progi.entity.SearcherInTheField;
import hr.fer.progi.entity.Station;
import hr.fer.progi.entity.enums.AppUserRole;
import hr.fer.progi.entity.enums.Qualification;
import hr.fer.progi.repository.SearcherInTheFieldRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<String> getDistinctQualificationsByStation(Station station) {
        List<Qualification> qualifications = searcherInTheFieldRepository.findDistinctQualificationsByStation(station);

        List<String> qualificationStrings = qualifications.stream()
                .map(Qualification::name)
                .collect(Collectors.toList());

        return qualificationStrings;
    }

    public List<AvailableSearcherDto> getAllAvailableSearchersForAction(Station station, List<Qualification> qualifications) {
        return searcherInTheFieldRepository.findAllAvailableSearchersForAction(station, qualifications);
    }

    public void putChosenSearcherForAction(AvailableSearcherDto availableSearcherDto, Action action) {
        Long searcherId = availableSearcherDto.getId();
        SearcherInTheField searcherInTheField = searcherInTheFieldRepository.findById(searcherId).get();
        searcherInTheField.setAction(action);
        searcherInTheFieldRepository.save(searcherInTheField);
    }
}

