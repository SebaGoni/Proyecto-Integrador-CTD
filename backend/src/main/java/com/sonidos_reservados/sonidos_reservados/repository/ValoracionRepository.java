package com.sonidos_reservados.sonidos_reservados.repository;

import com.sonidos_reservados.sonidos_reservados.entity.Valoracion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ValoracionRepository extends JpaRepository<Valoracion, Long> {

    @Query("SELECT v FROM Valoracion v WHERE v.producto.id = :productoId")
    List<Valoracion> findByProductoId(@Param("productoId") Long productoId);

    @Query("SELECT v FROM Valoracion v WHERE v.usuario.id = :usuarioId")
    List<Valoracion> findByUsuarioId(@Param("usuarioId") Long usuarioId);



}
