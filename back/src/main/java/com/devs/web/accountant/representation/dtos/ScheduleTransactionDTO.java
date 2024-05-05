package com.devs.web.accountant.representation.dtos;

import com.devs.web.accountant.representation.enums.EnumStatus;
import com.devs.web.accountant.representation.enums.EnumTransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleTransactionDTO {

	private Long id;

	private AccountDTO origin;
	private AccountDTO destination;

	private String cronExpression;
	private LocalDateTime nextExecution;
	private LocalDateTime lastExecution;

	private BigDecimal amount;
	private BigDecimal interest;
	private String description;

	private EnumTransactionType type;
	private EnumStatus status;

	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private LocalDateTime deletedAt;
}
