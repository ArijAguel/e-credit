package org.example.ecreditbackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="piece")
@Data
@NoArgsConstructor
public class Piece {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_piece")

    private Integer idPiece;
   @OneToOne(cascade = CascadeType.ALL)
    private Demande demande;

    private String doc1;
    private Boolean statut1;
    private Boolean obligatoire1;

    private String doc2;
    private Boolean statut2;
    private Boolean obligatoire2;



}
