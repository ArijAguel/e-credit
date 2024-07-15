package org.example.ecreditbackend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    @Value("${upload.directory}")
    private String uploadDir;

    @PostMapping
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            // Constructing file path relative to project root
            String filePath = System.getProperty("user.dir") + File.separator + uploadDir + File.separator + file.getOriginalFilename();
            File dest = new File(filePath);

            // Ensure directory exists, create if not
            File directory = new File(System.getProperty("user.dir") + File.separator + uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Save file
            file.transferTo(dest);
            System.out.println("File saved to: " + filePath); // Log the file path
            return ResponseEntity.ok("File uploaded successfully: " + file.getOriginalFilename());
        } catch (IOException e) {
            System.err.println("Error uploading file: " + e.getMessage()); // Log the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file: " + e.getMessage());
        }
    }
}
