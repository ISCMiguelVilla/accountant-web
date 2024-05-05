package com.devs.web.accountant.application.controllers;

import com.devs.web.accountant.application.services.TransactionsService;
import com.devs.web.accountant.representation.dtos.TransactionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/transactions")
public class TransactionsController {

	private final TransactionsService transactionsService;

	@Autowired
	public TransactionsController(TransactionsService transactionsService) {
		this.transactionsService = transactionsService;
	}

	@GetMapping("/{id}")
	public ResponseEntity<TransactionDTO> findById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(this.transactionsService.findById(id));
	}

	@PostMapping
	public TransactionDTO create(@RequestBody TransactionDTO transaction) {
		return this.transactionsService.create(transaction);
	}

	@GetMapping("/list")
	public ResponseEntity<List<TransactionDTO>> list() {
		return ResponseEntity.ok(this.transactionsService.list());
	}

	@PatchMapping("/apply/{id}")
	public ResponseEntity<TransactionDTO> apply(@PathVariable("id") Long id) {
		return ResponseEntity.ok(this.transactionsService.apply(id));
	}

	@PostMapping("/bulk")
	public ResponseEntity<List<TransactionDTO>> createBulk(@RequestBody List<TransactionDTO> transactions) {
		return ResponseEntity.ok(this.transactionsService.createBulk(transactions));
	}
}
