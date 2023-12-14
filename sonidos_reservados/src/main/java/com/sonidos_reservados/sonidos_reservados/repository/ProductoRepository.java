package com.sonidos_reservados.sonidos_reservados.repository;

import com.sonidos_reservados.sonidos_reservados.entity.Categoria;
import com.sonidos_reservados.sonidos_reservados.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    @Query("SELECT p FROM Producto p WHERE p.categoria.nombre = :categoriaNombre")
    List<Producto> findByCategoriaNombre(@Param("categoriaNombre") String categoriaNombre);

    @Query("SELECT p FROM Producto p WHERE p.categoria.id = :categoriaId")
    List<Producto> findByCategoriaId(@Param("categoriaId") Long categoriaId);

    @Query("SELECT p FROM Producto p WHERE p.title = :nombre")
    List<Producto> findAllByNombre(@Param("nombre") String nombre);

    @Query("SELECT p FROM Producto p WHERE p.title = :nombreProducto")
    Producto obtenerPorNombre(@Param("nombreProducto") String nombreProducto);

    @Query(value = "SELECT * FROM productos ORDER BY RAND() LIMIT :cantidad", nativeQuery = true)
    List<Producto> obtenerProductosAleatorios(@Param("cantidad") Integer cantidad);



}
