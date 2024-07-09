package org.example.ecreditbackend.service;

import org.example.ecreditbackend.model.Demande;
import org.example.ecreditbackend.model.Garantie;

public interface GarantieService {
    Garantie saveGarantie(Garantie garantie);
    Garantie updateGarantie(Garantie garantie, Integer idGarantie);
    void deleteGarantie(Integer idGarantie);



}
