package com.sonidos_reservados.sonidos_reservados.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

    @Configuration
    public class AmazonS3Config {

        private final String accessKey = "AKIAY3PLHSUJNPUFQZ6P"; // Reemplaza con tu propia Access Key
        private final String secretKey = "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"; // Reemplaza con tu propia Secret Key
        private final Region region = Region.US_EAST_1; // Reemplaza con tu región AWS

        @Bean
        public S3Client s3Client() {
            AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(accessKey, secretKey);
            return S3Client.builder()
                    .region(region)
                    .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                    .build();
        }
    }
