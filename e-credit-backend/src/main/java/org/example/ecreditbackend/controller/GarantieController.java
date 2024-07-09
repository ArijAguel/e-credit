package org.example.ecreditbackend.controller;

import lombok.AllArgsConstructor;
import org.example.ecreditbackend.model.Demande;
import org.example.ecreditbackend.model.Garantie;
import org.example.ecreditbackend.service.GarantieService;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class GarantieController {

    private final GarantieService garantisservice;

    @PostMapping("/save/garantie")
    public Garantie saveGarantie(@RequestBody Garantie garantie){
        return garantisservice.saveGarantie(garantie);

    }

    @PutMapping("/update/garantie/{idGarantie}")
    public Garantie updateGarantie(@RequestBody Garantie garantie, @PathVariable Integer idGarantie) {
        return garantisservice.updateGarantie(garantie,idGarantie);
    }


    @DeleteMapping("/delete/garantie/{idGarantie}")
    public void deleteDGarantie(@PathVariable Integer idGarantie) {
        garantisservice.deleteGarantie(idGarantie);
    }
}
