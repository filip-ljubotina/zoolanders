package hr.fer.progi.repository;

import hr.fer.progi.dto.AnimalCommentDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.Animal;
import hr.fer.progi.entity.AnimalComment;
import hr.fer.progi.entity.SearcherInTheField;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnimalCommentRepository extends JpaRepository<AnimalComment, Long> {

    @Query("SELECT new hr.fer.progi.dto.AnimalCommentDto(a.animalCommentId, a.comment, a.userName)" +
            " FROM AnimalComment a " +
            "WHERE a.action = :action AND a.animal = :animal")
    List<AnimalCommentDto> findCommentsByActionAndAnimal(@Param("action") Action action, @Param("animal")Animal animal);
}
