package org.example.ecreditbackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "demande")
@Data
@NoArgsConstructor
public class Demande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_demande")

    private Integer idDemande;

    private String type;
    private String unite;
    private BigDecimal montant;

    private BigDecimal nbrEcheance;
    private String observations;
    private String etatDemande ;
    private Date dateCre=new Date();
    @OneToMany(cascade = CascadeType.PERSIST,mappedBy = "demande",orphanRemoval = true)

    private List<Garantie> listeGaranties=new ArrayList<>();
    @OneToOne(cascade = CascadeType.ALL)
    private Client client;
    @OneToOne(cascade = CascadeType.ALL)
    private Piece pieceJointe;

}
