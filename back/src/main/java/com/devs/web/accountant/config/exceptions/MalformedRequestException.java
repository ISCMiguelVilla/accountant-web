package com.devs.web.accountant.config.exceptions;

public class MalformedRequestException extends RuntimeException {

	public MalformedRequestException(String message){
		super(message);
	}
}
