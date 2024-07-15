package org.example.ecreditbackend.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.example.ecreditbackend.dto.DemandeDTO;
import org.example.ecreditbackend.model.Client;
import org.example.ecreditbackend.model.Demande;
import org.example.ecreditbackend.model.Garantie;
import org.example.ecreditbackend.repository.DemandeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
@AllArgsConstructor
public class DemandeServiceImpl implements DemandeService {

    @Autowired
    private final DemandeRepository demandeRepository;

    private final ModelMapper modelMapper;


    @Override
    public Demande saveDemande(Demande demande) {
      /*  if (demande.getClient()!=null) {
            demande.getClient().setIdClient(null);
        }

        if (demande.getListeGaranties()!=null) {
            for (Garantie garantie: demande.getListeGaranties()){
                garantie.setDemande(demande);
                garantie.setIdGarantie(null);
            }
        }*/
        demande.getListeGaranties().forEach(g->{
            g.setDemande(demande);
        });

                return demandeRepository.save(demande);

}

    @Override
    public List<DemandeDTO> getDemandes() {

        List<Demande> demandes = demandeRepository.findAll();
        return demandes.stream()
                .map(this::convertToDemandeDTO)
                .toList();

    }
        private DemandeDTO convertToDemandeDTO(Demande demande) {
            DemandeDTO demandeDTO = modelMapper.map(demande, DemandeDTO.class);
            Client client = demande.getClient();
            demandeDTO.setNom(client.getNom()); // Assuming 'nom' is the attribute for the client's name in DemandeDTO
            return demandeDTO;
        }




    @Override
    public Demande getDemandeById(Integer idDemande) {
        Demande demande = demandeRepository.findById(idDemande).orElse(null);
        if (demande != null) {
            // Initialize the collection
            demande.getListeGaranties().size(); // This initializes the collection
        }
        return demande;
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
    @Override
    public List<Demande> getListeDemandes() {

        return   demandeRepository.findAll();


    }

}