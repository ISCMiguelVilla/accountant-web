package com.devs.web.accountant.application.services;

import com.devs.web.accountant.representation.dtos.TransactionDTO;

import java.util.List;

public interface TransactionsService {

	TransactionDTO findById(Long id);

	List<TransactionDTO> list();

	TransactionDTO create(TransactionDTO transaction);

	TransactionDTO apply(Long id);

	List<TransactionDTO> createBulk(List<TransactionDTO> transactionDTO);
}
