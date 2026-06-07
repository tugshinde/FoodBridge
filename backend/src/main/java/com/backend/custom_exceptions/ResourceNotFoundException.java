package com.backend.custom_exceptions;

public class ResourceNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 7486177365227640038L;

	public ResourceNotFoundException(String message) {
		super(message);
	}
}
