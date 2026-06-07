package com.backend.service;

import com.backend.dtos.AuthRequest;
import com.backend.dtos.AuthResp;
import com.backend.dtos.RegisterDTO;

public interface AuthService {
	AuthResp authenticateUser(AuthRequest request);
	String registerUser(RegisterDTO request);
}
