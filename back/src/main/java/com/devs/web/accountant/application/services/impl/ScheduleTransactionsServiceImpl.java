package com.devs.web.accountant.application.services.impl;

import com.devs.web.accountant.application.services.ScheduleTransactionsService;
import com.devs.web.accountant.repository.AccountRepository;
import com.devs.web.accountant.repository.ScheduleTransactionRepository;
import com.devs.web.accountant.repository.entities.User;
import com.devs.web.accountant.representation.dtos.ScheduleTransactionDTO;
import com.devs.web.accountant.representation.enums.EnumStatus;
import com.devs.web.accountant.representation.mappers.ScheduleTransactionMapper;
import com.devs.web.accountant.representation.views.CronExpressionView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.support.CronExpression;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleTransactionsServiceImpl implements ScheduleTransactionsService {

	private static final Long BEFORE_RANGE = 2L;

	private static final Long AFTER_RANGE = 1L;

	private final ScheduleTransactionRepository scheduleTransactionRepository;

	private final ScheduleTransactionMapper scheduleTransactionMapper;

	private final AccountRepository accountRepository;

	@Autowired
	private ScheduleTransactionsServiceImpl(
			ScheduleTransactionRepository scheduleTransactionRepository,
			ScheduleTransactionMapper scheduleTransactionMapper,
			AccountRepository accountRepository
	) {
		this.scheduleTransactionRepository = scheduleTransactionRepository;
		this.scheduleTransactionMapper = scheduleTransactionMapper;
		this.accountRepository = accountRepository;
	}

	@Override
	public List<ScheduleTransactionDTO> findAll() {
		return this.scheduleTransactionMapper.map(this.scheduleTransactionRepository.findAll());
	}

	@Override
	public ScheduleTransactionDTO create(ScheduleTransactionDTO scheduleTransactionDTO) {
		var cronExpressionString = scheduleTransactionDTO.getCronExpression();
		var isValidExpression = CronExpression.isValidExpression(cronExpressionString);
		if( !isValidExpression ) {
			throw new RuntimeException("Invalid cron expression");
		}

		var cronExpression = CronExpression.parse(cronExpressionString);
		var today = LocalDate.now().atStartOfDay();
		var nextExecution = cronExpression.next(today);

		var scheduleTransaction = this.scheduleTransactionMapper.mapTo(scheduleTransactionDTO);
		scheduleTransaction.setUser(User.builder().id(1L).build());
		scheduleTransaction.setNextExecution(nextExecution);
		scheduleTransaction.setCreatedAt(LocalDateTime.now());
		this.scheduleTransactionRepository.save(scheduleTransaction);
		return this.scheduleTransactionMapper.map(scheduleTransaction);
	}

	@Override
	public ScheduleTransactionDTO findById(Long id) {
		var scheduleTransaction = this.scheduleTransactionRepository.findById(id).get();
		return this.scheduleTransactionMapper.map(scheduleTransaction);
	}

	@Override
	public ScheduleTransactionDTO update(Long id, ScheduleTransactionDTO scheduleTransactionDTO) {
		var scheduleTransaction = this.scheduleTransactionRepository.findById(id).get();
		this.scheduleTransactionMapper.update(scheduleTransaction, scheduleTransactionDTO);

		var origin = this.accountRepository.findById(scheduleTransactionDTO.getOrigin().getId()).get();
		scheduleTransaction.setOrigin(origin);

		var destination = this.accountRepository.findById(scheduleTransactionDTO.getDestination().getId()).get();
		scheduleTransaction.setDestination(destination);

		this.scheduleTransactionRepository.save(scheduleTransaction);

		return this.scheduleTransactionMapper.map(scheduleTransaction);
	}

	@Override
	public ScheduleTransactionDTO updateStatus(Long id, EnumStatus status) {
		var scheduleTransaction = this.scheduleTransactionRepository.findById(id).get();
		scheduleTransaction.setStatus(status);
		this.scheduleTransactionRepository.save(scheduleTransaction);

		return this.scheduleTransactionMapper.map(scheduleTransaction);
	}

	@Override
	public ScheduleTransactionDTO nextExecution(Long id, LocalDateTime reference) {
		var scheduleTransaction = this.scheduleTransactionRepository.findById(id).get();

		var cronExpression = CronExpression.parse(scheduleTransaction.getCronExpression());
		var lastExecution = Optional.ofNullable(reference).orElse(scheduleTransaction.getNextExecution());
		var nextExecution = cronExpression.next(lastExecution);

		scheduleTransaction.setNextExecution(nextExecution);
		this.scheduleTransactionRepository.save(scheduleTransaction);

		return this.scheduleTransactionMapper.map(scheduleTransaction);
	}

	@Override
	public List<ScheduleTransactionDTO> applicable() {
		var from = LocalDate.now().minusDays(BEFORE_RANGE).atStartOfDay();
		var to = LocalDate.now().plusDays(AFTER_RANGE).atTime(LocalTime.MAX);

		var scheduleTransactions = this.scheduleTransactionRepository.applicable(to);
		return this.scheduleTransactionMapper.map(scheduleTransactions);
	}

	@Override
	public CronExpressionView check(String cronExpressionString) {
		var isValidExpression = CronExpression.isValidExpression(cronExpressionString);
		if( !isValidExpression ) {
			throw new RuntimeException("Invalid cron expression");
		}

		var cronExpression = CronExpression.parse(cronExpressionString);
		var today = LocalDate.now().atStartOfDay();
		var nextExecution = cronExpression.next(today);

		return CronExpressionView.builder()
				.cronExpression(cronExpressionString)
				.nextExecution(nextExecution)
				.build();
	}
}
