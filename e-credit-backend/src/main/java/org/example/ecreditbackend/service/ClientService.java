package org.example.ecreditbackend.service;


import org.example.ecreditbackend.model.Client;

public interface ClientService {
    Client getClientByCin(Integer cin);

}
