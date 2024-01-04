package hr.fer.progi.repository;

import hr.fer.progi.entity.PastRoutes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PastRoutesRepository extends JpaRepository<PastRoutes, Long> {
}
