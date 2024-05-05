package com.devs.web.accountant.repository;

import com.devs.web.accountant.repository.entities.Currency;
import com.devs.web.accountant.representation.enums.EnumStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CurrencyRepository extends JpaRepository<Currency, Long> {

	List<Currency> findByStatus(EnumStatus status);

	default List<Currency> usable() {
		return this.findByStatus(EnumStatus.ACTIVE);
	}
}
