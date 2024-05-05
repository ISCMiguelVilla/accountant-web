package com.devs.web.accountant.application.services.impl;

import com.devs.web.accountant.application.services.CurrenciesService;
import com.devs.web.accountant.repository.CurrencyRepository;
import com.devs.web.accountant.repository.entities.Currency;
import com.devs.web.accountant.representation.dtos.CurrencyDTO;
import com.devs.web.accountant.representation.mappers.CurrencyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CurrenciesServiceImpl implements CurrenciesService {

	private final CurrencyRepository currencyRepository;

	private final CurrencyMapper currencyMapper;

	@Autowired
	public CurrenciesServiceImpl(
			CurrencyRepository currencyRepository,
			CurrencyMapper currencyMapper
	) {
		this.currencyRepository = currencyRepository;
		this.currencyMapper = currencyMapper;
	}

	@Override
	public List<CurrencyDTO> findAll() {
		return this.currencyMapper.map(this.currencyRepository.findAll());
	}

	@Override
	public CurrencyDTO create(CurrencyDTO currencyDTO) {
		var currency = new Currency();
		this.currencyMapper.update(currency, currencyDTO);
		currency.setCreatedAt(LocalDate.now());
		return this.currencyMapper.map(this.currencyRepository.save(currency));
	}

	@Override
	public CurrencyDTO findById(Long id) {
		return this.currencyMapper.map(this.currencyRepository.findById(id).get());
	}

	@Override
	public CurrencyDTO update(Long id, CurrencyDTO currencyDTO) {
		var currency = this.currencyRepository.findById(id).get();
		this.currencyMapper.update(currency, currencyDTO);
		currency.setUpdatedAt(LocalDate.now());
		return this.currencyMapper.map(this.currencyRepository.save(currency));
	}

	@Override
	public List<CurrencyDTO> usable() {
		return this.currencyMapper.map(this.currencyRepository.usable());
	}
}
