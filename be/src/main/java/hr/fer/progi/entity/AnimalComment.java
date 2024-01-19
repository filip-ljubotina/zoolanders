package hr.fer.progi.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class AnimalComment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long animalCommentId;

    private String comment;

    @ManyToOne
    private Animal animal;

    @ManyToOne
    private Action action;

    private String userName;
}
