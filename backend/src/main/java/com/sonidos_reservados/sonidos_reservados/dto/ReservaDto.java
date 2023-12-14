package com.sonidos_reservados.sonidos_reservados.dto;

import com.sonidos_reservados.sonidos_reservados.enums.EstadoReserva;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
public class ReservaDto {
    private Long id;
    private ProductoDto producto;
    private UsuarioDto usuario;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private EstadoReserva estadoReserva;
}

