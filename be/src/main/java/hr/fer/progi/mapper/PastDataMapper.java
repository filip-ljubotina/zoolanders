package hr.fer.progi.mapper;

import hr.fer.progi.entity.Animal;
import hr.fer.progi.entity.PastLocations;
import hr.fer.progi.entity.PastRoutes;
import hr.fer.progi.entity.SearcherInTheField;
import hr.fer.progi.jsonentities.PositionCoordinates;
import hr.fer.progi.jsonentities.RouteWaypoints;
import org.springframework.stereotype.Component;

@Component
public class PastDataMapper {
    public PastLocations searcherDataToNewPastLocations(SearcherInTheField searcherInTheField, PositionCoordinates pastCurrentPosition){
        PastLocations pastLocations = new PastLocations();
        pastLocations.setPositionCoordinates(pastCurrentPosition);
        pastLocations.setAction(searcherInTheField.getAction());
        pastLocations.setSearcherInTheField(searcherInTheField);
        return pastLocations;
    }

    public PastLocations animalDataToNewPastLocations(Animal animal, PositionCoordinates pastCurrentPosition){
        PastLocations pastLocations = new PastLocations();
        pastLocations.setPositionCoordinates(pastCurrentPosition);
        pastLocations.setAnimal(animal);
        return pastLocations;
    }

    public PastRoutes searcherDataToNewPastRoutes(SearcherInTheField searcherInTheField, RouteWaypoints pastRouteWaypoints){
        PastRoutes pastRoutes = new PastRoutes();
        pastRoutes.setRouteWaypoints(pastRouteWaypoints);
        pastRoutes.setAction(searcherInTheField.getAction());
        pastRoutes.setSearcherInTheField(searcherInTheField);
        return pastRoutes;
    }
}
