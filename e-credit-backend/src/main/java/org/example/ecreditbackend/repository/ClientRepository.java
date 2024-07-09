package org.example.ecreditbackend.repository;


import org.example.ecreditbackend.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Integer> {
    Client findByCin(Integer cin);
}