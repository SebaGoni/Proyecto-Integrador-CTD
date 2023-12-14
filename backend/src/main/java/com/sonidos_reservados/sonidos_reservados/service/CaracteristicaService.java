package com.sonidos_reservados.sonidos_reservados.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sonidos_reservados.sonidos_reservados.dto.CaracteristicaDto;
import com.sonidos_reservados.sonidos_reservados.dto.CaracteristicaRequest;
import com.sonidos_reservados.sonidos_reservados.dto.CategoriaDto;
import com.sonidos_reservados.sonidos_reservados.dto.CategoriaRequest;
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

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CaracteristicaService {

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;
    @Autowired
    private AmazonS3Service amazonS3Service;
    @Autowired
    ObjectMapper mapper;


    public CaracteristicaDto agregar(CaracteristicaRequest caracteristicaRequest) throws BadRequestException, ResourceNotFoundException {

        List<Caracteristica> listaCaracteristicas = caracteristicaRepository.findAll();

        if (listaCaracteristicas.stream().anyMatch(c -> c.getNombre().equalsIgnoreCase(caracteristicaRequest.getNombre()))) {
            throw new BadRequestException("1010", "Ya existe la caracteristica");
        }

        // Crear una caracteristica y establecer sus propiedades
        Caracteristica caracteristica = new Caracteristica();
        caracteristica.setNombre(caracteristicaRequest.getNombre());

        // Subir la imagen a Amazon S3 y obtener la URL
        String imageUrl = amazonS3Service.subirImagenCaracteristicas(caracteristicaRequest.getImagen());

        // Establecer la URL de la imagen de la caracteristica
        caracteristica.setImage(imageUrl);

        // Guardar la caracteristica en la base de datos
        caracteristicaRepository.save(caracteristica);

        // Devolver la caracteristica creada
        return mapper.convertValue(caracteristica, CaracteristicaDto.class);
    }

    public List<CaracteristicaDto> listar() {
        List<Caracteristica> listaCaracteristicas = caracteristicaRepository.findAll();
        return listaCaracteristicas
                .stream()
                .map(caracteristica -> mapper.convertValue(caracteristica, CaracteristicaDto.class))
                .collect(Collectors.toList());
    }

    public List<Caracteristica> obtenerCaracteristicasPorIds(List<Long> caracteristicasIds) {
        // Aquí puedes utilizar la lógica específica de tu base de datos para obtener las características por sus IDs
        // Ejemplo: si estás utilizando JPA con Hibernate

        // Suponiendo que CaracteristicaRepository es tu repositorio JPA para la entidad Caracteristica
        return caracteristicaRepository.findAllById(caracteristicasIds);
    }

    public CaracteristicaDto modificar(Long id, MultipartFile imagen, CaracteristicaRequest caracteristicaRequest) throws BadRequestException, ResourceNotFoundException {
        // Aquí deberás implementar la lógica para buscar la característica por su ID
        // Actualizar los atributos necesarios y guardar los cambios en la base de datos

        // Ejemplo de búsqueda y actualización de la característica por ID
        Optional<Caracteristica> optionalCaracteristica = caracteristicaRepository.findById(id);
        if (optionalCaracteristica.isPresent()) {
            Caracteristica caracteristica = optionalCaracteristica.get();

            // Actualizar propiedades según la CaracteristicaRequest
            caracteristica.setNombre(caracteristicaRequest.getNombre());

            // Manejar la actualización de la imagen si se proporciona
            if (imagen != null) {
                String imageUrl = amazonS3Service.subirImagenCaracteristicas(imagen);
                caracteristica.setImage(imageUrl);
            }

            // Guardar los cambios en la base de datos
            caracteristicaRepository.save(caracteristica);

            return mapper.convertValue(caracteristica, CaracteristicaDto.class);
        } else {
            throw new ResourceNotFoundException("1050", "No se encontró la caracteristica con ID: " + id);
        }
    }

    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<Caracteristica> optionalCaracteristica = caracteristicaRepository.findById(id);
        if (optionalCaracteristica.isPresent()) {
            Caracteristica caracteristica = optionalCaracteristica.get();

            caracteristicaRepository.delete(caracteristica);
        } else {
            throw new ResourceNotFoundException("1050", "No se encontró la caracteristica con ID: " + id);
        }
    }
}

