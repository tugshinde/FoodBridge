package com.backend.custom_exceptions;

public class AuthenticationException extends RuntimeException {
	private static final long serialVersionUID = 3244486857234577012L;

	public AuthenticationException(String message) {
		super(message);
	}
}
