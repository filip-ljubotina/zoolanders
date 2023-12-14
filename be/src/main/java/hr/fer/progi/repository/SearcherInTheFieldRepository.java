package hr.fer.progi.repository;

import hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto;
import hr.fer.progi.entity.AppUser;
import hr.fer.progi.entity.SearcherInTheField;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.naming.directory.SearchControls;
import java.util.List;

public interface SearcherInTheFieldRepository extends JpaRepository<SearcherInTheField, Long> {

    @Query("SELECT new hr.fer.progi.dto.stationManagerDto.AvailableSearcherDto(s.searcherInTheFieldId, s.appUser.firstName, s.appUser.lastName) " +
            "FROM SearcherInTheField s WHERE s.station IS NULL")
    List<AvailableSearcherDto> findAllAvailableSearchers();

    SearcherInTheField findByAppUser(AppUser appUser);
}
