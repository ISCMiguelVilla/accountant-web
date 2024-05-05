package com.devs.web.accountant.representation.mappers;

import com.devs.web.accountant.repository.entities.Currency;
import com.devs.web.accountant.representation.dtos.CurrencyDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", implementationPackage = "com.devs.web.accountant.representation.mappers.impl")
public interface CurrencyMapper {

	List<CurrencyDTO> map(List<Currency> currencies);

	CurrencyDTO map(Currency currency);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "updatedAt", ignore = true)
	void update(@MappingTarget Currency currency, CurrencyDTO currencyDTO);
}
