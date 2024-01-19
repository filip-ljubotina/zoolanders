package hr.fer.progi.mapper;

import hr.fer.progi.dto.AnimalCommentDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.Animal;
import hr.fer.progi.entity.AnimalComment;
import org.springframework.stereotype.Component;

@Component
public class AnimalCommentDtoMapper {

    public AnimalComment dtoToClass (AnimalCommentDto animalCommentDto, Action action, Animal animal, String userName) {
        AnimalComment animalComment = new AnimalComment();
        animalComment.setAction(action);
        animalComment.setAnimal(animal);
        animalComment.setUserName(userName);
        animalComment.setComment(animalCommentDto.getComment());
        return animalComment;
    }

}
