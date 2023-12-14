package com.sonidos_reservados.sonidos_reservados.jwtAuthController;

import com.sonidos_reservados.sonidos_reservados.User.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    Integer id;
    String username;
    String password;
    String firstname;
    String lastname;
    String email;
    Role role;
}
