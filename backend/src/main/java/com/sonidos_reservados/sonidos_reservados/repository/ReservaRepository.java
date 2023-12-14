package com.sonidos_reservados.sonidos_reservados.repository;

import com.sonidos_reservados.sonidos_reservados.entity.Producto;
import com.sonidos_reservados.sonidos_reservados.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByProductoAndFechaInicioBeforeAndFechaFinAfter(Producto producto, LocalDate fechaFin, LocalDate fechaInicio);

    List<Reserva> findByProducto(Producto producto);

    List<Reserva> findAllByUsuarioId(Integer idUsuario);

}
