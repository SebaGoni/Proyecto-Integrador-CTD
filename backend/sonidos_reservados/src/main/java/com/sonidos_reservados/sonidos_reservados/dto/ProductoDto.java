package com.sonidos_reservados.sonidos_reservados.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ProductoDto {
    private String title;
    private Double price;
    private String description;
    private String image;
    private List<String> imagenes = new ArrayList<>();
}
