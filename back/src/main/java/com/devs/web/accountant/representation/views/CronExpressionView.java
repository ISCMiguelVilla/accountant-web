package com.devs.web.accountant.representation.views;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CronExpressionView {

	private String cronExpression;
	private LocalDateTime nextExecution;
}
