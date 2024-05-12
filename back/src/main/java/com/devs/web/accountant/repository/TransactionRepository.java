package com.devs.web.accountant.repository;

import com.devs.web.accountant.repository.entities.Transaction;
import com.devs.web.accountant.representation.enums.EnumStatus;
import com.devs.web.accountant.representation.views.BalanceItemView;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	@EntityGraph(value = "Transaction.accounts")
	List<Transaction> findByStatus(EnumStatus status);

	@EntityGraph(value = "Transaction.accounts")
	List<Transaction> findByUserIdAndStatus(Long userId, EnumStatus status);

	default List<Transaction> list(Long userId) {
		return findByUserIdAndStatus(userId, EnumStatus.ACTIVE);
	}

	Long countByOriginId(Long id);

	Long countByDestinationId(Long id);

	Optional<Transaction> findByUserIdAndId(Long userId, Long id);

	List<BalanceItemView> balance(Long userId, String group, LocalDateTime startDate, LocalDateTime endDate);
}
