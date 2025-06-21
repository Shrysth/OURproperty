package com.ourproperties.demo.controllers;

import com.ourproperties.demo.Entities.Message;
import com.ourproperties.demo.Entities.Property;
import com.ourproperties.demo.Entities.User;
import com.ourproperties.demo.Repositories.UserRepository;
import com.ourproperties.demo.Services.MessageService;
import com.ourproperties.demo.Services.PropertyService;
import com.ourproperties.demo.dtos.ContactRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    // PropertyController.java
    @GetMapping("/dashboard/{dashboardKey}")
    public ResponseEntity<List<Property>> getPropertiesByDashboardKey(@PathVariable long dashboardKey) {
        try {
            List<Property> properties = propertyService.getPropertiesByAgentDashboardKey(dashboardKey);
            return ResponseEntity.ok(properties);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error" + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/contact-agent")
    public ResponseEntity<?> contactAgent(@RequestBody ContactRequest contactRequest) {
        try {
            Message message = new Message();            
            Optional<User> SENDER = userRepository.findByEmail(contactRequest.getEmail());
            if (SENDER.isPresent()) {
                message.setUser(SENDER.get());
                message.setSendername(SENDER.get().getName());
                message.setSenderEmail(SENDER.get().getEmail());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            Optional<Property> property = propertyService.getPropertyById(contactRequest.getPropertyId());
            if (property.isEmpty()) {
                System.out.println("Property not found: " + contactRequest.getPropertyId());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Property not found");
            }
            message.setProperty(property.get());
            message.setAgentId(property.get().getAgent().getId());
            message.setMessage(contactRequest.getMessage());
            message.setPropertyTitle(contactRequest.getPropertyTitle());
            messageService.saveMessage(message);
            return ResponseEntity.ok().body("Contact request received");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error processing request");
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        Optional<Property> property = propertyService.getPropertyById(id);
        return property.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Property> createProperty(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("address") String address,
            @RequestParam("city") String city,
            @RequestParam("zipCode") String zipCode,
            @RequestParam("bedrooms") Integer bedrooms,
            @RequestParam("bathrooms") Integer bathrooms,
            @RequestParam("type") String type,
            @RequestParam("image") MultipartFile image,
            @RequestParam("agent") String Email) throws IOException {

        // Create a new Property object
        Property property = new Property();
        property.setTitle(title);
        property.setDescription(description);
        property.setPrice(price);
        property.setAddress(address);
        property.setCity(city);
        property.setZipCode(zipCode);
        property.setBedrooms(bedrooms);
        property.setBathrooms(bathrooms);
        property.setType(type);
        property.setLikes(0);
        property.setShares(0);
        property.setViews(0);
        Optional<User> agent = userRepository.findByEmail(Email);
        if (agent.isPresent()) {
            property.setAgent(agent.get()); // Set the agent if found
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Return bad request if agent not found
        }

        String imagePath = propertyService.saveImage(image); // Call the service to save the image
        property.setImage(imagePath); // Set the image path in the property object

        Property createdProperty = propertyService.createProperty(property);
        return ResponseEntity.status(201).body(createdProperty);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property propertyDetails) {
        Property updatedProperty = propertyService.updateProperty(id, propertyDetails);
        return ResponseEntity.ok(updatedProperty);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }

    // Add this to your PropertyController.java
    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<byte[]> getImage(@PathVariable String filename) throws IOException {
        System.out.println("IMAGE_DIRECTORY: " + IMAGE_DIRECTORY); // Add this line
        Path path = Paths.get(IMAGE_DIRECTORY, filename); // Corrected path construction
        byte[] imageBytes = Files.readAllBytes(path);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(imageBytes);
    }

    @Value("${image.directory}")
    private String IMAGE_DIRECTORY;
}
