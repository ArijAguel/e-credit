package org.example.ecreditbackend.service;

import lombok.AllArgsConstructor;
import org.example.ecreditbackend.model.Demande;
import org.example.ecreditbackend.model.Garantie;
import org.example.ecreditbackend.repository.GarantieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class GarantieServiceImpl implements GarantieService{
    //@Autowired
    private final GarantieRepository garantieRepository;


    @Override
    public Garantie saveGarantie(Garantie garantie)
    {
        return garantieRepository.save(garantie);
    }

    @Override
    public Garantie updateGarantie(Garantie garantie, Integer idGarantie) {

        // demandeRepository.findById(idDemande).orElseThrow(()->new EntityNotFoundException());
        garantie.setIdGarantie(idGarantie);
        return garantieRepository.save(garantie);

    }

    @Override
    public void deleteGarantie(Integer idGarantie) {
        garantieRepository.deleteById(idGarantie);

    }
}
