package com.sonidos_reservados.sonidos_reservados.jwtAuthController;

import com.sonidos_reservados.sonidos_reservados.User.Role;
import com.sonidos_reservados.sonidos_reservados.User.User;
import com.sonidos_reservados.sonidos_reservados.User.UserRepository;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.jwt.JwtService;
import com.sonidos_reservados.sonidos_reservados.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    public final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) throws BadRequestException {
        if (request.getUsername() == null || request.getUsername().isEmpty() || request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new BadRequestException("1053", "El nombre de usuario y la contraseña son obligatorios.");
        }

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        } catch (AuthenticationException ex) {
            // Si la autenticación falla, puedes lanzar una excepción con un mensaje de error
            throw new BadRequestException("1054", "Email o contraseña incorrectos.");
        }

        UserDetails user=userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token= jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .id(((User) user).getId())
                .username(user.getUsername())
                .role(((User) user).getRole().toString())
                .firstname(((User) user).getFirstname())
                .lastname(((User) user).getLastname())
                .email(((User) user).getEmail())
                .build();
    }

    public AuthResponse register(RegisterRequest request) throws BadRequestException {

        if (userRepository.findByUsername(request.getUsername()).isEmpty()) {

            User user = User.builder()
                    .id(request.getId())
                    .username(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .role(request.getRole())
                    .build();

            userRepository.save(user);


            return AuthResponse.builder()
                    .token(jwtService.getToken(user))
                    .username(user.getUsername())
                    .role(((User) user).getRole().toString())
                    .id(((User) user).getId())
                    .firstname(((User) user).getFirstname())
                    .lastname(((User) user).getLastname())
                    .email(((User) user).getEmail())
                    .build();

        } else {
            throw new BadRequestException("1050", "Ya existe un usuario con ese email.");
        }
    }

}