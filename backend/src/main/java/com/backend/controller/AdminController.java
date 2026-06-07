package com.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.ApiResponse;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	@GetMapping("/summary")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getSummary() {
		return ResponseEntity.ok(new ApiResponse("Admin access confirmed", "Success"));
	}
}
