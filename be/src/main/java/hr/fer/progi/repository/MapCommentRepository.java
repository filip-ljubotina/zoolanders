package hr.fer.progi.repository;

import hr.fer.progi.dto.MapCommentDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.MapComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MapCommentRepository extends JpaRepository<MapComment, Long> {

    @Query("SELECT new hr.fer.progi.dto.MapCommentDto(m.mapCommentId, m.comment, m.userName, m.positionCoordinates)" +
            " FROM MapComment m " +
            "WHERE m.action = :action")
    List<MapCommentDto> findCommentsByAction(@Param("action") Action action);
}
