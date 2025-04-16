package com.hackathon.inditex.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackathon.inditex.Entities.Center;
import com.hackathon.inditex.Entities.Coordinates;

public interface CenterRepository extends JpaRepository<Center, Long> {
    Optional<Center> findByCoordinates(Coordinates coordinates);
}