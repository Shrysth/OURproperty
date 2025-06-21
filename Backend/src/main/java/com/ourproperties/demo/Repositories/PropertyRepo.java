package com.ourproperties.demo.Repositories;

import com.ourproperties.demo.Entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropertyRepo extends JpaRepository<Property, Long> {
    List<Property> findByCity(String city);
    List<Property> findByPriceBetween(Double minPrice, Double maxPrice);

    @Query("SELECT p FROM Property p WHERE p.agent.dashboardKey = :dashboardKey")
    List<Property> findByAgentDashboardKey(@Param("dashboardKey") long dashboardKey);
    
}
