package hr.fer.progi.repository;

import hr.fer.progi.dto.researcherDto.AnimalDto;
import hr.fer.progi.entity.Animal;
import hr.fer.progi.entity.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {

    @Query("SELECT DISTINCT a.breed FROM Animal a WHERE a.station = :station")

    List<String> findAllBreedsByStation(@Param("station") Station station);

    @Query("SELECT new hr.fer.progi.dto.researcherDto.AnimalDto(a.animalId, a.name, a.breed, a.description, a.currentPosition)" +
            " FROM Animal a " +
            "WHERE a.station = :station")
    List<AnimalDto> findAllAnimalsByStation(@Param("station") Station station);
}
