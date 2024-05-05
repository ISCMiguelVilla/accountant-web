package com.devs.web.accountant.config.exceptions;

public class InsufficientFundsException extends RuntimeException {

	public InsufficientFundsException(String message){
		super(message);
	}
}
