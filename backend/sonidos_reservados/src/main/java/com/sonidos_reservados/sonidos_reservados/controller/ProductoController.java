package com.sonidos_reservados.sonidos_reservados.controller;

import com.sonidos_reservados.sonidos_reservados.dto.ProductoDto;
import com.sonidos_reservados.sonidos_reservados.dto.ProductoRequest;
import com.sonidos_reservados.sonidos_reservados.entity.Producto;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import com.sonidos_reservados.sonidos_reservados.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/productos")
public class ProductoController {
    @Autowired
    private ProductoService productoService;
    @Autowired
    private ProductoRequest productoRequest;

    // Obtener todos los productos
    @GetMapping
    public List<ProductoDto> listar() {
        return productoService.listar();
    }

    // Obtener un producto individual por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorID(@PathVariable Integer id) throws ResourceNotFoundException, BadRequestException {
        ProductoDto productoDto = productoService.obtener(id);
        return ResponseEntity.status(HttpStatus.OK).body(productoDto);
    }

    // Agregar un nuevo producto
    @PostMapping
    public ResponseEntity<?> agregar(@RequestParam("imagen") MultipartFile imagen, @ModelAttribute ProductoRequest productoRequest) throws BadRequestException, ResourceNotFoundException {
        productoRequest.setImagen(imagen);
        return ResponseEntity.ok(productoService.agregar(productoRequest));
        }

    // Obtener productos de una categoria
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ProductoDto>> buscarProductosPorCategoria(@PathVariable String categoria) {
        return ResponseEntity.ok(productoService.buscarProductosPorCategoria(categoria));
    }

    }
