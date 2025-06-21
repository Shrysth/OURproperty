   package com.ourproperties.demo.exceptions;

   public class PropertyNotFoundException extends RuntimeException {
       public PropertyNotFoundException(String message) {
           super(message);
       }
   }
   