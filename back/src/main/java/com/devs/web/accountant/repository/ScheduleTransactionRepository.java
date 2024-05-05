package com.devs.web.accountant.repository;

import com.devs.web.accountant.repository.entities.ScheduleTransaction;
import com.devs.web.accountant.representation.enums.EnumStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ScheduleTransactionRepository extends JpaRepository<ScheduleTransaction, Long> {
	@EntityGraph(value = "ScheduleTransaction.accounts")
	List<ScheduleTransaction> findByNextExecutionLessThanEqualAndStatus(LocalDateTime to, EnumStatus status);

	default List<ScheduleTransaction> applicable(LocalDateTime to) {
		return this.findByNextExecutionLessThanEqualAndStatus(to, EnumStatus.ACTIVE);
	}
}
