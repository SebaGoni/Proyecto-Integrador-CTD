package com.sonidos_reservados.sonidos_reservados.dto;

import com.sonidos_reservados.sonidos_reservados.entity.Caracteristica;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Component
public class ProductoRequest {
    private String title;
    private Double price;
    private Long categoriaId;
    private String description;
    private MultipartFile image;
    private List<MultipartFile> imagenes;
    private List<Caracteristica> caracteristicas = new ArrayList<>();
}
