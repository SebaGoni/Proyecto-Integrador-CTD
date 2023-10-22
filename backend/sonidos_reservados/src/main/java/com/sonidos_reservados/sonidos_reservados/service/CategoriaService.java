package com.sonidos_reservados.sonidos_reservados.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sonidos_reservados.sonidos_reservados.dto.CategoriaDto;
import com.sonidos_reservados.sonidos_reservados.dto.ProductoDto;
import com.sonidos_reservados.sonidos_reservados.entity.Categoria;
import com.sonidos_reservados.sonidos_reservados.entity.Producto;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import com.sonidos_reservados.sonidos_reservados.repository.CategoriaRepository;
import com.sonidos_reservados.sonidos_reservados.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    ObjectMapper mapper;

    public CategoriaDto agregar(Categoria categoria) throws BadRequestException {
        if (categoria.getId() != null) {
            throw new BadRequestException("1008", "No puede incluir el id. Se genera automaticamente");
        }
        Categoria nuevaCategoria = categoriaRepository.save(categoria);
        return mapper.convertValue(nuevaCategoria, CategoriaDto.class);
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

}
