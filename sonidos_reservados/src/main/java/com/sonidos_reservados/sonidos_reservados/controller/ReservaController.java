package com.sonidos_reservados.sonidos_reservados.controller;
import com.sonidos_reservados.sonidos_reservados.User.User;
import com.sonidos_reservados.sonidos_reservados.User.UserRepository;
import com.sonidos_reservados.sonidos_reservados.dto.ReservaDto;
import com.sonidos_reservados.sonidos_reservados.entity.Producto;
import com.sonidos_reservados.sonidos_reservados.entity.Reserva;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import com.sonidos_reservados.sonidos_reservados.repository.ProductoRepository;
import com.sonidos_reservados.sonidos_reservados.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservas")
public class ReservaController {
    @Autowired
    private ReservaService reservaService;
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private UserRepository userRepository;
    @GetMapping("/producto/{idProducto}")
    public ResponseEntity<List<LocalDate>> obtenerFechasReservadas(@PathVariable Long idProducto) {
        // Obtener el producto por ID (puedes usar ProductoRepository para esto)
        Producto producto = productoRepository.findById(idProducto).orElse(null);

        if (producto == null) {
            return ResponseEntity.notFound().build();
        }

        List<LocalDate> fechasReservadas = reservaService.obtenerFechasReservadasParaProductoId(producto);

        return ResponseEntity.ok(fechasReservadas);
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Reserva>> obtenerReservasPorUsuarioId(@PathVariable Integer idUsuario) {
        // Obtener el usuario por ID (puedes usar UserRepository o el método que tengas)
        User usuario = userRepository.findById(idUsuario).orElse(null);

        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        // Obtener las reservas del usuario usando un servicio (suponiendo que tengas un servicio para manejar las reservas)
        List<Reserva> reservasUsuario = reservaService.obtenerReservasPorUsuarioId(usuario.getId());

        return ResponseEntity.ok(reservasUsuario);
    }


    @PostMapping
    @Async
    public ResponseEntity<String> agregarReserva(
            @RequestParam Long idProducto,
            @RequestParam Integer idUsuario,
            @RequestParam String fechaInicio,
            @RequestParam String fechaFin,
            @RequestParam String estadoReserva) {

        try {
            reservaService.agregarReserva(idProducto, idUsuario, fechaInicio, fechaFin, estadoReserva);
            return ResponseEntity.ok("Reserva agregada correctamente");
        } catch (BadRequestException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping
    public ResponseEntity<List<ReservaDto>> obtenerTodasLasReservasDisponibles() {
        List<ReservaDto> reservasDisponibles = reservaService.obtenerTodasLasReservasDisponibles();
        return ResponseEntity.ok(reservasDisponibles);
    }

    @GetMapping("/reserva/{id}")
    public ResponseEntity<?> obtenerReservaPorId(@PathVariable Long id) {
        try {
            ReservaDto reserva = reservaService.obtenerReservaPorId(id);
            return ResponseEntity.ok(reserva);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.notFound().build(); // Manejo de la excepción ResourceNotFoundException
        }
    }

    @PutMapping("/{idReserva}")
    @Async
    public ResponseEntity<String> modificarReserva(
            @PathVariable Long idReserva,
            @RequestParam Long idProducto,
            @RequestParam Integer idUsuario,
            @RequestParam String estadoReserva) {

        try {
            reservaService.modificarReserva(idReserva, idProducto, idUsuario, estadoReserva);
            return ResponseEntity.ok("Reserva modificada correctamente");
        } catch (BadRequestException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (ResourceNotFoundException e) {
            throw new RuntimeException(e);
        }
    }


}

