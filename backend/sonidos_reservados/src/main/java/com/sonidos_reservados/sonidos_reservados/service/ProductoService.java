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

    public ProductoDto agregar(ProductoRequest productoRequest) throws BadRequestException, ResourceNotFoundException {
        Long categoriaId = productoRequest.getCategoriaId();
        Categoria categoria = categoriaService.obtenerPorId(categoriaId);

        if (categoria == null) {
            throw new BadRequestException("1010", "No existe la categoria");
        }

        // Crear un producto y establecer sus propiedades
        Producto producto = new Producto();
        producto.setTitle(productoRequest.getTitle());
        producto.setPrice(productoRequest.getPrice());
        producto.setCategoria(categoria);
        producto.setDescription(productoRequest.getDescription());

        // Obtener el nombre de la categoría
        String categoriaNombre = producto.getCategoria().getNombre();

        // Subir la imagen a Amazon S3 y obtener la URL
        String imageUrl = amazonS3Service.subirImagen(productoRequest.getImagen(), categoriaNombre);

        // Establecer la URL de la imagen en el producto
        producto.setImage(imageUrl);

        // Guardar el producto en la base de datos
        productoRepository.save(producto);

        // Devolver el producto creado
        return mapper.convertValue(producto, ProductoDto.class);
    }

    public List<ProductoDto> buscarProductosPorCategoria(String categoria) {

        List<Producto> listaProductos = productoRepository.findByCategoriaNombre(categoria);
        return listaProductos
                .stream()
                .map(producto -> mapper.convertValue(producto, ProductoDto.class))
                .collect(Collectors.toList());
    }
}