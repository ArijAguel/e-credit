package org.example.ecreditbackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "demande")
@Data
@NoArgsConstructor
public class Demande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_demande")

    private Integer idDemande;
    @OneToOne(cascade = CascadeType.ALL)
    private Client client;

    private String type;
    private String unite;
    private BigDecimal montant;
    @Column(name = "nbr_echeance")

    private BigDecimal nbrEcheance;
    private String observations;


}
