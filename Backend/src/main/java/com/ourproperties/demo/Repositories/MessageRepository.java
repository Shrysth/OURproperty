package com.ourproperties.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ourproperties.demo.Entities.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByUserId(Long id);
    
    List<Message> findByPropertyId(Long id);

    @Query("SELECT m FROM Message m WHERE m.agentId = ?1")
    List<Message> findByAgentId(Long id);
}
