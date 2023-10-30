package com.sonidos_reservados.sonidos_reservados.controller;

import com.sonidos_reservados.sonidos_reservados.dto.CategoriaDto;
import com.sonidos_reservados.sonidos_reservados.dto.CategoriaRequest;
import com.sonidos_reservados.sonidos_reservados.dto.ProductoRequest;
import com.sonidos_reservados.sonidos_reservados.entity.Categoria;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import com.sonidos_reservados.sonidos_reservados.service.CategoriaService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    // Obtener todas las categorías
    @ApiOperation("Obtener todas las categorias")
    @GetMapping
    public List<CategoriaDto> listar() {
        return categoriaService.listar();
    }

    // Agregar una categoria
    @ApiOperation("Agregar una categoria")
    @PostMapping
    public ResponseEntity<?> agregar(@RequestParam("imagen") MultipartFile imagen, @ModelAttribute CategoriaRequest categoriaRequest) throws BadRequestException, ResourceNotFoundException {
        categoriaRequest.setImagen(imagen);
        return ResponseEntity.ok(categoriaService.agregar(categoriaRequest));
    }

    // Eliminar una categoria por ID
    @ApiOperation("Eliminar una categoria por Id")
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) throws ResourceNotFoundException, BadRequestException {
        categoriaService.eliminar(id);
    }
}