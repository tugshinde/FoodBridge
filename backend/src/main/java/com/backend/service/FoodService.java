package com.backend.service;

import java.util.List;
import com.backend.dtos.AddFoodDTO;
import com.backend.dtos.FoodListingDTO;

public interface FoodService {
	FoodListingDTO addFood(AddFoodDTO dto, String userEmail);
	List<FoodListingDTO> getAllAvailableFood();
	List<FoodListingDTO> getFoodPostedByRestaurant(String userEmail);
	FoodListingDTO updateFood(Long id, AddFoodDTO dto, String userEmail);
	String deleteFood(Long id, String userEmail);
}
