package com.sonidos_reservados.sonidos_reservados.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sonidos_reservados.sonidos_reservados.User.User;
import com.sonidos_reservados.sonidos_reservados.User.UserRepository;
import com.sonidos_reservados.sonidos_reservados.dto.ReservaDto;
import com.sonidos_reservados.sonidos_reservados.dto.ValoracionDto;
import com.sonidos_reservados.sonidos_reservados.entity.Producto;
import com.sonidos_reservados.sonidos_reservados.entity.Reserva;
import com.sonidos_reservados.sonidos_reservados.entity.Valoracion;
import com.sonidos_reservados.sonidos_reservados.enums.EstadoReserva;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import com.sonidos_reservados.sonidos_reservados.repository.ProductoRepository;
import com.sonidos_reservados.sonidos_reservados.repository.ReservaRepository;
import com.sonidos_reservados.sonidos_reservados.repository.ValoracionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class ValoracionService {

    @Autowired
    private ValoracionRepository valoracionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private ReservaRepository reservaRepository;
    @Autowired
    private ObjectMapper objectMapper;

    public ResponseEntity<?> agregarValoracion(Valoracion valoracion) {
        try {
            // Validar el rango del rating
            int rating = valoracion.getRating();
            if (rating < 1 || rating > 5) {
                return ResponseEntity.badRequest().body("El rating debe estar entre 1 y 5");
            }

            // Obtener la reserva por ID
            Reserva reserva = reservaRepository.findById(valoracion.getReserva().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("1050", "Reserva no encontrada"));

            // Verificar si el estado de la reserva es FINALIZADA
            if (reserva.getEstadoReserva() != EstadoReserva.FINALIZADA) {
                return ResponseEntity.badRequest().body("La reserva debe estar en estado FINALIZADA para agregar una valoración");
            }

            // Obtener instancias de User, Producto por sus ID utilizando el repositorio correspondiente
            User usuario = userRepository.findById(valoracion.getUsuario().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("1050", "Usuario no encontrado"));

            Producto producto = productoRepository.findById(valoracion.getProducto().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("1050", "Producto no encontrado"));

            // Establecer relaciones
            valoracion.setUsuario(usuario);
            valoracion.setProducto(producto);
            valoracion.setReserva(reserva);
            valoracion.setRating(valoracion.getRating());
            valoracion.setComentario(valoracion.getComentario());

            // Guardar la valoración en la base de datos
            Valoracion valoracionAgregada = valoracionRepository.save(valoracion);

            // Convertir la valoración a DTO antes de devolverla
            ValoracionDto valoracionAgregadaDto = objectMapper.convertValue(valoracionAgregada, ValoracionDto.class);
            return ResponseEntity.ok(valoracionAgregadaDto);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // Agrega esta línea para imprimir el rastreo de la pila en la consola
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al agregar la valoración: " + e.getMessage());
        }
    }


    public ResponseEntity<List<ValoracionDto>> obtenerValoracionesPorProductoId(Long productoId) {
        try {
            List<Valoracion> valoraciones = valoracionRepository.findByProductoId(productoId);
            List<ValoracionDto> valoracionesDto = valoraciones.stream()
                    .map(valoracion -> objectMapper.convertValue(valoracion, ValoracionDto.class))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(valoracionesDto);
        } catch (Exception e) {
            // Manejar cualquier excepción que pueda ocurrir durante la conversión o recuperación
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }


    public ResponseEntity<List<ValoracionDto>> obtenerValoracionesPorUsuarioId(Long usuarioId) {
        try {
            List<Valoracion> valoraciones = valoracionRepository.findByUsuarioId(usuarioId);
            List<ValoracionDto> valoracionesDto = valoraciones.stream()
                    .map(valoracion -> objectMapper.convertValue(valoracion, ValoracionDto.class))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(valoracionesDto);
    } catch (Exception e) {
        // Manejar cualquier excepción que pueda ocurrir durante la conversión o recuperación
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    public ResponseEntity<List<ValoracionDto>> obtenerTodasLasValoraciones() {
        try {
            List<Valoracion> valoraciones = valoracionRepository.findAll();
            List<ValoracionDto> valoracionesDto = valoraciones.stream()
                    .map(valoracion -> objectMapper.convertValue(valoracion, ValoracionDto.class))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(valoracionesDto);
        } catch (Exception e) {
            // Manejar cualquier excepción que pueda ocurrir durante la conversión o recuperación
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    public void eliminarValoracionPorId(Long id) throws ResourceNotFoundException {
        Optional<Valoracion> valoracion = valoracionRepository.findById(id);
        if (valoracion.isPresent()) {
            valoracionRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("1050","Valoración no encontrada");
        }
    }
}
