package com.sonidos_reservados.sonidos_reservados.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sonidos_reservados.sonidos_reservados.dto.ProductoDto;
import com.sonidos_reservados.sonidos_reservados.dto.ProductoRequest;
import com.sonidos_reservados.sonidos_reservados.entity.Categoria;
import com.sonidos_reservados.sonidos_reservados.entity.Producto;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import com.sonidos_reservados.sonidos_reservados.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    ObjectMapper mapper;
    @Autowired
    private AmazonS3Service amazonS3Service;
    @Autowired
    private CategoriaService categoriaService;

    public List<ProductoDto> listar() {
        List<Producto> listaProductos = productoRepository.findAll();
        return listaProductos
                .stream()
                .map(producto -> mapper.convertValue(producto, ProductoDto.class))
                .collect(Collectors.toList());
    }

    public ProductoDto obtener(Integer id) throws ResourceNotFoundException {
        Optional<Producto> producto = productoRepository.findById(id);
        if (producto.isPresent()) {
            return mapper.convertValue(producto.get(), ProductoDto.class);
        } else {
            throw new ResourceNotFoundException("1011", "Producto no encontrado");
        }
    }

    public List<ProductoDto> obtenerPorNombre(String nombre) throws ResourceNotFoundException {
        List<Producto> productos = productoRepository.findAllByNombre(nombre);

        if (productos.isEmpty()) {
            throw new ResourceNotFoundException("1011", "No se encontraron productos con el nombre: " + nombre);
        }

        // Mapear los productos encontrados a DTOs
        return productos.stream()
                .map(producto -> mapper.convertValue(producto, ProductoDto.class))
                .collect(Collectors.toList());
    }


    public List<ProductoDto> buscarProductosPorCategoria(String categoria) {

        List<Producto> listaProductos = productoRepository.findByCategoriaNombre(categoria);
        return listaProductos
                .stream()
                .map(producto -> mapper.convertValue(producto, ProductoDto.class))
                .collect(Collectors.toList());
    }


    /*public ProductoDto agregar(ProductoRequest productoRequest) throws BadRequestException, ResourceNotFoundException {
        Long categoriaId = productoRequest.getCategoriaId();
        Categoria categoria = categoriaService.obtenerPorId(categoriaId);

        if (categoria == null) {
            throw new BadRequestException("1010", "No existe la categoria");
        }

        String nombreProducto = productoRequest.getTitle();
        Producto productoExistente = productoRepository.obtenerPorNombre(nombreProducto);

        if (productoExistente != null) {
            throw new BadRequestException("1011", "Ya existe un producto con el mismo nombre");
        }
        // Crear un producto y establecer sus propiedades
        Producto producto = new Producto();
        producto.setTitle(productoRequest.getTitle());
        producto.setPrice(productoRequest.getPrice());
        producto.setCategoria(categoria);
        producto.setDescription(productoRequest.getDescription());

        // Obtener el nombre de la categoría
        String categoriaNombre = producto.getCategoria().getNombre();

        // Crear una lista para almacenar las URLs de las imágenes
        List<String> imageUrls = new ArrayList<>();

        // Procesar y guardar las imágenes en la lista
        if (productoRequest.getImagenes() != null) {
            for (MultipartFile imagen : productoRequest.getImagenes()) {
                String imageUrl = amazonS3Service.subirImagen(imagen, categoriaNombre);
                imageUrls.add(imageUrl);
            }
        }
        // Establecer la lista de URLs de imágenes en el producto
        producto.setImagenes(imageUrls);

        if (productoRequest.getImage() != null) {
            String imagenPortadaUrl = amazonS3Service.subirImagen(productoRequest.getImage(), categoriaNombre);

            // Establecer la URL de la imagen de portada del producto
            producto.setImage(imagenPortadaUrl);
        }
        // Guardar el producto en la base de datos
        productoRepository.save(producto);

        // Devolver el producto creado
        return mapper.convertValue(producto, ProductoDto.class);
    }*/

    public ProductoDto agregar(ProductoRequest productoRequest) throws BadRequestException, ResourceNotFoundException {
        Long categoriaId = productoRequest.getCategoriaId();
        Categoria categoria = categoriaService.obtenerPorId(categoriaId);

        if (categoria == null) {
            throw new BadRequestException("1010", "No existe la categoría");
        }

        String nombreProducto = productoRequest.getTitle();
        Producto productoExistente = productoRepository.obtenerPorNombre(nombreProducto);

        if (productoExistente != null) {
            throw new BadRequestException("1011", "Ya existe un producto con el mismo nombre");
        }

        // Crear un producto y establecer sus propiedades
        Producto producto = new Producto();
        producto.setTitle(productoRequest.getTitle());
        producto.setPrice(productoRequest.getPrice());
        producto.setCategoria(categoria);
        producto.setDescription(productoRequest.getDescription());

        // Obtener el nombre de la categoría
        String categoriaNombre = categoria.getNombre();

        // Crear una lista para almacenar las URLs de las imágenes
        List<String> imageUrls = new ArrayList<>();

        // Procesar y guardar las imágenes en la lista
        if (productoRequest.getImagenes() != null) {
            for (MultipartFile imagen : productoRequest.getImagenes()) {
                // Procesar la imagen y subirla a Amazon S3 utilizando tu servicio amazonS3Service
                String imageUrl = amazonS3Service.subirImagen(imagen, categoriaNombre);
                imageUrls.add(imageUrl);
            }
        }

        // Establecer la lista de URLs de imágenes en el producto
        producto.setImagenes(imageUrls);

        if (productoRequest.getImage() != null) {
            String imagenPortadaUrl = amazonS3Service.subirImagen(productoRequest.getImage(), categoriaNombre);

            // Establecer la URL de la imagen de portada del producto
            producto.setImage(imagenPortadaUrl);
        }

        // Guardar el producto en la base de datos
        productoRepository.save(producto);

        // Crear un ProductoDto a partir del Producto
        ProductoDto productoDto = mapper.convertValue(producto, ProductoDto.class);

        return productoDto;
    }




    public void eliminar(Integer id) throws ResourceNotFoundException, BadRequestException {
        Optional<Producto> producto = productoRepository.findById(id);
        if (producto.isPresent()) {
            productoRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("1011", "Producto no encontrado");
        }
    }
}