package org.example.ecreditbackend.service;

import lombok.AllArgsConstructor;
import org.example.ecreditbackend.model.Demande;
import org.example.ecreditbackend.repository.DemandeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class DemandeServiceImpl implements DemandeService {

    //@Autowired
    private final DemandeRepository demandeRepository;


    @Override
    public Demande saveDemande(Demande demande) {
        return demandeRepository.save(demande);

    }

    @Override
    public List<Demande> getDemandes() {
        List<Demande> listeDemandes = new ArrayList<>();
        demandeRepository.findAll().forEach(listeDemandes::add);
        return listeDemandes;
    }

    @Override
    public Demande getDemandeById(Integer idDemande) {
        return demandeRepository.findById(idDemande).orElseThrow();

    }

    @Override
    public void deleteDemande(Integer idDemande) {
         demandeRepository.deleteById(idDemande);

    }

    @Override
    public Demande updateDemande(Demande demande, Integer idDemande) {

       // demandeRepository.findById(idDemande).orElseThrow(()->new EntityNotFoundException());
        demande.setIdDemande(idDemande);
        return demandeRepository.save(demande);

    }


}