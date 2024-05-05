package com.devs.web.accountant.application.services;

import com.devs.web.accountant.representation.dtos.CurrencyDTO;

import java.util.List;

public interface CurrenciesService {

	List<CurrencyDTO> findAll();

	CurrencyDTO create(CurrencyDTO currencyDTO);

	CurrencyDTO findById(Long id);

	CurrencyDTO update(Long id, CurrencyDTO currencyDTO);

	List<CurrencyDTO> usable();
}
