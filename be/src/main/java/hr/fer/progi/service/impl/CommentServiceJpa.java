package hr.fer.progi.service.impl;

import hr.fer.progi.dto.AnimalCommentDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.Animal;
import hr.fer.progi.entity.AnimalComment;
import hr.fer.progi.mapper.CommentDtoMapper;
import hr.fer.progi.repository.ActionRepository;
import hr.fer.progi.repository.AnimalCommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class CommentServiceJpa {
    private final AnimalCommentRepository animalCommentRepository;
    private final CommentDtoMapper commentDtoMapper;

    public List<AnimalCommentDto> getAllAnimalComments (Action action, Animal animal) {
        return animalCommentRepository.findCommentsByActionAndAnimal(action, animal);
    }

    public void postAnimalComment (AnimalCommentDto animalCommentDto, Action action, Animal animal, String userName) {
        AnimalComment animalComment = commentDtoMapper.dtoToClass(animalCommentDto, action, animal, userName);
        animalCommentRepository.save(animalComment);
    }


}
