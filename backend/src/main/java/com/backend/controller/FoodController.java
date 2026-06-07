package com.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.AddFoodDTO;
import com.backend.dtos.ApiResponse;
import com.backend.service.FoodService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/food")
@RequiredArgsConstructor
@Validated
public class FoodController {

	private final FoodService foodService;

	@PostMapping
	@PreAuthorize("hasRole('RESTAURANT') or hasRole('HOTEL')")
	public ResponseEntity<?> postFood(@RequestBody @Valid AddFoodDTO dto, Authentication auth) {
		System.out.println("post food by " + auth.getName());
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(foodService.addFood(dto, auth.getName()));
	}

	@GetMapping
	@PreAuthorize("hasRole('NGO') or hasRole('ADMIN')")
	public ResponseEntity<?> getAvailableFood() {
		return ResponseEntity.ok(foodService.getAllAvailableFood());
	}
	
	@GetMapping("/my-listings")
	@PreAuthorize("hasRole('RESTAURANT') or hasRole('HOTEL')")
	public ResponseEntity<?> getMyListings(Authentication auth) {
		return ResponseEntity.ok(foodService.getFoodPostedByRestaurant(auth.getName()));
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasRole('RESTAURANT') or hasRole('HOTEL')")
	public ResponseEntity<?> updateFood(@PathVariable Long id, @RequestBody @Valid AddFoodDTO dto, Authentication auth) {
		return ResponseEntity.ok(foodService.updateFood(id, dto, auth.getName()));
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('RESTAURANT') or hasRole('HOTEL') or hasRole('ADMIN')")
	public ResponseEntity<?> deleteFood(@PathVariable Long id, Authentication auth) {
		return ResponseEntity.ok(new ApiResponse(foodService.deleteFood(id, auth.getName()), "Success"));
	}
}
