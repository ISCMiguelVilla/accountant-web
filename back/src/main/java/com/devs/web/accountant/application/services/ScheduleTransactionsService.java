package com.devs.web.accountant.application.services;

import com.devs.web.accountant.representation.dtos.ScheduleTransactionDTO;
import com.devs.web.accountant.representation.enums.EnumStatus;
import com.devs.web.accountant.representation.views.CronExpressionView;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleTransactionsService {

	List<ScheduleTransactionDTO> findAll();

	ScheduleTransactionDTO create(ScheduleTransactionDTO scheduleTransactionDTO);

	ScheduleTransactionDTO findById(Long id);

	ScheduleTransactionDTO update(Long id, ScheduleTransactionDTO scheduleTransactionDTO);

	ScheduleTransactionDTO updateStatus(Long id, EnumStatus status);

	ScheduleTransactionDTO nextExecution(Long id, LocalDateTime reference);

	List<ScheduleTransactionDTO> applicable();

	CronExpressionView check(String cronExpression);
}
