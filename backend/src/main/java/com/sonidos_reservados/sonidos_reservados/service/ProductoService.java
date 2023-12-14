package com.sonidos_reservados.sonidos_reservados.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sonidos_reservados.sonidos_reservados.dto.ProductoDto;
import com.sonidos_reservados.sonidos_reservados.dto.ProductoRequest;
import com.sonidos_reservados.sonidos_reservados.entity.Caracteristica;
import com.sonidos_reservados.sonidos_reservados.entity.Categoria;
import com.sonidos_reservados.sonidos_reservados.entity.Producto;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import com.sonidos_reservados.sonidos_reservados.repository.CaracteristicaRepository;
import com.sonidos_reservados.sonidos_reservados.repository.CategoriaRepository;
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
    @Autowired
    private CaracteristicaRepository caracteristicaRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<ProductoDto> listar() {
        List<Producto> listaProductos = productoRepository.findAll();
        return listaProductos
                .stream()
                .map(producto -> mapper.convertValue(producto, ProductoDto.class))
                .collect(Collectors.toList());
    }

    public ProductoDto obtener(Long id) throws ResourceNotFoundException {
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
        producto.setCaracteristicas(productoRequest.getCaracteristicas());

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

    public void eliminar(Long id) throws ResourceNotFoundException, BadRequestException {
        Optional<Producto> producto = productoRepository.findById(id);
        if (producto.isPresent()) {
            productoRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("1011", "Producto no encontrado");
        }
    }
        // ...

        public ProductoDto modificar(Long id, ProductoRequest productoRequest) throws ResourceNotFoundException, BadRequestException {
            // Verificar si el producto con el ID proporcionado existe
            Producto producto = productoRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("1001", "No se encontró un producto con el ID proporcionado."));

            // Verificar si el nuevo título ya existe (excepto si es el mismo título)
            if (productoRequest.getTitle() != null && !productoRequest.getTitle().equals(producto.getTitle())) {
                Producto productoExistente = productoRepository.obtenerPorNombre(productoRequest.getTitle());
                if (productoExistente != null) {
                    throw new BadRequestException("1002", "Ya existe un producto con el mismo título");
                }
            }

            // Actualizar los datos del producto si se proporcionan
            if (productoRequest.getTitle() != null) {
                producto.setTitle(productoRequest.getTitle());
            }
            if (productoRequest.getDescription() != null) {
                producto.setDescription(productoRequest.getDescription());
            }
            if (productoRequest.getPrice() != null) {
                producto.setPrice(productoRequest.getPrice());
            }

            if (productoRequest.getCaracteristicas() != null && !productoRequest.getCaracteristicas().isEmpty()) {
                producto.getCaracteristicas().clear();
                producto.setCaracteristicas(productoRequest.getCaracteristicas());
            }

            if (productoRequest.getCategoriaId() != null) {
                // Obtener la categoría nueva con el ID proporcionado
                Categoria nuevaCategoria = categoriaRepository.findById(productoRequest.getCategoriaId())
                        .orElseThrow(() -> new ResourceNotFoundException("1003", "No se encontró la categoría con el ID proporcionado"));

                // Actualizar la categoría del producto
                producto.setCategoria(nuevaCategoria);
            }


            // Procesar y actualizar las imágenes si se proporcionan
            if (productoRequest.getImage() != null) {
                // Procesar la imagen de portada y actualizar su URL
                String categoriaNombre = producto.getCategoria().getNombre();
                String imagenPortadaUrl = amazonS3Service.subirImagen(productoRequest.getImage(), categoriaNombre);
                producto.setImage(imagenPortadaUrl);
            }

            if (productoRequest.getImagenes() != null && !productoRequest.getImagenes().isEmpty()) {
                // Procesar las imágenes adicionales y actualizar sus URLs
                List<String> imageUrls = new ArrayList<>();
                for (MultipartFile imagen : productoRequest.getImagenes()) {
                    String categoriaNombre = producto.getCategoria().getNombre();
                    String imageUrl = amazonS3Service.subirImagen(imagen, categoriaNombre);
                    imageUrls.add(imageUrl);
                }
                producto.setImagenes(imageUrls);
            }

            // Guardar el producto actualizado en la base de datos
            productoRepository.save(producto);

            // Crear un ProductoDto a partir del Producto actualizado
            ProductoDto productoDto = mapper.convertValue(producto, ProductoDto.class);

            return productoDto;
        }

    public List<ProductoDto> buscarPorPalabrasClave(List<String> palabrasClave) {
        // Crear una lista para almacenar los productos que coinciden con al menos una palabra clave
        List<ProductoDto> productosCoincidentes = new ArrayList<>();

        // Obtener todos los productos de la base de datos
        List<Producto> todosLosProductos = productoRepository.findAll();

        // Recorrer todos los productos y verificar si contienen al menos una palabra clave
        for (Producto producto : todosLosProductos) {
            String nombreProducto = producto.getTitle().toLowerCase(); // Convertir el nombre del producto a minúsculas

            for (String palabraClave : palabrasClave) {
                if (nombreProducto.contains(palabraClave.toLowerCase())) {
                    // Si el nombre del producto contiene al menos una palabra clave, agregarlo a la lista de productos coincidentes
                    productosCoincidentes.add(mapper.convertValue(producto, ProductoDto.class));
                    break; // Salir del bucle para evitar duplicados
                }
            }
        }

        return productosCoincidentes;
    }

        public List<ProductoDto> obtenerProductosAleatorios(int cantidad) {
            List<Producto> productosAleatorios = productoRepository.obtenerProductosAleatorios(cantidad);

            // Convierte productos a ProductoDto y retorna la lista
            return productosAleatorios
                    .stream()
                    .map(producto -> mapper.convertValue(producto, ProductoDto.class))
                    .collect(Collectors.toList());
        }


    public ProductoDto actualizarCaracteristicasProducto(Long productoId, List<Long> nuevaCaracteristicaIds) throws ResourceNotFoundException {
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new ResourceNotFoundException("1050", "Producto no encontrado"));

        // Obtener todas las características actuales del producto
        List<Caracteristica> caracteristicasActuales = producto.getCaracteristicas();

        // Validar si las nuevas características existen en la base de datos
        List<Caracteristica> nuevasCaracteristicas = caracteristicaRepository.findAllById(nuevaCaracteristicaIds);
        if (nuevasCaracteristicas.size() != nuevaCaracteristicaIds.size()) {
            throw new ResourceNotFoundException("1051", "Una o más de las características proporcionadas no existen en la base de datos.");
        }

        // Eliminar las características actuales que no están en la lista de nuevas características
        caracteristicasActuales.removeIf(caracteristica -> !nuevaCaracteristicaIds.contains(caracteristica.getId()));

        // Agregar las nuevas características al producto solo si no están ya presentes
        for (Caracteristica nuevaCaracteristica : nuevasCaracteristicas) {
            if (!caracteristicasActuales.contains(nuevaCaracteristica)) {
                caracteristicasActuales.add(nuevaCaracteristica);
            }
        }

        producto.setCaracteristicas(caracteristicasActuales);
        productoRepository.save(producto);

        ProductoDto productoDto = mapper.convertValue(producto, ProductoDto.class);

        return productoDto;
    }


}

