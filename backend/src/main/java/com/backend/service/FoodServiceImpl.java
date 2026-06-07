package com.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.custom_exceptions.AuthenticationException;
import com.backend.custom_exceptions.ResourceNotFoundException;
import com.backend.dtos.AddFoodDTO;
import com.backend.dtos.FoodListingDTO;
import com.backend.entities.FoodListing;
import com.backend.entities.FoodStatus;
import com.backend.entities.User;
import com.backend.repository.FoodListingRepository;
import com.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FoodServiceImpl implements FoodService {

	private final FoodListingRepository foodRepo;
	private final UserRepository userRepo;
	private final ModelMapper mapper;

	@Override
	public FoodListingDTO addFood(AddFoodDTO dto, String userEmail) {
		User user = userRepo.findByEmail(userEmail)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		
		FoodListing food = mapper.map(dto, FoodListing.class);
		food.setPostedBy(user);
		food.setStatus(FoodStatus.AVAILABLE);
		
		FoodListing savedFood = foodRepo.save(food);
		return mapToDTO(savedFood);
	}

	@Override
	public List<FoodListingDTO> getAllAvailableFood() {
		java.time.LocalDateTime now = java.time.LocalDateTime.now();
		return foodRepo.findByStatus(FoodStatus.AVAILABLE).stream()
				.filter(food -> food.getExpiryTime() != null && food.getExpiryTime().isAfter(now))
				.map(this::mapToDTO)
				.collect(Collectors.toList());
	}

	@Override
	public List<FoodListingDTO> getFoodPostedByRestaurant(String userEmail) {
		User user = userRepo.findByEmail(userEmail)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		return foodRepo.findByPostedBy(user).stream()
				.map(this::mapToDTO)
				.collect(Collectors.toList());
	}

	@Override
	public FoodListingDTO updateFood(Long id, AddFoodDTO dto, String userEmail) {
		FoodListing food = foodRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Food listing not found"));
		
		if (!food.getPostedBy().getEmail().equals(userEmail)) {
			throw new AuthenticationException("Not authorized to update this listing");
		}
		
		food.setTitle(dto.getTitle());
		food.setQty(dto.getQty());
		food.setExpiryTime(dto.getExpiryTime());
		food.setCategory(dto.getCategory());
		
		return mapToDTO(food);
	}

	@Override
	public String deleteFood(Long id, String userEmail) {
		FoodListing food = foodRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Food listing not found"));
		
		User user = userRepo.findByEmail(userEmail).orElseThrow(() -> new ResourceNotFoundException("User not found"));
		
		if (!food.getPostedBy().getEmail().equals(userEmail) && !user.getRole().name().equals("ADMIN")) {
			throw new AuthenticationException("Not authorized to delete this listing");
		}
		
		foodRepo.delete(food);
		return "Food listing deleted successfully";
	}
	
	private FoodListingDTO mapToDTO(FoodListing food) {
		FoodListingDTO dto = mapper.map(food, FoodListingDTO.class);
		dto.setPostedByName(food.getPostedBy().getName());
		dto.setPostedById(food.getPostedBy().getId());
		return dto;
	}
}
