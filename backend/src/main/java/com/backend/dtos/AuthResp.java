package com.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.backend.entities.UserRole;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResp {
	private String message;
	private String jwt;
	private String name;
	private UserRole role;
	private Long userId;
	private String email;
}
