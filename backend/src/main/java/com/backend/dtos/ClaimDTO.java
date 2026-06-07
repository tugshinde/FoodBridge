package com.backend.dtos;

import com.backend.entities.ClaimStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClaimDTO {
	private Long id;
	private Long foodId;
	private String foodTitle;
	private Long ngoId;
	private String ngoName;
	private ClaimStatus status;
	private java.time.LocalDate claimDate;
	private Integer foodQty;
}
