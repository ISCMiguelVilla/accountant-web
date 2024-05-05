package com.devs.web.accountant.config.exceptions;

public class SenselessTransactionException extends RuntimeException {

	public SenselessTransactionException(String message){
		super(message);
	}
}
