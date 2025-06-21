package com.ourproperties.demo.Services;

import com.ourproperties.demo.Entities.Message;
import com.ourproperties.demo.Repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Optional<Message> getMessageById(Long id) {
        return messageRepository.findById(id);
    }

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }

    public List<Message> getMessagesByUserId(Long id) {
        List<Message> messages = messageRepository.findByUserId(id);
        if (messages.isEmpty()) {
            throw new RuntimeException("No messages found for user with ID: " + id);
        }
        return messages;
    }

    public List<Message> getMessagesByAgentId(Long id) {
       List<Message> messages = messageRepository.findByAgentId(id);
        if (messages.isEmpty()) {
            throw new RuntimeException("No messages found for agent with ID: " + id);
        }
        return messages;
    }
}
