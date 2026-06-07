package com.backend.dtos;

import java.time.LocalDateTime;
import com.backend.entities.FoodCategory;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddFoodDTO {
	@NotBlank(message = "Title is required")
	private String title;
	
	@NotNull(message = "Quantity is required")
	@Min(value = 1, message = "Quantity must be at least 1")
	private Integer qty;
	
	@NotNull(message = "Expiry time is required")
	@Future(message = "Expiry time must be in the future")
	private LocalDateTime expiryTime;

	@NotNull(message = "Category is required")
	private FoodCategory category;
}
