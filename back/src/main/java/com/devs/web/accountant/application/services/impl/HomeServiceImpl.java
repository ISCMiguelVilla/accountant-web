package com.devs.web.accountant.application.services.impl;

import com.devs.web.accountant.application.services.HomeService;
import com.devs.web.accountant.repository.TransactionRepository;
import com.devs.web.accountant.representation.enums.EnumDimension;
import com.devs.web.accountant.representation.views.BalanceItemView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HomeServiceImpl implements HomeService {

	private final TransactionRepository transactionRepository;

	private static final String DATE_FORMAT = "yyyy-MM-dd";

	private static final Map<EnumDimension, String> GROUP_SIZES = new HashMap<>() {{
		put(EnumDimension.YEAR, "%Y");
		put(EnumDimension.MONTH, "%Y-%m");
		put(EnumDimension.WEEK, "%Y-%m-%d");
		put(EnumDimension.DAY, "%Y-%m-%d");
	}};

	private static final Map<EnumDimension, String> DATE_COMPLEMENT = new HashMap<>() {{
		put(EnumDimension.YEAR, "-01-01");
		put(EnumDimension.MONTH, "-01");
		put(EnumDimension.WEEK, "");
		put(EnumDimension.DAY, "");
	}};


	@Autowired
	public HomeServiceImpl(
			TransactionRepository transactionRepository
	) {
		this.transactionRepository = transactionRepository;
	}

	@Override
	public List<BalanceItemView> balance(EnumDimension dimension, Integer size, String reference) {
		var formatter = DateTimeFormatter.ofPattern(DATE_FORMAT);
		var referenceDate = LocalDate.parse(reference + DATE_COMPLEMENT.get(dimension), formatter).atStartOfDay();

		var wideLeft = size / 2 - 1;
		var wideRight = size - wideLeft;
		var left = this.left(referenceDate, dimension, wideLeft);
		var right = this.right(referenceDate, dimension, wideRight);

		String group = GROUP_SIZES.get(dimension);

		return this.transactionRepository.balance(group, left, right);
	}

	public LocalDateTime left(LocalDateTime reference, EnumDimension dimension, Integer wideLeft) {
		LocalDateTime left;
		if( EnumDimension.YEAR == dimension ) {
			left = reference.minusYears(wideLeft);
		} else if( EnumDimension.MONTH == dimension ) {
			left = reference.minusMonths(wideLeft);
		} else if( EnumDimension.WEEK == dimension ) {
			left = reference.minusWeeks(wideLeft);
		} else {
			left = reference.minusDays(wideLeft);
		}
		return left;
	}

	public LocalDateTime right(LocalDateTime reference, EnumDimension dimension, Integer wideLeft) {
		LocalDateTime left;
		if( EnumDimension.YEAR == dimension ) {
			left = reference.plusYears(wideLeft);
		} else if( EnumDimension.MONTH == dimension ) {
			left = reference.plusMonths(wideLeft);
		} else if( EnumDimension.WEEK == dimension ) {
			left = reference.plusWeeks(wideLeft);
		} else {
			left = reference.plusDays(wideLeft);
		}
		return left;
	}
}
