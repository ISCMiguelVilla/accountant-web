package com.devs.web.accountant.application.controllers;

import com.devs.web.accountant.application.services.AccountService;
import com.devs.web.accountant.representation.dtos.AccountDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/accounts")
public class AccountsController {

	private static final Logger LOGGER = LoggerFactory.getLogger(AccountsController.class);

	private final AccountService accountService;

	@Autowired
	public AccountsController(AccountService accountService) {
		this.accountService = accountService;
	}

	@GetMapping
	public ResponseEntity<List<AccountDTO>> findAll() {
		LOGGER.debug("findAll called");
		return ResponseEntity.ok(this.accountService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<AccountDTO> findById(@PathVariable("id") Long id) {
		LOGGER.debug("findById method called with id: {}", id);
		return ResponseEntity.ok(this.accountService.findById(id));
	}

	@PostMapping
	public ResponseEntity<AccountDTO> create(@RequestBody AccountDTO accountDTO) {
		LOGGER.debug("create method called with account: {}", accountDTO);
		return ResponseEntity.ok(this.accountService.create(accountDTO));
	}

	@PatchMapping("/{id}")
	public ResponseEntity<AccountDTO> update(@PathVariable("id") Long id, @RequestBody AccountDTO accountDTO) {
		LOGGER.debug("update method called with id: {} and account: {}", id, accountDTO);
		return ResponseEntity.ok(this.accountService.update(id, accountDTO));
	}

	@GetMapping("/in-use")
	public ResponseEntity<List<AccountDTO>> inUse() {
		LOGGER.debug("inUse called");
		return ResponseEntity.ok(this.accountService.inUse());
	}

	@GetMapping("/usable-accounts")
	public ResponseEntity<List<AccountDTO>> usableAccounts() {
		LOGGER.debug("usableAccounts called");
		return ResponseEntity.ok(this.accountService.usableAccounts());
	}
}
