package com.devs.web.accountant.config.exceptions;

public class ResourceNotFoundException extends RuntimeException {

	public ResourceNotFoundException(String message){
		super(message);
	}
}
