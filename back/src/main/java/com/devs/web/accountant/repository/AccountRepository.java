package com.devs.web.accountant.repository;

import com.devs.web.accountant.repository.entities.Account;
import com.devs.web.accountant.representation.enums.EnumAccountType;
import com.devs.web.accountant.representation.enums.EnumStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

	@EntityGraph(value = "Account.parent")
	List<Account> findByUserIdAndStatusInAndTypeNotInAndIncludeInBalanceTrueAndAmountGreaterThan(Long id, List<EnumStatus> status, List<EnumAccountType> excludedTypes, BigDecimal minimumAmount);

	default List<Account> accountsInUse(Long userId) {
		var excludedTypes = List.of(EnumAccountType.SUPPLIER, EnumAccountType.GROUP, EnumAccountType.CONSUMER);
		return this.findByUserIdAndStatusInAndTypeNotInAndIncludeInBalanceTrueAndAmountGreaterThan(userId, List.of(EnumStatus.ACTIVE), excludedTypes, BigDecimal.ZERO);
	}

	@EntityGraph(value = "Account.parent")
	List<Account> findByUserIdAndStatusInAndTypeNotIn(Long id, List<EnumStatus> status, List<EnumAccountType> excludedTypes);

	default List<Account> usableAccounts(Long userId) {
		var excludedTypes = List.of(EnumAccountType.GROUP);
		return this.findByUserIdAndStatusInAndTypeNotIn(userId, List.of(EnumStatus.ACTIVE), excludedTypes);
	}

	List<Account> findByUserIdAndIdInAndStatus(Long userId, Set<Long> ids, EnumStatus status);

	default List<Account> usedAccounts(Long userId, Set<Long> ids) {
		return this.findByUserIdAndIdInAndStatus(userId, ids, EnumStatus.ACTIVE);
	}

	List<Account> findByUserId(Long userId);

	@EntityGraph(value = "Account.subAccounts")
	Optional<Account> findByUserIdAndId(Long userId, Long id);

	Optional<Account> findByUserIdAndNameAndType(Long userId, String name, EnumAccountType type);
}
