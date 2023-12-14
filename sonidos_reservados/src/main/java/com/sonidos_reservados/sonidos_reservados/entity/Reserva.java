package com.sonidos_reservados.sonidos_reservados.entity;

import com.sonidos_reservados.sonidos_reservados.User.User;
import com.sonidos_reservados.sonidos_reservados.enums.EstadoReserva;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "reservas")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User usuario;

    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    @Enumerated(EnumType.STRING)
    private EstadoReserva estadoReserva;

}