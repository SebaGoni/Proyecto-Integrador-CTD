package com.sonidos_reservados.sonidos_reservados.controller;

import com.sonidos_reservados.sonidos_reservados.dto.CaracteristicaDto;
import com.sonidos_reservados.sonidos_reservados.dto.CaracteristicaRequest;
import com.sonidos_reservados.sonidos_reservados.dto.CategoriaDto;
import com.sonidos_reservados.sonidos_reservados.dto.CategoriaRequest;
import com.sonidos_reservados.sonidos_reservados.entity.Caracteristica;
import com.sonidos_reservados.sonidos_reservados.entity.Producto;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import com.sonidos_reservados.sonidos_reservados.service.CaracteristicaService;
import com.sonidos_reservados.sonidos_reservados.service.CategoriaService;
import com.sonidos_reservados.sonidos_reservados.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@RestController
@RequestMapping("/caracteristicas")
public class CaracteristicaController {

    @Autowired
    private CaracteristicaService caracteristicaService;
    @Autowired
    private ProductoService productoService;

    // Obtener todas las caracteristicas
    @GetMapping
    public List<CaracteristicaDto> listar() {
        return caracteristicaService.listar();
    }

    // Agregar una caracteristica
    @PostMapping
    public ResponseEntity<?> agregar(@RequestParam("imagen") MultipartFile imagen, @ModelAttribute CaracteristicaRequest caracteristicaRequest) throws BadRequestException, ResourceNotFoundException {
        caracteristicaRequest.setImagen(imagen);
        return ResponseEntity.ok(caracteristicaService.agregar(caracteristicaRequest));
    }
    // Modificar una caracteristica
    @PutMapping("/{id}")
    public ResponseEntity<?> modificar(
            @PathVariable("id") Long id,
            @RequestParam(value = "image", required = false) MultipartFile imagen,
            @ModelAttribute CaracteristicaRequest caracteristicaRequest
    ) throws BadRequestException, ResourceNotFoundException {
        // Aquí podrías establecer el ID de la característica en el objeto CaracteristicaRequest
        // o realizar la lógica necesaria para la actualización

        // Modificar la lógica para enviar el ID y la información actualizada al servicio
        return ResponseEntity.ok(caracteristicaService.modificar(id, imagen, caracteristicaRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable("id") Long id) throws ResourceNotFoundException {
        caracteristicaService.eliminar(id);
        return ResponseEntity.ok("Característica eliminada correctamente");
    }

}

