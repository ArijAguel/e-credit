package org.example.ecreditbackend.dto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.OneToOne;
import lombok.Data;
import org.example.ecreditbackend.model.Client;

import java.math.BigDecimal;
import java.util.Date;
@Data
public class DemandeDTO
{
    private Integer idDemande;

   private String nom;
    private String etatDemande;
    private Date dateCre;

    private String type;





}
