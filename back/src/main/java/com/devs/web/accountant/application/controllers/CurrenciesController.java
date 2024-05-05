package com.devs.web.accountant.application.controllers;

import com.devs.web.accountant.application.services.CurrenciesService;
import com.devs.web.accountant.representation.dtos.CurrencyDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/currencies")
public class CurrenciesController {

	private final CurrenciesService currenciesService;

	@Autowired
	public CurrenciesController(CurrenciesService currenciesService) {
		this.currenciesService = currenciesService;
	}

	@GetMapping
	public ResponseEntity<List<CurrencyDTO>> findAll() {
		return ResponseEntity.ok(this.currenciesService.findAll());
	}

	@PostMapping
	public ResponseEntity<CurrencyDTO> create(@RequestBody CurrencyDTO currencyDTO) {
		return ResponseEntity.ok(this.currenciesService.create(currencyDTO));
	}

	@GetMapping("/{id}")
	public ResponseEntity<CurrencyDTO> findById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(this.currenciesService.findById(id));
	}

	@PatchMapping("/{id}")
	public ResponseEntity<CurrencyDTO> update(@PathVariable("id") Long id, @RequestBody CurrencyDTO currencyDTO) {
		return ResponseEntity.ok(this.currenciesService.update(id, currencyDTO));
	}

	@GetMapping("usable")
	public List<CurrencyDTO> usable() {
		return this.currenciesService.usable();
	}
}
