package com.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.service.ClaimService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/claims")
@RequiredArgsConstructor
@Validated
public class ClaimController {

	private final ClaimService claimService;

	@PostMapping("/{foodId}")
	@PreAuthorize("hasRole('NGO')")
	public ResponseEntity<?> claimFood(@PathVariable Long foodId, Authentication auth) {
		System.out.println("claim food id " + foodId + " by " + auth.getName());
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(claimService.claimFood(foodId, auth.getName()));
	}

	@PutMapping("/{claimId}/collect")
	@PreAuthorize("hasRole('NGO')")
	public ResponseEntity<?> markAsCollected(@PathVariable Long claimId, Authentication auth) {
		return ResponseEntity.ok(claimService.markAsCollected(claimId, auth.getName()));
	}

	@GetMapping
	@PreAuthorize("hasRole('NGO')")
	public ResponseEntity<?> getNgoClaims(Authentication auth) {
		return ResponseEntity.ok(claimService.getNgoClaims(auth.getName()));
	}
}
