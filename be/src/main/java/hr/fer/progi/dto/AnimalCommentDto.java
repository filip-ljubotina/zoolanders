package hr.fer.progi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnimalCommentDto {
    private Long animalCommentId;
    private String comment;
    private String userName;

    public AnimalCommentDto() {
    }

    public AnimalCommentDto(Long animalCommentId, String comment, String userName) {
        this.animalCommentId = animalCommentId;
        this.comment = comment;
        this.userName = userName;
    }
}
