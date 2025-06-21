package com.ourproperties.demo.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;


@Entity
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title; // Changed from Title to title
    private String description;
    private String address;
    private double price;
    private String city; 
    private int likes; // Changed from like to likes
    private int shares; // Changed from share to shares
    private int views; // Changed from view to views
    private String zipCode;
    private Integer bedrooms;
    private Integer bathrooms;
    private String type;
    private String image; // Store the image path or filename
    @ManyToOne
    private User agent; 

    
    // No-argument constructor
    public Property() {
    }

    // Parameterized constructor
    public Property(Long id, String title, String description, String address, double price, String city, int likes,
            int shares, int views, String zipCode, Integer bedrooms, Integer bathrooms, String type, String image, User agent) {
        this.agent = agent; // Initialize the agent
        this.id = id;
        this.title = title; // Changed from Title to title
        this.description = description;
        this.address = address;
        this.price = price;
        this.city = city;
        this.likes = likes; // Changed from like to likes
        this.shares = shares; // Changed from share to shares
        this.views = views; // Changed from view to views
        this.zipCode = zipCode;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.type = type;
        this.image = image; // Update to String
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getLikes() {
        return likes; // Changed from getLike to getLikes
    }

    public void setLikes(int likes) { // Changed from setLike to setLikes
        this.likes = likes;
    }

    public int getShares() {
        return shares; // Changed from getShare to getShares
    }

    public void setShares(int shares) { // Changed from setShare to setShares
        this.shares = shares;
    }

    public int getViews() {
        return views; // Changed from getView to getViews
    }

    public void setViews(int views) { // Changed from setView to setViews
        this.views = views;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public Integer getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(Integer bedrooms) {
        this.bedrooms = bedrooms;
    }

    public Integer getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(Integer bathrooms2) {
        this.bathrooms = bathrooms2;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getImage() {
        return image; // Update to String
    }

    public void setImage(String image) {
        this.image = image; // Update to String
    }

    public User getAgent() {
        return agent;
    }

    public void setAgent(User agent) {
        this.agent = agent;
    }
    
}
