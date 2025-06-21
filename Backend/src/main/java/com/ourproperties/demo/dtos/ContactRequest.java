package com.ourproperties.demo.dtos;

public class ContactRequest {
    private String name;
    private String email;
    private String message;
    private Long agentId;
    private Long propertyId;
    private String propertyTitle;

    public ContactRequest() {
    }

    public ContactRequest(String name, String email, String message, long agentId, long propertyId, String propertyTitle) {
        this.agentId = agentId;
        this.propertyId = propertyId;
        this.propertyTitle = propertyTitle;
        this.name = name;
        this.email = email;
        this.message = message;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
    public long getPropertyId() {
        return propertyId;
    }
    public void setPropertyId(long propertyId) {
        this.propertyId = propertyId;
    }
    public String getPropertyTitle() {
        return propertyTitle;
    }
    public void setPropertyTitle(String propertyTitle) {
        this.propertyTitle = propertyTitle;
    }

}