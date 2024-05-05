package com.devs.web.accountant.representation.mappers;

import com.devs.web.accountant.repository.entities.Account;
import com.devs.web.accountant.representation.dtos.AccountDTO;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", implementationPackage = "com.devs.web.accountant.representation.mappers.impl")
public interface AccountMapper {

	@IterableMapping(qualifiedByName = "mapToAccountInUse")
	List<AccountDTO> mapToAccountsInUse(List<Account> accounts);

	@Named("mapToAccountInUse")
	@Mapping(target = "parent", qualifiedByName = "isolatedAccount")
	@Mapping(target = "subAccounts", ignore = true)
	@Mapping(target = "origins", ignore = true)
	@Mapping(target = "destinations", ignore = true)
	AccountDTO mapToAccountInUse(Account account);

	@Named("isolatedAccount")
	@Mapping(target = "parent", ignore = true)
	@Mapping(target = "subAccounts", ignore = true)
	@Mapping(target = "origins", ignore = true)
	@Mapping(target = "destinations", ignore = true)
	AccountDTO mapIsolatedAccount(Account account);

	Account map(AccountDTO account);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "user", ignore = true)
	@Mapping(target = "subAccounts", ignore = true)
	@Mapping(target = "origins", ignore = true)
	@Mapping(target = "destinations", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "updatedAt", ignore = true)
	@Mapping(target = "deletedAt", ignore = true)
	void update(@MappingTarget Account account, AccountDTO accountDTO);

	@Named("mapToEditAccount")
	@Mapping(target = "parent", qualifiedByName = "isolatedAccount")
	@Mapping(target = "origins", ignore = true)
	@Mapping(target = "destinations", ignore = true)
	AccountDTO mapToEditAccount(Account account);
}
