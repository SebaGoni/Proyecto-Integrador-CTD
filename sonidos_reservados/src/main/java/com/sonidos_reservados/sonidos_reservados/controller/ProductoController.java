package com.sonidos_reservados.sonidos_reservados.controller;

import com.sonidos_reservados.sonidos_reservados.dto.ProductoDto;
import com.sonidos_reservados.sonidos_reservados.dto.ProductoRequest;
import com.sonidos_reservados.sonidos_reservados.entity.Caracteristica;
import com.sonidos_reservados.sonidos_reservados.entity.Producto;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import com.sonidos_reservados.sonidos_reservados.service.CaracteristicaService;
import com.sonidos_reservados.sonidos_reservados.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
@RestController
@RequestMapping("productos")
public class ProductoController {
    @Autowired
    private ProductoService productoService;
    @Autowired
    private ProductoRequest productoRequest;
    @Autowired
    private CaracteristicaService caracteristicaService;

    // Obtener todos los productos
    @GetMapping
    public List<ProductoDto> listar() {
        return productoService.listar();
    }

    // Obtener un producto individual por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorID(@PathVariable Long id) throws ResourceNotFoundException, BadRequestException {
        ProductoDto productoDto = productoService.obtener(id);
        return ResponseEntity.status(HttpStatus.OK).body(productoDto);
    }

    // Obtener un producto individual por Nombre
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<List<ProductoDto>> buscarPorNombre(@PathVariable String nombre) throws ResourceNotFoundException {
        List<ProductoDto> productos = productoService.obtenerPorNombre(nombre);
        return ResponseEntity.status(HttpStatus.OK).body(productos);
    }

    // Crear un nuevo producto
    @PostMapping
    public ResponseEntity<?> agregar(@RequestPart("imagen") MultipartFile imagenPortada, @RequestPart("imagenes") MultipartFile[] imagenes, @ModelAttribute ProductoRequest productoRequest, @RequestParam("caracteristicas") List<Long> caracteristicasIds) throws BadRequestException, ResourceNotFoundException {
        productoRequest.setImage(imagenPortada); // Agrega la imagen de la portada al productoRequest
        List<MultipartFile> imagenesList = Arrays.asList(imagenes);
        productoRequest.setImagenes(imagenesList); // Agrega la lista de imágenes al productoRequest

        // Obtener las características por sus IDs
        List<Caracteristica> caracteristicas = caracteristicaService.obtenerCaracteristicasPorIds(caracteristicasIds);
        // Asociar las características al producto
        productoRequest.setCaracteristicas(caracteristicas);

        return ResponseEntity.ok(productoService.agregar(productoRequest));
    }

    // Obtener productos de una categoria
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ProductoDto>> buscarProductosPorCategoria(@PathVariable String categoria) {
        return ResponseEntity.ok(productoService.buscarProductosPorCategoria(categoria));
    }

    // Eliminar un producto por ID
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) throws ResourceNotFoundException, BadRequestException {
        productoService.eliminar(id);
    }

    @PutMapping("/{id}")
    public ProductoDto actualizarProducto(
            @PathVariable Long id,
            @RequestParam(value = "title", required = false) String nuevoTitulo,
            @RequestParam(value = "price", required = false) Double nuevoPrecio,
            @RequestParam(value = "description", required = false) String nuevaDescripcion,
            @RequestParam(value = "categoriaId", required = false) Long nuevaCategoria,
            @RequestPart(name = "imagen", required = false) MultipartFile imagenPortada,
            @RequestPart(name = "imagenes", required = false) MultipartFile[] imagenes,
            @RequestParam(value = "caracteristicas", required = false) List<Long> nuevaCaracteristicaIds) throws ResourceNotFoundException, BadRequestException {

        // Crear un objeto ProductoRequest para manejar los detalles del producto
        ProductoRequest productoRequest = new ProductoRequest();
        productoRequest.setTitle(nuevoTitulo);
        productoRequest.setPrice(nuevoPrecio);
        productoRequest.setDescription(nuevaDescripcion);
        productoRequest.setCategoriaId(nuevaCategoria);
        productoRequest.setImage(imagenPortada);

        // Si hay imágenes, agregarlas al ProductoRequest
        if (imagenes != null && imagenes.length > 0) {
            productoRequest.setImagenes(Arrays.asList(imagenes));
        }

        // Obtener las características por sus IDs
        List<Caracteristica> caracteristicas = caracteristicaService.obtenerCaracteristicasPorIds(nuevaCaracteristicaIds);
        // Asociar las características al producto
        productoRequest.setCaracteristicas(caracteristicas);


        // Actualizar los detalles del producto
        ProductoDto productoActualizado = productoService.modificar(id, productoRequest);

        return productoActualizado;
    }


    // Obtener productos por palabras clave en el nombre
    @GetMapping("/buscar")
    public ResponseEntity<List<ProductoDto>> buscarPorPalabrasClave(@RequestParam("palabrasClave") List<String> palabrasClave) {
        List<ProductoDto> productos = productoService.buscarPorPalabrasClave(palabrasClave);
        return ResponseEntity.status(HttpStatus.OK).body(productos);
    }

    // Obtener productos aleatorios. Definir la cantidad
    @GetMapping("/aleatorios")
    public List<ProductoDto> obtenerProductosAleatorios(@RequestParam(name = "cantidad", defaultValue = "3") int cantidad) {
        return productoService.obtenerProductosAleatorios(cantidad);
    }

    }


