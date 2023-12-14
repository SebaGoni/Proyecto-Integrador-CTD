package com.sonidos_reservados.sonidos_reservados.service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

 @Service
 @ConditionalOnProperty(name = "app.s3.enabled", havingValue = "true")
public class AmazonS3Service {
    @Value("${aws.s3.bucketName}")
    private String bucketName;

    private final S3Client s3Client;

    public AmazonS3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String subirImagen(MultipartFile imagen, String categoriaNombre) {
        try {
            // Generar un nombre único para la imagen en S3
            String nombreUnico = UUID.randomUUID().toString() + "-" + imagen.getOriginalFilename();

            // Generar el prefijo para el objeto S3 que incluye el nombre de la categoría
            String prefijo = "productos/" + categoriaNombre + "/";

            // Cargar el archivo en S3 con el prefijo
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(prefijo + nombreUnico)  // Agregar el prefijo al nombre
                    .build();

            s3Client.putObject(request, RequestBody.fromInputStream(imagen.getInputStream(), imagen.getSize()));

            // Generar y devolver la URL de acceso público a la imagen
            String imageUrl = "https://" + bucketName + ".s3.amazonaws.com/" + prefijo + nombreUnico;
            return imageUrl;
        } catch (IOException e) {
            // Maneja las excepciones apropiadamente
            throw new RuntimeException("Error al cargar la imagen en Amazon S3", e);
        }
    }

     public String subirImagenCaracteristicas(MultipartFile imagen) {
         try {
             // Generar un nombre único para la imagen en S3
             String nombreUnico = UUID.randomUUID().toString() + "-" + imagen.getOriginalFilename();

             // Generar el prefijo para el objeto S3 que incluye el nombre de la categoría
             String prefijo = "caracteristicas/";

             // Cargar el archivo en S3 con el prefijo
             PutObjectRequest request = PutObjectRequest.builder()
                     .bucket(bucketName)
                     .key(prefijo + nombreUnico)  // Agregar el prefijo al nombre
                     .build();

             s3Client.putObject(request, RequestBody.fromInputStream(imagen.getInputStream(), imagen.getSize()));

             // Generar y devolver la URL de acceso público a la imagen
             String imageUrl = "https://" + bucketName + ".s3.amazonaws.com/" + prefijo + nombreUnico;
             return imageUrl;
         } catch (IOException e) {
             // Maneja las excepciones apropiadamente
             throw new RuntimeException("Error al cargar la imagen en Amazon S3", e);
         }
     }

     public List<String> subirImagenCategoria(List<MultipartFile> imagenes, String categoriaNombre) {
         List<String> imageUrls = new ArrayList<>();

         for (MultipartFile imagen : imagenes) {
             try {
                 // Generar un nombre único para la imagen en S3
                 String nombreUnico = UUID.randomUUID().toString() + "-" + imagen.getOriginalFilename();

                 // Generar el prefijo para el objeto S3 que incluye el nombre de la categoría
                 String prefijo = "categorias/" + categoriaNombre + "/";

                 // Cargar el archivo en S3 con el prefijo
                 PutObjectRequest request = PutObjectRequest.builder()
                         .bucket(bucketName)
                         .key(prefijo + nombreUnico)  // Agregar el prefijo al nombre
                         .build();

                 s3Client.putObject(request, RequestBody.fromInputStream(imagen.getInputStream(), imagen.getSize()));

                 // Generar y agregar la URL de acceso público a la imagen a la lista
                 String imageUrl = "https://" + bucketName + ".s3.amazonaws.com/" + prefijo + nombreUnico;
                 imageUrls.add(imageUrl);
             } catch (IOException e) {
                 // Maneja las excepciones apropiadamente
                 throw new RuntimeException("Error al cargar una imagen en Amazon S3", e);
             }
         }

         return imageUrls;
     }


 }


