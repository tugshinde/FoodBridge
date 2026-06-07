package com.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = "password")
public class User extends BaseEntity {

	@Column(length = 50, nullable = false)
	private String name;

	@Column(length = 50, unique = true, nullable = false)
	private String email;

	@Column(length = 300, nullable = false)
	private String password;

	@Enumerated(EnumType.STRING)
	@Column(length = 20, nullable = false)
	private UserRole role;

	public User(String name, String email, String password, UserRole role) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.role = role;
	}
}
