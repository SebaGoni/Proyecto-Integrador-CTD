package com.sonidos_reservados.sonidos_reservados.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SonidosErrorResponse {
  private String code;
  private String message;
}
