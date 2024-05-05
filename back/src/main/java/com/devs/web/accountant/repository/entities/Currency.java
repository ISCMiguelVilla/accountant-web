package com.devs.web.accountant.repository.entities;

import com.devs.web.accountant.representation.enums.EnumStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity(name = "currencies")
@Table(schema = "accountant", name = "currencies")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Currency {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	private EnumStatus status;

	@Column(name = "name", nullable = false, unique=true)
	private String name;

	@Column(name = "iso", nullable = false, unique=true)
	private String iso;

	@Column(name = "color")
	private String color;

	@Column(name="created_at", nullable = false)
	private LocalDate createdAt;

	@Column(name="updated_at")
	private LocalDate updatedAt;
}
