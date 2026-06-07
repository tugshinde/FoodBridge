package com.backend.dtos;

import java.time.LocalDateTime;

import com.backend.entities.FoodCategory;
import com.backend.entities.FoodStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodListingDTO {
	private Long id;
	private String title;
	private Integer qty;
	private LocalDateTime expiryTime;
	private FoodStatus status;
	private FoodCategory category;
	private String postedByName;
	private Long postedById;
}
