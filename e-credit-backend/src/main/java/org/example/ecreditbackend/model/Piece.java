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
    @JoinColumn(name = "id_demande", referencedColumnName = "id_demande")
    private Demande demande;

    private Boolean cin;
    @Column(name = "cin_path")
    private String cinPath;

    private Boolean bulletin;
    @Column(name = "bulletin_path")
    private String bulletinPath;



}
