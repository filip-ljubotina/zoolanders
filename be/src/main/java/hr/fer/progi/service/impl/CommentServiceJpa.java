package hr.fer.progi.service.impl;

import hr.fer.progi.dto.AnimalCommentDto;
import hr.fer.progi.dto.MapCommentDto;
import hr.fer.progi.entity.Action;
import hr.fer.progi.entity.Animal;
import hr.fer.progi.entity.AnimalComment;
import hr.fer.progi.entity.MapComment;
import hr.fer.progi.mapper.AnimalCommentDtoMapper;
import hr.fer.progi.mapper.MapCommentDtoMapper;
import hr.fer.progi.repository.AnimalCommentRepository;
import hr.fer.progi.repository.MapCommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class CommentServiceJpa {
    private final AnimalCommentRepository animalCommentRepository;
    private final AnimalCommentDtoMapper animalCommentDtoMapper;
    private final MapCommentRepository mapCommentRepository;
    private final MapCommentDtoMapper mapCommentDtoMapper;

    public List<AnimalCommentDto> getAllAnimalComments (Action action, Animal animal) {
        return animalCommentRepository.findCommentsByActionAndAnimal(action, animal);
    }

    public void postAnimalComment (AnimalCommentDto animalCommentDto, Action action, Animal animal, String userName) {
        AnimalComment animalComment = animalCommentDtoMapper.dtoToClass(animalCommentDto, action, animal, userName);
        animalCommentRepository.save(animalComment);
    }

    public List<MapCommentDto> getAllMapComments (Action action) {
        return mapCommentRepository.findCommentsByAction(action);
    }

    public void postMapComment (MapCommentDto mapCommentDto, Action action, String userName) {
        validateCoordinates(mapCommentDto);
        MapComment mapComment = mapCommentDtoMapper.dtoToClass(mapCommentDto, action, userName);
        mapCommentRepository.save(mapComment);
    }

    public static void validateCoordinates(MapCommentDto mapCommentDto) {
        if (mapCommentDto == null || mapCommentDto.getCoordinates() == null) {
            throw new IllegalArgumentException("Coordinates cannot be null");
        }

        List<Double> coordinates = mapCommentDto.getCoordinates();

        for (Double coordinate : coordinates) {
            if (coordinate == null) {
                throw new IllegalArgumentException("Coordinate value cannot be null");
            }
        }
    }
}
