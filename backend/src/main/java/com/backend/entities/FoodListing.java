package com.backend.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "food_listings")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = "postedBy")
public class FoodListing extends BaseEntity {

	@Column(length = 100, nullable = false)
	private String title;

	@Column(nullable = false)
	private Integer qty;

	@Column(name = "expiry_time", nullable = false)
	private LocalDateTime expiryTime;

	@Enumerated(EnumType.STRING)
	@Column(length = 20, nullable = false)
	private FoodStatus status;

	@Enumerated(EnumType.STRING)
	@Column(length = 20, nullable = false)
	private FoodCategory category;

	@ManyToOne
	@JoinColumn(name = "posted_by", nullable = false)
	private User postedBy;

	public FoodListing(String title, Integer qty, LocalDateTime expiryTime, FoodStatus status, FoodCategory category) {
		this.title = title;
		this.qty = qty;
		this.expiryTime = expiryTime;
		this.status = status;
		this.category = category;
	}
}
