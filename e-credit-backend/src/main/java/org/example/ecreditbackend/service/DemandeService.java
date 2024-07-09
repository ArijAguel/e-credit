package org.example.ecreditbackend.service;
import org.example.ecreditbackend.model.Demande;


import java.util.List;

public interface DemandeService {
    Demande saveDemande(Demande demande);
    List<Demande> getDemandes();

    Demande getDemandeById(Integer idDemande);

    void deleteDemande(Integer idDemande);
    Demande updateDemande(Demande demande, Integer idDemande);
}
