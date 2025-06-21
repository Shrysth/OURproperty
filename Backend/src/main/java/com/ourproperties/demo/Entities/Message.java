package com.ourproperties.demo.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private long id; 
    private String sendername;
    private String senderemail;
    private String message;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; 


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    private long agentId;

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = true)
    private Property property; 


    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }
    private String propertyTitle;

    public Message() {
    }

    public Message(String sendername, String senderemail, String message, long agentId, long propertyId, String propertyTitle) {
        this.agentId = agentId;
        this.propertyTitle = propertyTitle;
        this.sendername = sendername;
        this.senderemail = senderemail;
        this.message = message;
    }

    // Getters and setters
    public String getSendername() {
        return sendername;
    }

    public void setSendername(String sendername) {
        this.sendername = sendername;
    }

    public String getSenderEmail() {
        return senderemail;
    }

    public void setSenderEmail(String senderemail) {
        this.senderemail = senderemail;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    public long getAgentId() {
        return agentId;
    }
    public void setAgentId(long agentId) {
        this.agentId = agentId;
    }

    public String getPropertyTitle() {
        return propertyTitle;
    }
    public void setPropertyTitle(String propertyTitle) {
        this.propertyTitle = propertyTitle;
    }

}