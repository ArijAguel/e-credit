package org.example.ecreditbackend.model;

import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;


import java.math.BigDecimal;
@Entity
@Table(name ="garantie" )
@Data
@NoArgsConstructor
public class Garantie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_garantie")

    private Integer idGarantie;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="id_demande",referencedColumnName = "id_demande")
    private Demande demande;
    private String nature;
    private String type;
    private BigDecimal valeur;

    private String devise;


}
