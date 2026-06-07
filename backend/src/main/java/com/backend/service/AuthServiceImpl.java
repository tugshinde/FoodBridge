package com.backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.custom_exceptions.AuthenticationException;
import com.backend.dtos.AuthRequest;
import com.backend.dtos.AuthResp;
import com.backend.dtos.RegisterDTO;
import com.backend.entities.User;
import com.backend.repository.UserRepository;
import com.backend.security.CustomUserDetails;
import com.backend.security.JwtUtils;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder encoder;
	private final AuthenticationManager authManager;
	private final JwtUtils jwtUtils;

	@Override
	public AuthResp authenticateUser(AuthRequest request) {
		try {
			Authentication authentication = authManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

			CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
			String jwt = jwtUtils.generateJwtToken(authentication);

			return new AuthResp(
					"Login successful",
					jwt,
					userDetails.getUser().getName(),
					userDetails.getUser().getRole(),
					userDetails.getUser().getId(),
					userDetails.getUser().getEmail());
		} catch (Exception e) {
			throw new AuthenticationException("Invalid email or password!");
		}
	}

	@Override
	public String registerUser(RegisterDTO request) {
		if (userRepository.findByEmail(request.getEmail()).isPresent()) {
			throw new AuthenticationException("Email is already taken!");
		}

		User user = new User(request.getName(), request.getEmail(),
				encoder.encode(request.getPassword()), request.getRole());

		userRepository.save(user);
		return "User registered successfully";
	}
}
