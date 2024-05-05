package com.devs.web.accountant.representation.dtos;

import com.devs.web.accountant.representation.enums.EnumStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CurrencyDTO {

	private Long id;
	private EnumStatus status;
	private String name;
	private String iso;
	private String color;
	private LocalDate createdAt;
	private LocalDate updatedAt;
}
