package com.sonidos_reservados.sonidos_reservados.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@Component
public class CaracteristicaRequest {
    private String nombre;
    private MultipartFile imagen;
}
