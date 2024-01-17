package hr.fer.progi.repository;

import hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.AppUser;
import hr.fer.progi.entity.SearcherInTheField;
import hr.fer.progi.entity.Station;
import hr.fer.progi.entity.enums.Qualification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearcherInTheFieldRepository extends JpaRepository<SearcherInTheField, Long> {

    @Query("SELECT new hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto(s.searcherInTheFieldId, s.appUser.firstName, s.appUser.lastName) " +
            "FROM SearcherInTheField s WHERE s.station IS NULL")
    List<AvailableSearcherDto> findAllAvailableSearchers();

    SearcherInTheField findByAppUser(AppUser appUser);

    @Query("SELECT DISTINCT s.qualification FROM SearcherInTheField s WHERE s.action IS NULL AND s.station = :station")
    List<Qualification> findDistinctQualificationsByStation(@Param("station") Station station);

    @Query("SELECT new hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto(s.searcherInTheFieldId, s.appUser.firstName, s.appUser.lastName, s.qualification)" +
            " FROM SearcherInTheField s " +
            "WHERE s.action IS NULL AND s.station = :station AND s.qualification IN :qualifications")
    List<AvailableSearcherDto> findAllAvailableSearchersForAction(@Param("station") Station station, @Param("qualifications") List<Qualification> qualifications);

    @Query("SELECT new hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto(s.searcherInTheFieldId, s.appUser.firstName, s.appUser.lastName, s.qualification, s.currentPosition)" +
            " FROM SearcherInTheField s " +
            "WHERE s.action = :action")
    List<AvailableSearcherDto> findAllSearchersOnActionByAction(@Param("action") Action action);
}
