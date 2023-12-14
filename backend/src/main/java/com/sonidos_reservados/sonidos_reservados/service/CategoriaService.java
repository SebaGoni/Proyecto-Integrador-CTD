package com.sonidos_reservados.sonidos_reservados.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sonidos_reservados.sonidos_reservados.dto.CategoriaDto;
import com.sonidos_reservados.sonidos_reservados.dto.CategoriaRequest;
import com.sonidos_reservados.sonidos_reservados.entity.Categoria;
import com.sonidos_reservados.sonidos_reservados.entity.Producto;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import com.sonidos_reservados.sonidos_reservados.repository.CategoriaRepository;
import com.sonidos_reservados.sonidos_reservados.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private AmazonS3Service amazonS3Service;
    @Autowired
    ObjectMapper mapper;


    public CategoriaDto agregar(CategoriaRequest categoriaRequest) throws BadRequestException, ResourceNotFoundException {

        List<Categoria> listaCategorias = categoriaRepository.findAll();

        if (listaCategorias.stream().anyMatch(c -> c.getNombre().equalsIgnoreCase(categoriaRequest.getNombre()))) {
            throw new BadRequestException("1010", "Ya existe la categoría");
        }

        // Crear una categoria y establecer sus propiedades
        Categoria categoria = new Categoria();
        categoria.setNombre(categoriaRequest.getNombre());

        // Obtener el nombre de la categoría
        String categoriaNombre = categoria.getNombre();

        // Subir la imagen a Amazon S3 y obtener la URL
        String imageUrl = amazonS3Service.subirImagen(categoriaRequest.getImage(), categoriaNombre);

        // Establecer la URL de la imagen de la categoria
        categoria.setImage(imageUrl);

        // Guardar la categoria en la base de datos
        categoriaRepository.save(categoria);

        // Devolver la categoria creada
        return mapper.convertValue(categoria, CategoriaDto.class);
    }


    public List<CategoriaDto> listar() {
        List<Categoria> listaCategorias = categoriaRepository.findAll();
        return listaCategorias
                .stream()
                .map(categoria -> mapper.convertValue(categoria, CategoriaDto.class))
                .collect(Collectors.toList());
    }

    public Categoria obtenerPorId(Long id) throws ResourceNotFoundException {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        if (categoria.isPresent()) {
            return mapper.convertValue(categoria.get(), Categoria.class);
        } else {
            throw new ResourceNotFoundException("1011", "Categoria no encontrada");
        }
    }

    public void eliminar(Long id) throws ResourceNotFoundException, BadRequestException {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        List<Producto> productosEnCategoria = productoRepository.findByCategoriaId(id);
        if (!productosEnCategoria.isEmpty()) {
            throw new ResourceNotFoundException("1012", "No se puede eliminar la categoría, hay productos asociados");
        }
        if (categoria.isPresent()) {
            categoriaRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("1011", "Categoria no encontrada");
        }
    }

    public CategoriaDto modificar(Long id, String nuevoNombre, MultipartFile nuevaImagen) throws ResourceNotFoundException, BadRequestException {
        // Verificar si la categoría existe
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("1011", "No se encontró una categoría con el ID proporcionado."));

        // Verificar que el nuevo nombre y la nueva imagen no sean nulos
        if (nuevoNombre == null && nuevaImagen == null) {
            throw new BadRequestException("1012", "Se debe proporcionar al menos un valor para la modificación (nombre o imagen).");
        }

        // Verificar si el nuevo nombre ya existe (excepto si es el mismo nombre)
        if (nuevoNombre != null) {
            List<Categoria> listaCategorias = categoriaRepository.findAll();
            if (listaCategorias.stream().anyMatch(c -> c.getNombre().equalsIgnoreCase(nuevoNombre) && !c.getId().equals(id))) {
                throw new BadRequestException("1010", "Ya existe la categoría");
            }
            categoria.setNombre(nuevoNombre);
        }

        // Si se proporciona una nueva imagen, subirla y actualizar la URL
        if (nuevaImagen != null) {
            String categoriaNombre = categoria.getNombre();
            String imageUrl = amazonS3Service.subirImagen(nuevaImagen, categoriaNombre);
            categoria.setImage(imageUrl);
        }

        // Guardar la categoría actualizada en la base de datos
        categoriaRepository.save(categoria);

        // Devolver la categoría actualizada
        return mapper.convertValue(categoria, CategoriaDto.class);
    }


}