package hr.fer.progi.repository;

import hr.fer.progi.entity.AppUser;
import hr.fer.progi.entity.Station;
import hr.fer.progi.entity.StationManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StationManagerRepository extends JpaRepository<StationManager, Long> {
    Optional<StationManager> findByStation(Station station);

    @Query("SELECT s.station FROM StationManager s WHERE s.appUser = :appUser")
    Station findStationByUserId(@Param("appUser") AppUser appUser);

    StationManager findByAppUser(AppUser appUser);
}
