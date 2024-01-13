package hr.fer.progi.repository;

import hr.fer.progi.dto.researcherDto.PastSearcherLocationDto;
import hr.fer.progi.dto.researcherDto.PastSearcherRoutesDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.PastRoutes;
import hr.fer.progi.entity.SearcherInTheField;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PastRoutesRepository extends JpaRepository<PastRoutes, Long> {
    @Query("SELECT new hr.fer.progi.dto.researcherDto.PastSearcherRoutesDto(p.pastRoutesId, p.searcherInTheField.searcherInTheFieldId, p.routeWaypoints, p.searcherInTheField.qualification)" +
            " FROM PastRoutes p WHERE p.searcherInTheField = :searcherInTheField AND p.action = :action")
    List<PastSearcherRoutesDto> findPastSearcherRoutesBySearcherAndAction(@Param("searcherInTheField") SearcherInTheField searcherInTheField,@Param("action") Action action);

    @Query("SELECT new hr.fer.progi.dto.researcherDto.PastSearcherRoutesDto(p.pastRoutesId, p.searcherInTheField.searcherInTheFieldId, p.routeWaypoints, p.searcherInTheField.qualification)" +
            " FROM PastRoutes p WHERE p.action = :action")
    List<PastSearcherRoutesDto> findPastAllSearcherRoutesByAction(@Param("action") Action action);
}
