package org.example.ecreditbackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;



import java.util.Date;
@Entity
@Table(name ="client")
@Data
@NoArgsConstructor
public class Client {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_client")
    private Integer idClient;
    private Integer cin;
    @Column(name = "num_compte")
    private Integer numCompte;
    private String nom;
    private String prenom;
    @Column(name = "date_naissance")

    private Date dateNaissance;
    @Column(name = "date_ouverture")

    private Date dateOuverture;
    private String devise;
    @Column(name = "situation_familiale")

    private String situationFamiliale;



}
