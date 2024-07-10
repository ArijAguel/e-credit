package org.example.ecreditbackend.repository;

import org.example.ecreditbackend.model.Demande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeRepository extends JpaRepository<Demande,Integer> {
}
