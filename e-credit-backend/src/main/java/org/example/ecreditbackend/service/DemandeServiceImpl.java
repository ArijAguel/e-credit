package org.example.ecreditbackend.service;

import lombok.AllArgsConstructor;
import org.example.ecreditbackend.dto.DemandeDTO;
import org.example.ecreditbackend.model.Client;
import org.example.ecreditbackend.model.Demande;
import org.example.ecreditbackend.repository.DemandeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class DemandeServiceImpl implements DemandeService {

    //@Autowired
    private final DemandeRepository demandeRepository;

    private final ModelMapper modelMapper;


    @Override
    public Demande saveDemande(Demande demande) {
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