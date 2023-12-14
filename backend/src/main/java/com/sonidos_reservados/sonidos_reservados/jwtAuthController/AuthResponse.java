package com.sonidos_reservados.sonidos_reservados.jwtAuthController;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    String token;
    Integer id;
    String username;
    String role;
    String firstname;
    String lastname;
    String email;
}
