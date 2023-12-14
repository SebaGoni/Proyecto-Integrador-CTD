package com.sonidos_reservados.sonidos_reservados.service;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sonidos_reservados.sonidos_reservados.exceptions.BadRequestException;
import com.sonidos_reservados.sonidos_reservados.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class EmailService {

    @Value("${sendgrid.apiKey}")
    private String sendGridApiKey;

    public void sendConfirmationEmail(String toEmail, String subject, String content) throws Exception {
        Email from = new Email("sonidosreservados@gmail.com");
        Email to = new Email(toEmail);
        Content emailContent = new Content("text/plain", content);

        Mail mail = new Mail(from, subject, to, emailContent);

        SendGrid sg = new SendGrid(sendGridApiKey);

        Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());

        Response response = sg.api(request);

        if (response.getStatusCode() != 202) {
            throw new Exception("Error al enviar el correo");
        }
    }

    public void sendReservationConfirmation(String usuarioEmail, String productName, String imagenUrl, LocalDate fechaDeIncicio, LocalDate fechaDeFinalizacion) throws BadRequestException, IOException {
        Email from = new Email("sonidosreservados@gmail.com");
        Email to = new Email(usuarioEmail);
        LocalTime horaDeReserva = LocalTime.now();

        // Construye el contenido del correo de confirmación de reserva
        String subject = "Confirmación de reserva de " + productName;
        String content = "¡Hola!<br><br>"
                + "Has reservado el producto: " + productName + "<br><br>"
                + "<img src='" + imagenUrl + "' alt='Imagen del producto' style='max-width: 100%; height: auto; display: block; margin: 15px 0; max-width: 300px;'>"
                + "<p>Hora de la reserva: " + horaDeReserva + "</p><br><br>"
                + "Fecha de inicio: " + fechaDeIncicio + "<br><br>"
                + "Fecha de finalización: " + fechaDeFinalizacion + "<br><br>"
                + "<p>Contacto del proveedor: <a href='mailto:sonidosreservados@gmail.com'>sonidosreservados@gmail.com</a></p>"
                + "¡Gracias por tu reserva!";

        Content emailContent = new Content("text/html", content);

        Mail mail = new Mail(from, subject, to, emailContent);

        SendGrid sg = new SendGrid(sendGridApiKey);

        Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());

        Response response = sg.api(request);

        if (response.getStatusCode() != 202) {
            throw new IOException("Error al enviar el correo de confirmación de reserva");
        }
    }


}

