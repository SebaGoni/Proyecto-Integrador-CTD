package com.sonidos_reservados.sonidos_reservados.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sonidos_reservados.sonidos_reservados.User.User;
import com.sonidos_reservados.sonidos_reservados.User.UserRepository;
import com.sonidos_reservados.sonidos_reservados.dto.ReservaDto;
import com.sonidos_reservados.sonidos_reservados.enums.EstadoReserva;
import com.sonidos_reservados.sonidos_reservados.entity.Producto;
import com.sonidos_reservados.sonidos_reservados.entity.Reserva;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import com.sonidos_reservados.sonidos_reservados.repository.ProductoRepository;
import com.sonidos_reservados.sonidos_reservados.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class ReservaService {
    @Autowired
    private ReservaRepository reservaRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    ObjectMapper mapper;

    public List<LocalDate> obtenerFechasReservadasParaProducto(Producto producto, LocalDate fechaInicio, LocalDate fechaFin) {
        List<Reserva> reservas = reservaRepository.findByProductoAndFechaInicioBeforeAndFechaFinAfter(
                producto, fechaFin, fechaInicio);

        Set<LocalDate> fechasReservadasSet = new HashSet<>();

        for (Reserva reserva : reservas) {
            try {
                fechasReservadasSet.addAll(obtenerRangoDeFechas(reserva.getFechaInicio(), reserva.getFechaFin()));
            } catch (IllegalArgumentException e) {
                // Manejar la excepción según tus necesidades
                e.printStackTrace();
            }
        }

        return new ArrayList<>(fechasReservadasSet);
    }

    private List<LocalDate> obtenerRangoDeFechas(LocalDate fechaInicio, LocalDate fechaFin) {
        if (fechaInicio == null || fechaFin == null || fechaFin.isBefore(fechaInicio)) {
            throw new IllegalArgumentException("Fechas de inicio y fin no válidas");
        }

        // Generar un rango de fechas entre fechaInicio y fechaFin (inclusive)
        return IntStream.range(0, fechaInicio.until(fechaFin).getDays() + 1)
                .mapToObj(i -> fechaInicio.plusDays(i))
                .collect(Collectors.toList());
    }

    public void agregarReserva(Long idProducto, Integer idUsuario, String fechaInicio, String fechaFin, String estadoReserva) throws BadRequestException, IOException {
        Producto producto = obtenerProductoPorId(idProducto);
        User usuario = obtenerUsuarioPorId(idUsuario);
        validarProductoYUsuario(producto, usuario);

        LocalDate fechaInicioParsed = LocalDate.parse(fechaInicio);
        LocalDate fechaFinParsed = LocalDate.parse(fechaFin);

        validarFechasReservadas(producto, fechaInicioParsed, fechaFinParsed);

        // Convertir el estado de String a un enumerado EstadoReserva
        EstadoReserva estadoReservaEnum;
        try {
            estadoReservaEnum = EstadoReserva.valueOf(estadoReserva.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("1065", "Se debe proporcionar un estado de reserva válido (PENDIENTE, FINALIZADA, CANCELADA).");
        }

        // Verificar que el nuevo estado sea uno de los valores permitidos
        if (estadoReservaEnum != EstadoReserva.PENDIENTE && estadoReservaEnum != EstadoReserva.FINALIZADA && estadoReservaEnum != EstadoReserva.CANCELADA) {
            throw new BadRequestException("1065", "Se debe proporcionar un estado de reserva válido (PENDIENTE, FINALIZADA, CANCELADA).");
        }

        Reserva reserva = new Reserva();
        reserva.setProducto(producto);
        reserva.setUsuario(usuario);
        reserva.setFechaInicio(fechaInicioParsed);
        reserva.setFechaFin(fechaFinParsed);
        reserva.setEstadoReserva(estadoReservaEnum);

        reservaRepository.save(reserva);

        // Envío del correo de confirmación
        String usuarioEmail = usuario.getEmail();
        String productName = producto.getTitle();
        String imagenUrl = producto.getImage();
        LocalDate fechaDeIncicio = fechaInicioParsed;
        LocalDate fechaDeFinalizacion = fechaFinParsed;

        emailService.sendReservationConfirmation(usuarioEmail, productName, imagenUrl, fechaDeIncicio, fechaDeFinalizacion);
    }

    private Producto obtenerProductoPorId(Long idProducto) throws BadRequestException {
        Optional<Producto> optionalProducto = productoRepository.findById(idProducto);
        return optionalProducto.orElseThrow(() -> new BadRequestException("1050", "Producto no encontrado"));
    }

    private User obtenerUsuarioPorId(Integer idUsuario) throws BadRequestException {
        Optional<User> optionalUsuario = userRepository.findById(idUsuario);
        return optionalUsuario.orElseThrow(() -> new BadRequestException("1050","Usuario no encontrado"));
    }

    private void validarProductoYUsuario(Producto producto, User usuario) throws BadRequestException {
        if (producto == null || usuario == null) {
            throw new BadRequestException("1050", "Producto o usuario no encontrados");
        }
    }

    private void validarFechasReservadas(Producto producto, LocalDate fechaInicio, LocalDate fechaFin) throws BadRequestException {
        List<LocalDate> fechasReservadas = obtenerFechasReservadasParaProducto(producto, fechaInicio, fechaFin);
        if (fechaInicio == null || fechaFin == null || fechaInicio.isAfter(fechaFin)) {
            throw new BadRequestException("1050", "Fechas de inicio y fin no válidas");
        }
        if (!fechasReservadas.isEmpty()) {
            throw new BadRequestException("1050", "Ya existen reservas en el rango de fechas especificado");
        }
    }

    public List<ReservaDto> obtenerTodasLasReservasDisponibles() {
        List<Reserva> reservas = reservaRepository.findAll();

        return reservas.stream()
                .map(this::convertirReservaADTO)
                .collect(Collectors.toList());
    }

    private ReservaDto convertirReservaADTO(Reserva reserva) {
        return mapper.convertValue(reserva, ReservaDto.class);
    }

    public List<LocalDate> obtenerFechasReservadasParaProductoId(Producto producto) {
        List<Reserva> reservas = reservaRepository.findByProducto(producto);

        Set<LocalDate> fechasReservadasSet = new HashSet<>();

        for (Reserva reserva : reservas) {
            try {
                fechasReservadasSet.addAll(obtenerRangoDeFechas(reserva.getFechaInicio(), reserva.getFechaFin()));
            } catch (IllegalArgumentException e) {
                // Manejar la excepción según tus necesidades
                e.printStackTrace();
            }
        }

        return new ArrayList<>(fechasReservadasSet);
    }

    public ReservaDto obtenerReservaPorId(Long id) throws ResourceNotFoundException {
        try {
            Optional<Reserva> reserva = reservaRepository.findById(id);
            if (reserva.isPresent()) {
                return mapper.convertValue(reserva.get(), ReservaDto.class);
            } else {
                throw new ResourceNotFoundException("1050", "Reserva no encontrada");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new ResourceNotFoundException("1050", "Error al obtener la reserva");
        }
    }

    public void modificarReserva(Long idReserva, Long idProducto, Integer idUsuario, String estadoReserva) throws BadRequestException, ResourceNotFoundException {
        // Obtener la reserva existente por su ID
        Reserva reservaExistente = reservaRepository.findById(idReserva)
                .orElseThrow(() -> new ResourceNotFoundException("1050", "Reserva no encontrada"));

        // Obtener el producto y el usuario correspondientes
        Producto producto = obtenerProductoPorId(idProducto);
        User usuario = obtenerUsuarioPorId(idUsuario);

        // Realizar validaciones
        validarProductoYUsuario(producto, usuario);

        // Convertir el estado de String a un enumerado EstadoReserva
        EstadoReserva estadoReservaEnum;
        try {
            estadoReservaEnum = EstadoReserva.valueOf(estadoReserva.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("1065", "Se debe proporcionar un estado de reserva válido (PENDIENTE, FINALIZADA, CANCELADA).");
        }

        // Verificar que el nuevo estado sea uno de los valores permitidos
        if (estadoReservaEnum != EstadoReserva.PENDIENTE && estadoReservaEnum != EstadoReserva.FINALIZADA && estadoReservaEnum != EstadoReserva.CANCELADA) {
            throw new BadRequestException("1065", "Se debe proporcionar un estado de reserva válido (PENDIENTE, FINALIZADA, CANCELADA).");
        }

        // Actualizar la reserva con los nuevos valores
        reservaExistente.setProducto(producto);
        reservaExistente.setUsuario(usuario);
        reservaExistente.setEstadoReserva(estadoReservaEnum);

        // Guardar la reserva actualizada en el repositorio
        reservaRepository.save(reservaExistente);
    }

    public List<Reserva> obtenerReservasPorUsuarioId(Integer idUsuario) {
        return reservaRepository.findAllByUsuarioId(idUsuario);
    }
}

