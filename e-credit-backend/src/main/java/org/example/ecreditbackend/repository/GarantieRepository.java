package org.example.ecreditbackend.repository;

import org.example.ecreditbackend.model.Garantie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GarantieRepository extends CrudRepository<Garantie,Integer> {
}
