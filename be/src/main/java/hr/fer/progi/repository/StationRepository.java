package hr.fer.progi.repository;

import hr.fer.progi.entity.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StationRepository extends JpaRepository<Station, Long> {

    Station findByStationName(String stationName);

}
