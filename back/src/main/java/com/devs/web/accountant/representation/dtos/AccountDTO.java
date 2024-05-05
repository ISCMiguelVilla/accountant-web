package com.devs.web.accountant.representation.dtos;

import com.devs.web.accountant.representation.enums.EnumAccountType;
import com.devs.web.accountant.representation.enums.EnumStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountDTO {

	private Long id;

	private CurrencyDTO currency;
	public AccountDTO parent;
	private List<AccountDTO> subAccounts;
	private List<TransactionDTO> origins;
	private List<TransactionDTO> destinations;

	private String name;
	private BigDecimal amount;
	private String icon;
	private String color;
	private Boolean includeInBalance;
	private Boolean isTemporal;
	private EnumStatus status;
	private EnumAccountType type;
	private LocalDate createdAt;
	private LocalDate updatedAt;
	private LocalDate deletedAt;

	private Boolean hasChildren;
	private Boolean hasTransactions;
}
