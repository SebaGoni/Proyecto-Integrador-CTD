package com.sonidos_reservados.sonidos_reservados.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductoDto {
    private String title;
    private Double price;
    private String description;
    private String image;
}
