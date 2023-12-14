package com.sonidos_reservados.sonidos_reservados.repository;

import com.sonidos_reservados.sonidos_reservados.entity.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Long> {
}

