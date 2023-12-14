package com.sonidos_reservados.sonidos_reservados.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sonidos_reservados.sonidos_reservados.User.Role;
import com.sonidos_reservados.sonidos_reservados.User.User;
import com.sonidos_reservados.sonidos_reservados.User.UserRepository;
import com.sonidos_reservados.sonidos_reservados.dto.CategoriaDto;
import com.sonidos_reservados.sonidos_reservados.dto.ProductoDto;
import com.sonidos_reservados.sonidos_reservados.dto.UsuarioDto;
import com.sonidos_reservados.sonidos_reservados.entity.Categoria;
import com.sonidos_reservados.sonidos_reservados.entity.Producto;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class UsuarioService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    ObjectMapper mapper;

    public List<UsuarioDto> listar() {
        List<User> listaUsuarios = userRepository.findAll();
        return listaUsuarios
                .stream()
                .map(user -> mapper.convertValue(user, UsuarioDto.class))
                .collect(Collectors.toList());
    }


    public UsuarioDto modificar(Integer id, String nuevoRol, String nuevoNombre, String nuevoApellido) throws ResourceNotFoundException, BadRequestException {
        // Verificar si el usuario existe
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("1011", "No se encontró un usuario con el ID proporcionado."));

        // Convertir el nuevo rol de String a un enumerado Role
        Role role;
        try {
            role = Role.valueOf(nuevoRol);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("1012", "Se debe proporcionar un rol válido (ADMIN o USER).");
        }

        // Verificar que el nuevo rol sea ADMIN o USER
        if (role != Role.ADMIN && role != Role.USER) {
            throw new BadRequestException("1012", "Se debe proporcionar un rol válido (ADMIN o USER).");
        }

        // Actualizar el rol del usuario
        user.setRole(role);

        // Verificar y actualizar los campos firstname y lastname si se proporcionan
        if (nuevoNombre != null) {
            user.setFirstname(nuevoNombre);
        }

        if (nuevoApellido != null) {
            user.setLastname(nuevoApellido);
        }
        // Guardar el usuario actualizado en la base de datos
        userRepository.save(user);

        // Devolver el usuario actualizado
        return mapper.convertValue(user, UsuarioDto.class);
    }

    public void eliminar(Integer id) throws ResourceNotFoundException, BadRequestException {
        Optional<User> usuario = userRepository.findById(id);
        if (usuario.isPresent()) {
            userRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("1011", "Usuario no encontrado");
        }
    }

    public UsuarioDto obtenerPorId(Integer id) throws ResourceNotFoundException {
        Optional<User> usuario = userRepository.findById(id);
        if (usuario.isPresent()) {
            return mapper.convertValue(usuario.get(), UsuarioDto.class);
        } else {
            throw new ResourceNotFoundException("1011", "Usuario no encontrado");
        }
    }

}
