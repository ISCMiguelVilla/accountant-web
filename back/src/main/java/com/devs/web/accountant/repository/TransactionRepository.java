package com.devs.web.accountant.repository;

import com.devs.web.accountant.repository.entities.Transaction;
import com.devs.web.accountant.representation.enums.EnumStatus;
import com.devs.web.accountant.representation.views.BalanceItemView;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	@EntityGraph(value = "Transaction.accounts")
	List<Transaction> findByStatus(EnumStatus status);

	Long countByOriginId(Long id);

	Long countByDestinationId(Long id);

	List<BalanceItemView> balance(String group, LocalDateTime startDate, LocalDateTime endDate);
}
