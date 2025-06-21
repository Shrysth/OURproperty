package com.ourproperties.demo.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ourproperties.demo.Entities.Message;
import com.ourproperties.demo.Entities.User;
import com.ourproperties.demo.Repositories.UserRepository;
import com.ourproperties.demo.Services.MessageService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/messages") // Fix the typo in your path if needed
public class MessageController {
    
    @Autowired
    private MessageService messageService;
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("/user/{email}")
    public ResponseEntity<?> getMessagesByUser(@PathVariable String email) {
        try {
            String emailLower = email.toLowerCase();
            User user = userRepository.findByEmail(emailLower).orElseThrow(() -> new RuntimeException("User not found with email: " + emailLower));
            
            List<Message> messages = messageService.getMessagesByAgentId(user.getId());
            
            if (messages.isEmpty()) {
                return ResponseEntity.ok().body(List.of()); 
            }
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            System.out.println("Error fetching messages: " + e.getMessage());
            return ResponseEntity.status(500)
                .body("Error fetching messages: " + e.getMessage());
        }
    }
}