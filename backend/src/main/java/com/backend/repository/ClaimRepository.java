package com.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.entities.Claim;
import com.backend.entities.User;

public interface ClaimRepository extends JpaRepository<Claim, Long> {
	List<Claim> findByNgo(User ngo);
}
