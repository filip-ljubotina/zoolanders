package hr.fer.progi.service.impl;

import hr.fer.progi.dto.researcherDto.PastAnimalLocationsDto;
import hr.fer.progi.dto.researcherDto.PastSearcherRoutesDto;
import hr.fer.progi.dto.researcherDto.PastSearcherLocationDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.Animal;
import hr.fer.progi.entity.SearcherInTheField;
import hr.fer.progi.jsonentities.MapViewCriteria;
import hr.fer.progi.jsonentities.PositionCoordinates;
import hr.fer.progi.jsonentities.RouteWaypoints;
import hr.fer.progi.mapper.PastDataMapper;
import hr.fer.progi.repository.PastLocationsRepository;
import hr.fer.progi.repository.PastRoutesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<PastSearcherRoutesDto> getPastSearcherRoutes (SearcherInTheField searcherInTheField, Action action){
        return pastRoutesRepository.findPastSearcherRoutesBySearcherAndAction(searcherInTheField, action);
    }

    public List<PastSearcherRoutesDto> getPastAllSearchersRoutesByAction(Action action) {
        return pastRoutesRepository.findPastAllSearcherRoutesByAction(action);
    }

    public List<PastSearcherLocationDto> getPastSearchersLocations (Action action){
        return pastLocationsRepository.findPastSearchersLocationsByAction(action);
    }

    public List<PastAnimalLocationsDto> getPastAnimalsLocations (Action action){
        MapViewCriteria mapViewCriteria = action.getMapViewCriteria();
        List<PastAnimalLocationsDto> pastAnimalLocationsDtos = pastLocationsRepository.findPastAnimalsLocationsByAction(action.getLocationName());

        if(mapViewCriteria.getSubject().equals("individual")){
            List<Long> animalIds = mapViewCriteria.getCheckedItems().stream()
                    .map(obj -> ((Number) obj).longValue())
                    .collect(Collectors.toList());

            return pastAnimalLocationsDtos.stream()
                    .filter(pastLocationDto -> containsAnimalId(pastLocationDto, animalIds))
                    .collect(Collectors.toList());
        }else{
            String breed = (String) mapViewCriteria.getCheckedItems().get(0);

            return pastAnimalLocationsDtos.stream()
                    .filter(pastLocationDto -> pastLocationDto.getBreed().equals(breed))
                    .collect(Collectors.toList());
        }
    }

    private static boolean containsAnimalId(PastAnimalLocationsDto location, List<Long> targetAnimalIds) {
        Long animalId = location.getAnimalId();
        for (Long targetId : targetAnimalIds) {
            if (targetId.equals(animalId)) {
                return true;
            }
        }
        return false;
    }

    public void animalPostitionSave(Animal animal) {
        pastLocationsRepository.save(pastDataMapper.animalDataToNewPastLocations(animal, animal.getCurrentPosition()));
    }


}
