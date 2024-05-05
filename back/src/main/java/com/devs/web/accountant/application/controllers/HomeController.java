package com.devs.web.accountant.application.controllers;

import com.devs.web.accountant.application.services.HomeService;
import com.devs.web.accountant.representation.enums.EnumDimension;
import com.devs.web.accountant.representation.views.BalanceItemView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/home")
public class HomeController {

	private final HomeService homeService;

	@Autowired
	public HomeController(
			HomeService homeService
	) {
		this.homeService = homeService;
	}

	@GetMapping("/balance")
	public ResponseEntity<List<BalanceItemView>> balance(
			@RequestParam(value = "dimension",	required = false) EnumDimension dimension,
			@RequestParam(value = "size",		required = false) Integer size,
			@RequestParam(value = "reference",	required = false) String reference
	) {
		return ResponseEntity.ok(this.homeService.balance(dimension, size, reference));
	}
}
