package com.devs.web.accountant.config.exceptions;

public class TransactionNotSupportedException extends RuntimeException {

	public TransactionNotSupportedException(String message){
		super(message);
	}
}
