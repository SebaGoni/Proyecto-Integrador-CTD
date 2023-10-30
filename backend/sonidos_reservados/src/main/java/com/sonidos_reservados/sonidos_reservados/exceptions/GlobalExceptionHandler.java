package com.sonidos_reservados.sonidos_reservados.exceptions;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

  private static final Logger Logger = LogManager.getLogger(GlobalExceptionHandler.class);

  @ExceptionHandler({BadRequestException.class})
  public ResponseEntity<SonidosErrorResponse> emitirBadRequestException(BadRequestException e) {
    e.printStackTrace();
    Logger.error("mensaje de error de BadRequestException -->" + e.getMessage());
    SonidosErrorResponse errorResponse = new SonidosErrorResponse(e.getCode(), e.getMessage());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
  }

  @ExceptionHandler({ResourceNotFoundException.class})
  public ResponseEntity<SonidosErrorResponse> emitirResourceNotFoundException(ResourceNotFoundException e) {
    e.printStackTrace();
    Logger.error("mensaje de error de ResourceNotFoundException -->" + e.getMessage());
    SonidosErrorResponse errorResponse = new SonidosErrorResponse(e.getCode(), e.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
  }

}
