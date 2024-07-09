package org.example.ecreditbackend.repository;

import org.example.ecreditbackend.model.Demande;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeRepository extends CrudRepository<Demande,Integer> {
}
