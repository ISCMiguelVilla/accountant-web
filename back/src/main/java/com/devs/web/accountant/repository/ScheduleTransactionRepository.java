package com.devs.web.accountant.repository;

import com.devs.web.accountant.repository.entities.ScheduleTransaction;
import com.devs.web.accountant.representation.enums.EnumStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleTransactionRepository extends JpaRepository<ScheduleTransaction, Long> {

	@EntityGraph(value = "ScheduleTransaction.accounts")
	List<ScheduleTransaction> findByUserIdAndNextExecutionLessThanEqualAndStatus(Long id, LocalDateTime to, EnumStatus status);

	default List<ScheduleTransaction> applicable(Long id, LocalDateTime to) {
		return this.findByUserIdAndNextExecutionLessThanEqualAndStatus(id, to, EnumStatus.ACTIVE);
	}

	List<ScheduleTransaction> findByUserId(Long userId);

	Optional<ScheduleTransaction> findByUserIdAndId(Long userId, Long id);
}
