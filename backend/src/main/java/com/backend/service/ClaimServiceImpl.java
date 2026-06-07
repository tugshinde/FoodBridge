package com.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.custom_exceptions.AuthenticationException;
import com.backend.custom_exceptions.ResourceNotFoundException;
import com.backend.dtos.ClaimDTO;
import com.backend.entities.Claim;
import com.backend.entities.ClaimStatus;
import com.backend.entities.FoodListing;
import com.backend.entities.FoodStatus;
import com.backend.entities.User;
import com.backend.repository.ClaimRepository;
import com.backend.repository.FoodListingRepository;
import com.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ClaimServiceImpl implements ClaimService {

	private final ClaimRepository claimRepo;
	private final FoodListingRepository foodRepo;
	private final UserRepository userRepo;
	private final ModelMapper mapper;

	@Override
	public ClaimDTO claimFood(Long foodId, String ngoEmail) {
		User ngo = userRepo.findByEmail(ngoEmail)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
				
		FoodListing food = foodRepo.findById(foodId)
				.orElseThrow(() -> new ResourceNotFoundException("Food listing not found"));
				
		if (food.getStatus() != FoodStatus.AVAILABLE) {
			throw new RuntimeException("Food is not available for claiming");
		}
		
		food.setStatus(FoodStatus.CLAIMED);
		
		Claim claim = new Claim(food, ngo, ClaimStatus.PENDING);
		Claim savedClaim = claimRepo.save(claim);
		
		return mapToDTO(savedClaim);
	}

	@Override
	public ClaimDTO markAsCollected(Long claimId, String ngoEmail) {
		Claim claim = claimRepo.findById(claimId)
				.orElseThrow(() -> new ResourceNotFoundException("Claim not found"));
				
		if (!claim.getNgo().getEmail().equals(ngoEmail)) {
			throw new AuthenticationException("Not authorized to update this claim");
		}
		
		claim.setStatus(ClaimStatus.COLLECTED);
		claim.getFoodListing().setStatus(FoodStatus.COLLECTED);
		
		return mapToDTO(claim);
	}

	@Override
	public List<ClaimDTO> getNgoClaims(String ngoEmail) {
		User ngo = userRepo.findByEmail(ngoEmail)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
				
		return claimRepo.findByNgo(ngo).stream()
				.map(this::mapToDTO)
				.collect(Collectors.toList());
	}
	
	private ClaimDTO mapToDTO(Claim claim) {
		ClaimDTO dto = mapper.map(claim, ClaimDTO.class);
		dto.setFoodId(claim.getFoodListing().getId());
		dto.setFoodTitle(claim.getFoodListing().getTitle());
		dto.setNgoId(claim.getNgo().getId());
		dto.setNgoName(claim.getNgo().getName());
		dto.setClaimDate(claim.getCreatedOn());
		dto.setFoodQty(claim.getFoodListing().getQty());
		return dto;
	}
}
