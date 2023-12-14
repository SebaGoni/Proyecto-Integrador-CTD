package com.sonidos_reservados.sonidos_reservados.controller;

import com.sonidos_reservados.sonidos_reservados.User.Role;
import com.sonidos_reservados.sonidos_reservados.dto.ProductoDto;
import com.sonidos_reservados.sonidos_reservados.dto.UsuarioDto;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import com.sonidos_reservados.sonidos_reservados.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    // Obtener todos los usuarios
    @GetMapping
    public List<UsuarioDto> listar() {
        return usuarioService.listar();
    }

    // Modificar rol de usuario por ID
    @PutMapping("/{id}")
    public ResponseEntity<?> modificar(@PathVariable Integer id, @RequestBody Map<String, String> cambios) throws ResourceNotFoundException, BadRequestException {
        String nuevoRol = cambios.get("role");
        String nuevoNombre = cambios.get("firstname");
        String nuevoApellido = cambios.get("lastname");

        return ResponseEntity.ok(usuarioService.modificar(id, nuevoRol, nuevoNombre, nuevoApellido));
    }

    // Eliminar un usuario por ID
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) throws ResourceNotFoundException, BadRequestException {
        usuarioService.eliminar(id);
    }

    @GetMapping("/{id}")
    public UsuarioDto obtenerPorId(@PathVariable Integer id) throws ResourceNotFoundException {
        return usuarioService.obtenerPorId(id);
    }

}
