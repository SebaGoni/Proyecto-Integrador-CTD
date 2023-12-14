package com.sonidos_reservados.sonidos_reservados.controller;

import com.sonidos_reservados.sonidos_reservados.dto.CategoriaDto;
import com.sonidos_reservados.sonidos_reservados.dto.CategoriaRequest;
import com.sonidos_reservados.sonidos_reservados.dto.ProductoRequest;
import com.sonidos_reservados.sonidos_reservados.entity.Categoria;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import com.sonidos_reservados.sonidos_reservados.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("categorias")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    // Obtener todas las categorías
    @GetMapping
    public List<CategoriaDto> listar() {
        return categoriaService.listar();
    }

    // Agregar una categoria
    @PostMapping
    public ResponseEntity<?> agregar(@RequestParam("image") MultipartFile imagen, @ModelAttribute CategoriaRequest categoriaRequest) throws BadRequestException, ResourceNotFoundException {
        categoriaRequest.setImage(imagen);
        return ResponseEntity.ok(categoriaService.agregar(categoriaRequest));
    }

    // Eliminar una categoria por ID
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) throws ResourceNotFoundException, BadRequestException {
        categoriaService.eliminar(id);
    }

    // Modificar una categoría por ID
    @PutMapping("/{id}")
    public ResponseEntity<?> modificar(
            @PathVariable Long id,
            @RequestParam(value = "nombre", required = false) String nuevoNombre, // Nombre de la categoría (opcional)
            @RequestParam(value = "image", required = false) MultipartFile nuevaImagen // Imagen de la categoría (opcional)
    ) throws ResourceNotFoundException, BadRequestException {
        return ResponseEntity.ok(categoriaService.modificar(id, nuevoNombre, nuevaImagen));
    }
}