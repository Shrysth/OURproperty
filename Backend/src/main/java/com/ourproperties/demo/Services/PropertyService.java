package com.ourproperties.demo.Services;

import com.ourproperties.demo.Entities.Message;
import com.ourproperties.demo.Entities.Property;
import com.ourproperties.demo.Repositories.PropertyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.ourproperties.demo.exceptions.PropertyNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepo propertyRepo;

    @Value("${image.directory}")
    private String IMAGE_DIRECTORY; // Set your image directory path

    public List<Property> getAllProperties() {
        return propertyRepo.findAll();
    }

    public Optional<Property> getPropertyById(Long id) {
        return propertyRepo.findById(id);
    }

    public Property createProperty(Property property) {
        // Add validation here if needed
        return propertyRepo.save(property);
    }

    public String saveImage(MultipartFile image) throws IOException {
        // Create the directory if it doesn't exist
        File directory = new File(IMAGE_DIRECTORY);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Create a unique filename
        String filename = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(IMAGE_DIRECTORY, filename);

        // Save the image file
        Files.copy(image.getInputStream(), filePath);

        // Return the path to the saved image
        return filename; // You can return the full path or just the filename based on your needs
    }

    public Property updateProperty(Long id, Property propertyDetails) {
        Property property = propertyRepo.findById(id)
                .orElseThrow(() -> new PropertyNotFoundException("Property not found with id " + id));

        property.setTitle(propertyDetails.getTitle());
        property.setDescription(propertyDetails.getDescription());
        property.setAddress(propertyDetails.getAddress());
        property.setPrice(propertyDetails.getPrice());
        property.setCity(propertyDetails.getCity());
        property.setZipCode(propertyDetails.getZipCode());
        property.setBedrooms(propertyDetails.getBedrooms());
        property.setBathrooms(propertyDetails.getBathrooms());
        property.setType(propertyDetails.getType());
        property.setLikes(propertyDetails.getLikes());
        property.setShares(propertyDetails.getShares());
        property.setViews(propertyDetails.getViews());
        property.setImage(propertyDetails.getImage());

        return propertyRepo.save(property);
    }

    public void deleteProperty(Long id) {
        propertyRepo.deleteById(id);
    }

    public List<Property> getPropertiesByAgentDashboardKey(long dashboardKey) {
        return propertyRepo.findByAgentDashboardKey(dashboardKey);
    }

}
