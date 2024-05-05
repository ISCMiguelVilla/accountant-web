package com.devs.web.accountant.representation.dtos;

import com.devs.web.accountant.representation.enums.EnumOperationType;
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
public class TransactionDTO {

	private Long id;
	private Long scheduleTransactionId;

	private AccountDTO origin;
	private AccountDTO destination;

	private BigDecimal amount;
	private BigDecimal interest;
	private String description;
	private Boolean applied;
	private EnumTransactionType type;
	private EnumOperationType operationType;
	private EnumStatus status;
	private LocalDateTime appliedAt;
	private LocalDateTime savedAt;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private LocalDateTime deletedAt;
}
