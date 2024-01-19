package hr.fer.progi.repository;

import hr.fer.progi.dto.researcherDto.ActionDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.AppUser;
import hr.fer.progi.entity.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActionRepository extends JpaRepository<Action, Long> {

    @Query("SELECT new hr.fer.progi.dto.researcherDto.ActionDto(a.actionId, a.actionName, a.actionType, a.locationName) " +
            "FROM Action a WHERE a.appUser = :appUser")
    List<ActionDto> findAllActions(AppUser appUser);

    List<Action> findBySearchersRequest_Station(Station station);
}
