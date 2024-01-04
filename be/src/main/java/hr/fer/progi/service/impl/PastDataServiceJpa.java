package hr.fer.progi.service.impl;

import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.SearcherInTheField;
import hr.fer.progi.jsonentities.PositionCoordinates;
import hr.fer.progi.jsonentities.RouteWaypoints;
import hr.fer.progi.mapper.PastDataMapper;
import hr.fer.progi.repository.PastLocationsRepository;
import hr.fer.progi.repository.PastRoutesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class PastDataServiceJpa {

    private final PastLocationsRepository pastLocationsRepository;
    private final PastRoutesRepository pastRoutesRepository;
    private final PastDataMapper pastDataMapper;

    public void searcherPastDataSave(SearcherInTheField searcherInTheField,  RouteWaypoints pastRouteWaypoints,
                                 PositionCoordinates pastCurrentPosition){
        pastLocationsRepository.save(pastDataMapper.searcherDataToNewPastLocations(searcherInTheField, pastCurrentPosition));
        pastRoutesRepository.save(pastDataMapper.searcherDataToNewPastRoutes(searcherInTheField, pastRouteWaypoints));
    }

    public void searcherPositionSave(SearcherInTheField searcherInTheField){
        pastLocationsRepository.save(pastDataMapper.searcherDataToNewPastLocations(searcherInTheField, searcherInTheField.getCurrentPosition()));
    }

}
