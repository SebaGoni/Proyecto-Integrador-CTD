package com.sonidos_reservados.sonidos_reservados.controller;

import com.sonidos_reservados.sonidos_reservados.dto.ProductoDto;
import com.sonidos_reservados.sonidos_reservados.dto.ProductoRequest;
import com.sonidos_reservados.sonidos_reservados.entity.Producto;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import com.sonidos_reservados.sonidos_reservados.service.ProductoService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/productos")
public class ProductoController {
    @Autowired
    private ProductoService productoService;
    @Autowired
    private ProductoRequest productoRequest;

    // Obtener todos los productos
    @ApiOperation("Obtener todos los productos")
    @GetMapping
    public List<ProductoDto> listar() {
        return productoService.listar();
    }

    // Obtener un producto individual por ID
    @ApiOperation("Obtener un producto por ID")
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorID(@PathVariable Integer id) throws ResourceNotFoundException, BadRequestException {
        ProductoDto productoDto = productoService.obtener(id);
        return ResponseEntity.status(HttpStatus.OK).body(productoDto);
    }

    // Obtener un producto individual por Nombre
    @ApiOperation("Obtener un producto por Nombre")
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<List<ProductoDto>> buscarPorNombre(@PathVariable String nombre) throws ResourceNotFoundException {
        List<ProductoDto> productos = productoService.obtenerPorNombre(nombre);
        return ResponseEntity.status(HttpStatus.OK).body(productos);
    }

    // Crear un nuevo producto
    @ApiOperation("Crear un nuevo producto")
    @PostMapping
    public ResponseEntity<?> agregar(@RequestPart("imagen") MultipartFile imagenPortada, @RequestPart("imagenes") MultipartFile[] imagenes, @ModelAttribute ProductoRequest productoRequest) throws BadRequestException, ResourceNotFoundException {
        productoRequest.setImage(imagenPortada); // Agrega la imagen de la portada al productoRequest
        List<MultipartFile> imagenesList = Arrays.asList(imagenes);
        productoRequest.setImagenes(imagenesList); // Agrega la lista de imágenes al productoRequest
        return ResponseEntity.ok(productoService.agregar(productoRequest));
    }

    // Obtener productos de una categoria
    @ApiOperation("Obtener productos de una categoria")
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ProductoDto>> buscarProductosPorCategoria(@PathVariable String categoria) {
        return ResponseEntity.ok(productoService.buscarProductosPorCategoria(categoria));
    }

    // Eliminar un producto por ID
    @ApiOperation("Eliminar un producto por Id")
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) throws ResourceNotFoundException, BadRequestException {
        productoService.eliminar(id);
    }

    }
