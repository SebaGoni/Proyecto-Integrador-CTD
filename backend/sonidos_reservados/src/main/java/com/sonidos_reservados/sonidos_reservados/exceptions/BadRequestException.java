package com.sonidos_reservados.sonidos_reservados.exceptions;

import lombok.Getter;

@Getter
//@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends Exception {
  private String code;

  public BadRequestException(String code, String mensaje) {
    super(mensaje);
    this.code = code;
  }
}
