package com.backend.service;

import java.util.List;
import com.backend.dtos.ClaimDTO;

public interface ClaimService {
	ClaimDTO claimFood(Long foodId, String ngoEmail);
	ClaimDTO markAsCollected(Long claimId, String ngoEmail);
	List<ClaimDTO> getNgoClaims(String ngoEmail);
}
