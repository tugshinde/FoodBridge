package com.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "claims")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = {"foodListing", "ngo"})
public class Claim extends BaseEntity {

	@OneToOne
	@JoinColumn(name = "food_id", nullable = false, unique = true)
	private FoodListing foodListing;

	@ManyToOne
	@JoinColumn(name = "ngo_id", nullable = false)
	private User ngo;

	@Enumerated(EnumType.STRING)
	@Column(length = 20, nullable = false)
	private ClaimStatus status;

	public Claim(FoodListing foodListing, User ngo, ClaimStatus status) {
		this.foodListing = foodListing;
		this.ngo = ngo;
		this.status = status;
	}
}
