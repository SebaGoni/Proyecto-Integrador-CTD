package com.sonidos_reservados.sonidos_reservados.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@Component
public class ProductoRequest {
    private String title;
    private double price;
    private Long categoriaId;
    private String description;
    private MultipartFile imagen;
}
