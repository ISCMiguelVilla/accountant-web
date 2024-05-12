package com.devs.web.accountant.application.services.impl;

import com.devs.web.accountant.config.security.jwt.JWTService;
import com.devs.web.accountant.repository.UserRepository;
import com.devs.web.accountant.repository.entities.User;
import com.devs.web.accountant.representation.dtos.AuthResponse;
import com.devs.web.accountant.representation.dtos.SingInDTO;
import com.devs.web.accountant.representation.dtos.SingUpDTO;
import com.devs.web.accountant.representation.enums.EnumRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

	private final UserRepository userRepository;

	private final JWTService jwtService;

	private final AuthenticationManager authenticationManager;

	private final PasswordEncoder passwordEncoder;

	@Autowired
	public AuthService(
			UserRepository userRepository,
			JWTService jwtService,
			AuthenticationManager authenticationManager,
			PasswordEncoder passwordEncoder
	) {
		this.userRepository = userRepository;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
		this.passwordEncoder = passwordEncoder;
	}

	public AuthResponse signIn(SingInDTO singIn) {
		this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(singIn.getUsername(), singIn.getPassword()));
		UserDetails userDetails = userRepository.findByUsername(singIn.getUsername()).orElseThrow();
		String token = jwtService.getToken(userDetails);
		return AuthResponse.builder()
				.token(token)
				.build();
	}

	public AuthResponse signUp(SingUpDTO singUp) {
		var user = User.builder()
				.name(singUp.getName())
				.username(singUp.getUsername())
				.password(passwordEncoder.encode(singUp.getPassword()))
				.role(EnumRole.ADMIN)
				.build();

		this.userRepository.save(user);

		return AuthResponse.builder()
				.token(jwtService.getToken(user))
				.build();
	}
}
