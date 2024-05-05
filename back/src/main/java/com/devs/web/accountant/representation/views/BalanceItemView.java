package com.devs.web.accountant.representation.views;

import com.devs.web.accountant.representation.enums.EnumOperationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BalanceItemView {

	private Object date;
	private EnumOperationType operationType;
	private BigDecimal amount;
}
