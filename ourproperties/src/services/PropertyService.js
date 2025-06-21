// // src/services/PropertyService.js
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
// import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons'; // Import the specific icons
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/properties'; 

const PropertyService = {
  getAllProperties: async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Fetched properties:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw error; // Re-throw to handle in component
    }
  },

  getPropertyById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createProperty: async (property) => {
    const response = await axios.post(API_URL, property);
    return response.data;
  },

  updateProperty: async (id, property) => {
    const response = await axios.put(`${API_URL}/${id}`, property);
    return response.data;
  },

  deleteProperty: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },

  contactAgent: async (contactData) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/properties/contact-agent',
        contactData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default PropertyService;
