package com.devs.web.accountant.application.controllers;

import com.devs.web.accountant.application.services.ScheduleTransactionsService;
import com.devs.web.accountant.representation.dtos.ScheduleTransactionDTO;
import com.devs.web.accountant.representation.enums.EnumStatus;
import com.devs.web.accountant.representation.views.CronExpressionView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/schedule-transactions")
public class ScheduleTransactionsController {

	private final ScheduleTransactionsService scheduleTransactionsService;

	@Autowired
	public ScheduleTransactionsController(
			ScheduleTransactionsService scheduleTransactionsService
	) {
		this.scheduleTransactionsService = scheduleTransactionsService;
	}

	@GetMapping
	public ResponseEntity<List<ScheduleTransactionDTO>> findAll() {
		return ResponseEntity.ok(this.scheduleTransactionsService.findAll());
	}

	@PostMapping
	public ResponseEntity<ScheduleTransactionDTO> create(
			@RequestBody ScheduleTransactionDTO scheduleTransaction
	) {
		return ResponseEntity.ok(this.scheduleTransactionsService.create(scheduleTransaction));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ScheduleTransactionDTO> findById(
			@PathVariable("id") Long id
	) {
		return ResponseEntity.ok(this.scheduleTransactionsService.findById(id));
	}

	@PatchMapping("/{id}")
	public ResponseEntity<ScheduleTransactionDTO> update(
			@PathVariable("id") Long id,
			@RequestBody ScheduleTransactionDTO scheduleTransaction
	) {
		return ResponseEntity.ok(this.scheduleTransactionsService.update(id, scheduleTransaction));
	}

	@PatchMapping("/{id}/status")
	public ResponseEntity<ScheduleTransactionDTO> updateStatus(
			@PathVariable("id") Long id,
			@RequestParam("status") EnumStatus status
	) {
		return ResponseEntity.status(HttpStatus.ACCEPTED)
				.body(this.scheduleTransactionsService.updateStatus(id, status));
	}

	@PatchMapping("/{id}/next-execution")
	public ResponseEntity<ScheduleTransactionDTO> nextExecution(
			@PathVariable("id") Long id,
			@RequestParam(value = "status", required = false) LocalDateTime reference
	) {
		return ResponseEntity.status(HttpStatus.ACCEPTED)
				.body(this.scheduleTransactionsService.nextExecution(id, reference));
	}

	@GetMapping("/applicable")
	public ResponseEntity<List<ScheduleTransactionDTO>> applicable() {
		return ResponseEntity.ok(this.scheduleTransactionsService.applicable());
	}

	@GetMapping("/check")
	public ResponseEntity<CronExpressionView> check(@RequestParam(value = "cron-expression") String cronExpression) {
		return ResponseEntity.ok(this.scheduleTransactionsService.check(cronExpression));
	}
}
