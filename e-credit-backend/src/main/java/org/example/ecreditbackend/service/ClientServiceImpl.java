package org.example.ecreditbackend.service.impl;

import org.example.ecreditbackend.model.Client;
import org.example.ecreditbackend.repository.ClientRepository;
import org.example.ecreditbackend.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public Client getClientByCin(Integer cin) {
        return clientRepository.findByCin(cin);
    }
}
