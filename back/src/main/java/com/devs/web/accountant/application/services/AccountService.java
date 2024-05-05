package com.devs.web.accountant.application.services;

import com.devs.web.accountant.representation.dtos.AccountDTO;

import java.util.List;

public interface AccountService {

	List<AccountDTO> findAll();

	AccountDTO findById(Long id);

	AccountDTO create(AccountDTO accountDTO);

	AccountDTO update(Long id, AccountDTO accountDTO);

	List<AccountDTO> inUse();

	List<AccountDTO> usableAccounts();
}
