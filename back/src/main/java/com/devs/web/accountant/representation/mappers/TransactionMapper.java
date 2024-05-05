package com.devs.web.accountant.representation.mappers;

import com.devs.web.accountant.repository.entities.Transaction;
import com.devs.web.accountant.representation.dtos.TransactionDTO;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(
		componentModel = "spring",
		implementationPackage = "com.devs.web.accountant.representation.mappers.impl",
		uses = {
			AccountMapper.class
		}
)
public interface TransactionMapper {

	@IterableMapping(qualifiedByName = "mapToTransaction")
	List<TransactionDTO> map(List<Transaction> transactions);

	@Named("mapToTransaction")
	@Mapping(target = "origin", qualifiedByName = "isolatedAccount")
	@Mapping(target = "destination", qualifiedByName = "isolatedAccount")
	TransactionDTO map(Transaction transaction);

	List<Transaction> mapTo(List<TransactionDTO> transactionDTO);

	Transaction mapTo(TransactionDTO transactionDTO);
}
