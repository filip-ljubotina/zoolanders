package hr.fer.progi.repository;

import hr.fer.progi.dto.researcherDto.PastAnimalLocationsDto;
import hr.fer.progi.dto.researcherDto.PastSearcherLocationDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.PastLocations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PastLocationsRepository extends JpaRepository<PastLocations, Long> {

    @Query("SELECT new hr.fer.progi.dto.researcherDto.PastSearcherLocationDto(p.pastRoutesId, p.searcherInTheField.searcherInTheFieldId, p.searcherInTheField.appUser.userName, p.searcherInTheField.qualification,p.positionCoordinates)" +
            " FROM PastLocations p WHERE p.action = :action AND p.searcherInTheField IS NOT NULL")
    List<PastSearcherLocationDto> findPastSearchersLocationsByAction(@Param("action") Action action);

    @Query("SELECT new hr.fer.progi.dto.researcherDto.PastAnimalLocationsDto(p.pastRoutesId, p.animal.animalId, p.animal.name, p.animal.breed, p.positionCoordinates)" +
            " FROM PastLocations p WHERE p.animal IS NOT NULL AND p.animal.station.stationName = :locationName")
    List<PastAnimalLocationsDto> findPastAnimalsLocationsByAction(@Param("locationName") String locationName);
}
