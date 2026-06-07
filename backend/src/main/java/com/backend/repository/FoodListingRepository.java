package com.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.entities.FoodListing;
import com.backend.entities.FoodStatus;
import com.backend.entities.User;

public interface FoodListingRepository extends JpaRepository<FoodListing, Long> {
	List<FoodListing> findByStatus(FoodStatus status);
	List<FoodListing> findByPostedBy(User postedBy);
}
