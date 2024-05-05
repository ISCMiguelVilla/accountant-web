package com.devs.web.accountant.config;

import com.devs.web.accountant.config.exceptions.*;
import com.devs.web.accountant.config.exceptions.Error;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

	private static final Logger LOGGER = LoggerFactory.getLogger(RestExceptionHandler.class);

	@ExceptionHandler(MalformedRequestException.class)
	public ResponseEntity<Object> handleResourceNotFoundException(MalformedRequestException exception) {
		var error = Error.builder()
				.type("MALFORMED_REQUEST")
				.time(LocalDateTime.now())
				.message(exception.getMessage())
				.build();
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<Object> handleResourceNotFoundException(ResourceNotFoundException exception) {
		var error = Error.builder()
				.type("RESOURCE_NOT_FOUND")
				.time(LocalDateTime.now())
				.message(exception.getMessage())
				.build();
		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(InsufficientFundsException.class)
	public ResponseEntity<Object> handleInsufficientFundsException(InsufficientFundsException exception) {
		var error = Error.builder()
				.type("INSUFFICIENT_FUNDS")
				.time(LocalDateTime.now())
				.message(exception.getMessage())
				.build();
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(TransactionNotSupportedException.class)
	public ResponseEntity<Object> handleTransactionNotSupportedException(TransactionNotSupportedException exception) {
		var error = Error.builder()
				.type("TRANSACTION_NOT_SUPPORTED")
				.time(LocalDateTime.now())
				.message(exception.getMessage())
				.build();
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler({ Exception.class, RuntimeException.class})
	public ResponseEntity<Object> handleAllExceptions(Exception exception) {
		LOGGER.error(exception.getMessage(), exception);
		return new ResponseEntity<>(Error.builder().message("INTERNAL_SERVER_ERROR").build(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
