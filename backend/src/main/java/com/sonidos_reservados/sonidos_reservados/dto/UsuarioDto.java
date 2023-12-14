package com.sonidos_reservados.sonidos_reservados.dto;

import com.sonidos_reservados.sonidos_reservados.User.Role;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UsuarioDto {
    Integer id;
    String username;
    String firstname;
    String lastname;
    String email;
    Role role;
}
