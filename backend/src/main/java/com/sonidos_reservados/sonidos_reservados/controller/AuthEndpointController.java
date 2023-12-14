package com.sonidos_reservados.sonidos_reservados.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthEndpointController {

    @PostMapping(value = "demo")
    public String welcome()
    {
        return "welcome from secure endpoint";
    }
}
