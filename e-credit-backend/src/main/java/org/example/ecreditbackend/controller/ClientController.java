package org.example.ecreditbackend.controller;

import org.example.ecreditbackend.model.Client;
import org.example.ecreditbackend.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/cin/{cin}")
    public Client getClientByCin(@PathVariable Integer cin) {
        return clientService.getClientByCin(cin);
    }
}
