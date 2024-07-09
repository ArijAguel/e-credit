package org.example.ecreditbackend.controller;

import lombok.AllArgsConstructor;
import org.example.ecreditbackend.model.Demande;
import org.example.ecreditbackend.service.DemandeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*") // Remplacez par votre URL Angular

public class DemandeController {
    private final DemandeService demandeService;

    @PostMapping("/save/demande")
    public Demande saveDemande(@RequestBody Demande demande) {
        return demandeService.saveDemande(demande);

    }

    @GetMapping("/get/demandes")
    public List<Demande> getDemandes() {
        return demandeService.getDemandes();
    }

    @GetMapping("/get/demande/{idDemande}")
    public Demande getDemandeById(@PathVariable Integer idDemande) {
        return demandeService.getDemandeById(idDemande);
    }


    @DeleteMapping("/delete/demande/{idDemande}")
    public void deleteDemande(@PathVariable Integer idDemande) {
        demandeService.deleteDemande(idDemande);
    }

    @PutMapping("/update/demande/{idDemande}")
    public Demande updateDemande(@RequestBody Demande demande, @PathVariable Integer idDemande) {
        return demandeService.updateDemande(demande,idDemande);
    }

}





