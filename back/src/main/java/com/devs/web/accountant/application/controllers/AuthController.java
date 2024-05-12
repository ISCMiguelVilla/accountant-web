package com.devs.web.accountant.application.controllers;

import com.devs.web.accountant.application.services.impl.AuthService;
import com.devs.web.accountant.representation.dtos.AuthResponse;
import com.devs.web.accountant.representation.dtos.SingInDTO;
import com.devs.web.accountant.representation.dtos.SingUpDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
public class AuthController {

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("sign-in")
	public ResponseEntity<AuthResponse> signIn(@RequestBody SingInDTO singIn) {
		return ResponseEntity.ok(this.authService.signIn(singIn));
	}

	@PostMapping("sign-up")
	public ResponseEntity<AuthResponse> signUp(@RequestBody SingUpDTO singUp) {
		return ResponseEntity.ok(this.authService.signUp(singUp));
	}
}
