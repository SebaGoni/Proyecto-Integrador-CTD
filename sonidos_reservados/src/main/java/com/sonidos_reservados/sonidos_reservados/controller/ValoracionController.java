package com.sonidos_reservados.sonidos_reservados.controller;

import com.sonidos_reservados.sonidos_reservados.dto.ValoracionDto;
import com.sonidos_reservados.sonidos_reservados.entity.Valoracion;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import com.sonidos_reservados.sonidos_reservados.service.ValoracionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/valoraciones")
public class ValoracionController {

    @Autowired
    private ValoracionService valoracionService;

    @PostMapping
    public ResponseEntity<?> agregarValoracion(@RequestBody Valoracion valoracion) {
        return valoracionService.agregarValoracion(valoracion);
    }

    @GetMapping("/producto/{productoId}")
    public ResponseEntity<List<ValoracionDto>> obtenerValoracionesPorProductoId(@PathVariable Long productoId) {
        return valoracionService.obtenerValoracionesPorProductoId(productoId);
    }

    @GetMapping("/usuario/{UsuarioId}")
    public ResponseEntity<List<ValoracionDto>> obtenerValoracionesPorUsuarioId(@PathVariable Long usuarioId) {
        return valoracionService.obtenerValoracionesPorUsuarioId(usuarioId);
    }

    @GetMapping
    public ResponseEntity<List<ValoracionDto>> obtenerTodasLasValoraciones() {
        return valoracionService.obtenerTodasLasValoraciones();
    }

    @DeleteMapping("/valoracion/{id}")
    public ResponseEntity<?> eliminarValoracionPorId(@PathVariable Long id) {
        try {
            valoracionService.eliminarValoracionPorId(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.notFound().build(); // Manejo de la excepción ResourceNotFoundException
        }
    }

}




