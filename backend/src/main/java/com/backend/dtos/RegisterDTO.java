package com.backend.dtos;

import com.backend.entities.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDTO {
	@NotBlank(message = "Name cannot be blank")
	private String name;
	
	@NotBlank(message = "Email cannot be blank")
	@Email(message = "Invalid email format")
	private String email;
	
	@NotBlank(message = "Password cannot be blank")
	@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$", message = "Password must be at least 8 characters, and contain at least one digit, one lowercase letter, one uppercase letter, and one special character")
	private String password;
	
	@NotNull(message = "Role is required")
	private UserRole role;
}
