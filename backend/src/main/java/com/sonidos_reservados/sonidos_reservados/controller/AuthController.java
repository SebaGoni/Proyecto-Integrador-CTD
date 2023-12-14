package com.sonidos_reservados.sonidos_reservados.controller;

import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.jwtAuthController.AuthResponse;
import com.sonidos_reservados.sonidos_reservados.jwtAuthController.AuthService;
import com.sonidos_reservados.sonidos_reservados.jwtAuthController.LoginRequest;
import com.sonidos_reservados.sonidos_reservados.jwtAuthController.RegisterRequest;
import com.sonidos_reservados.sonidos_reservados.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final EmailService emailService;

    //@CrossOrigin("http://localhost:5500")
    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) throws BadRequestException {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(value = "register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) throws Exception {

        AuthResponse registrationResponse = authService.register(request);

        // Verificar si el registro fue exitoso (presencia del token en la respuesta)
        if (registrationResponse.getToken() != null) {
            // Registro exitoso, enviar el correo de confirmación
            String loginLink = "http://sonidos-reservados-front.s3-website-us-east-1.amazonaws.com/login";
            emailService.sendConfirmationEmail(request.getEmail(), "Registro exitoso", "¡Hola " + request.getFirstname() + ", email: " + request.getEmail() + "!\n"
                    + "Tu registro en nuestro sitio web fue exitoso. Bienvenido a nuestra comunidad.\n"
                    + "Por favor, inicia sesión en el siguiente link: " + loginLink);
        }

        return ResponseEntity.ok(registrationResponse);
    }


    @PostMapping(value = "emailRegistro")
    public void reenvioEmailregistro(@RequestBody RegisterRequest request) throws Exception {
        String loginLink = "http://sonidos-reservados-front.s3-website-us-east-1.amazonaws.com/login";

        String mensaje = "¡Hola " + request.getFirstname() + ", email: " + request.getEmail() + "!\n"
                + "Tu registro en nuestro sitio web fue exitoso. Bienvenido a nuestra comunidad.\n"
                + "Por favor, inicia sesión en el siguiente link: " + loginLink;

        emailService.sendConfirmationEmail(request.getEmail(), "Este es un reenvío de confirmación de Registro exitoso", mensaje);
    }

}
