package com.sonidos_reservados.sonidos_reservados.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
public class ValoracionDto{
        private Long id;
        private ReservaDto reserva;
        private int rating;
        private String comentario;
        private LocalDateTime timestamp;
}
