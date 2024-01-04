package hr.fer.progi.repository;

import hr.fer.progi.entity.PastLocations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PastLocationsRepository extends JpaRepository<PastLocations, Long> {
}
