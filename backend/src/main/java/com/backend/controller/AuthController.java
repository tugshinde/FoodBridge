package com.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.ApiResponse;
import com.backend.dtos.AuthRequest;
import com.backend.dtos.RegisterDTO;
import com.backend.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Validated
public class AuthController {

	private final AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody @Valid AuthRequest request) {
		System.out.println("in auth user " + request.getEmail());
		return ResponseEntity.ok(authService.authenticateUser(request));
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody @Valid RegisterDTO request) {
		System.out.println("in register user " + request.getEmail());
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new ApiResponse(authService.registerUser(request), "Success"));
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logoutUser() {
		return ResponseEntity.ok(new ApiResponse("Logout successful", "Success"));
	}
	// @Patchmapping
	// public ResponseEntity<?> refreshAccessToken
		

}
