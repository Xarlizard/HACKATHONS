package com.hackathon.blockchain.controller;

import com.hackathon.blockchain.dto.LoginRequest;
import com.hackathon.blockchain.dto.RegisterRequest;
import com.hackathon.blockchain.exception.AuthenticationException;
import com.hackathon.blockchain.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request, HttpSession session) {
        try {
            userService.register(request);
            session.setAttribute("username", request.getUsername());
            return ResponseEntity.ok(Map.of("message", "User registered and logged in successfully"));
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "❌ " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
        try {
            userService.login(request);
            session.setAttribute("username", request.getUsername());
            return ResponseEntity.ok(Map.of("message", "Login successful"));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body(Map.of("message", "❌ Invalid credentials"));
        }
    }

    @GetMapping("/check-session")
    public ResponseEntity<?> checkSession(HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username != null) {
            return ResponseEntity.ok(Map.of("user", Map.of("username", username)));
        }
        return ResponseEntity.status(401).body(Map.of("message", "❌ No active session"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
