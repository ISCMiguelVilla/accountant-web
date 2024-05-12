package com.devs.web.accountant.application.services.impl;

import com.devs.web.accountant.application.services.AccountService;
import com.devs.web.accountant.config.exceptions.MalformedRequestException;
import com.devs.web.accountant.config.exceptions.ResourceNotFoundException;
import com.devs.web.accountant.repository.AccountRepository;
import com.devs.web.accountant.repository.TransactionRepository;
import com.devs.web.accountant.repository.entities.Account;
import com.devs.web.accountant.repository.entities.User;
import com.devs.web.accountant.representation.dtos.AccountDTO;
import com.devs.web.accountant.representation.enums.EnumAccountType;
import com.devs.web.accountant.representation.mappers.AccountMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class AccountServiceImpl implements AccountService {

	private static final Logger LOGGER = LoggerFactory.getLogger(AccountServiceImpl.class);

	private static final List<EnumAccountType> ACCOUNT_TYPES_WITHOUT_AMOUNT = List.of(
			EnumAccountType.SUPPLIER,
			EnumAccountType.CONSUMER,
			EnumAccountType.GROUP
	);

	private static final Map<EnumAccountType, List<EnumAccountType>> VALID_SUB_ACCOUNT_TYPES = new HashMap<>() {{
		put(EnumAccountType.SUPPLIER, List.of(EnumAccountType.SUPPLIER));
		put(EnumAccountType.STORAGE, List.of(EnumAccountType.STORAGE, EnumAccountType.INVESTMENT));
		put(EnumAccountType.CONSUMER, List.of(EnumAccountType.CONSUMER));
		put(EnumAccountType.BUSINESS, List.of(EnumAccountType.STORAGE, EnumAccountType.INVESTMENT));
		put(EnumAccountType.INVESTMENT, List.of(EnumAccountType.STORAGE, EnumAccountType.INVESTMENT));
		put(EnumAccountType.CREDITOR, List.of(EnumAccountType.CREDITOR));
		put(EnumAccountType.DEBTOR, List.of(EnumAccountType.DEBTOR));
	}};

	private final AccountRepository accountRepository;

	private final TransactionRepository transactionRepository;

	private final AccountMapper accountMapper;

	@Autowired
	public AccountServiceImpl(
			AccountRepository accountRepository,
			TransactionRepository transactionRepository,
			AccountMapper accountMapper
	) {
		this.accountRepository = accountRepository;
		this.transactionRepository = transactionRepository;
		this.accountMapper = accountMapper;
	}

	@Override
	public List<AccountDTO> findAll() {
		LOGGER.debug("findAll called");
		var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return this.accountMapper.mapToAccountsInUse(this.accountRepository.findByUserId(user.getId()));
	}

	@Override
	public AccountDTO findById(Long id) {
		LOGGER.debug("findById method called with id: {}", id);
		var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		var account = this.accountRepository.findByUserIdAndId(user.getId(), id)
				.orElseThrow(() -> {
					LOGGER.error("Account with id {} doesn't exist", id);
					return new ResourceNotFoundException("Account doesn't exist");
				});
		var accountDTO = this.accountMapper.mapToEditAccount(account);

		var hasChildren = account.getSubAccounts().size() > 0;
		accountDTO.setHasChildren(hasChildren);

		var originAccountTransactions = this.transactionRepository.countByOriginId(account.getId());
		var destinationAccountTransactions = this.transactionRepository.countByDestinationId(account.getId());
		var hasTransactions = originAccountTransactions > 0 || destinationAccountTransactions > 0;
		accountDTO.setHasTransactions(hasTransactions);

		return accountDTO;
	}

	@Override
	public AccountDTO create(AccountDTO accountDTO) {
		LOGGER.debug("create method called with account: {}", accountDTO);
		var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		this.accountRepository.findByUserIdAndNameAndType(user.getId(), accountDTO.getName(), accountDTO.getType())
				.ifPresent((account) -> {
					LOGGER.error("Account with name {} and type {} already exists for user wit id {}", accountDTO.getName(), accountDTO.getType(), user.getId());
					throw new MalformedRequestException("Account already exists");
				});

		if( Optional.ofNullable(accountDTO.getAmount()).orElse(BigDecimal.ZERO).compareTo(BigDecimal.ZERO) < 0 ) {
			LOGGER.error("Account has amount {} minimum required is 0", accountDTO.getAmount());
			throw new MalformedRequestException("Couldn't create account with negative amount");
		}

		Account parent = this.getParent(user.getId(), accountDTO.getParent());
		if( parent != null && EnumAccountType.GROUP != parent.getType() && !VALID_SUB_ACCOUNT_TYPES.get(parent.getType()).contains(accountDTO.getType()) ) {
			LOGGER.error("Account couldn't of type {}", accountDTO.getType());
			throw new MalformedRequestException("Sub account not supported");
		}

		var account = this.accountMapper.map(accountDTO);
		account.setId(null);
		account.setUser(user);
		account.setParent(this.getParent(user.getId(), accountDTO.getParent()));
		account.setAmount(this.mapAmount(account.getType(), account.getAmount()));
		account.setColor(account.getColor().toUpperCase());
		account.setCreatedAt(LocalDate.now());
		account.setUpdatedAt(null);
		account.setDeletedAt(null);

		var accountSaved = this.accountRepository.save(account);

		return this.accountMapper.mapToAccountInUse(accountSaved);
	}

	@Override
	public AccountDTO update(Long id, AccountDTO accountDTO) {
		LOGGER.debug("update method called with id: {} and account: {}", id, accountDTO);
		var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		var account = this.accountRepository.findByUserIdAndId(user.getId(), id)
				.orElseThrow(() -> {
					LOGGER.error("Account with id {} doesn't exist", id);
					return new ResourceNotFoundException("Account doesn't exist");
				});

		this.accountRepository.findByUserIdAndNameAndType(user.getId(), accountDTO.getName(), accountDTO.getType())
				.ifPresent((existingAccount) -> {
					if( !accountDTO.getId().equals(existingAccount.getId()) ) {
						LOGGER.error("Account with name {} and type {} already exists for user wit id {}", accountDTO.getName(), accountDTO.getType(), user.getId());
						throw new MalformedRequestException("Account already exists");
					}
				});

		if( Optional.ofNullable(accountDTO.getAmount()).orElse(BigDecimal.ZERO).compareTo(BigDecimal.ZERO) < 0 ) {
			LOGGER.error("Account has amount {} minimum required is 0", accountDTO.getAmount());
			throw new MalformedRequestException("Couldn't create account with negative amount");
		}

		Account parent = this.getParent(user.getId(), accountDTO.getParent());
		if( parent != null && EnumAccountType.GROUP != parent.getType() && !VALID_SUB_ACCOUNT_TYPES.get(parent.getType()).contains(accountDTO.getType()) ) {
			LOGGER.error("Account couldn't of type {}", accountDTO.getType());
			throw new MalformedRequestException("Sub account not supported");
		} else if( account.getType() != accountDTO.getType() ) {
			var hasChildren = account.getSubAccounts().size() > 0;

			var originAccountTransactions = this.transactionRepository.countByOriginId(account.getId());
			var destinationAccountTransactions = this.transactionRepository.countByDestinationId(account.getId());
			var hasTransactions = originAccountTransactions > 0 || destinationAccountTransactions > 0;

			if( (hasChildren || hasTransactions)
					&& !(
						List.of(EnumAccountType.STORAGE, EnumAccountType.INVESTMENT).contains(account.getType())
						&& List.of(EnumAccountType.STORAGE, EnumAccountType.INVESTMENT).contains(accountDTO.getType())
					)
			) {
				LOGGER.error("Account has {} children and {} transactions", account.getSubAccounts().size(), originAccountTransactions + destinationAccountTransactions);
				throw new MalformedRequestException("Couldn't change account type, it already has children or transactions");
			}
		}

		this.accountMapper.update(account, accountDTO);

		if( accountDTO.getParent() != null ) {
			var subAccountIds = account.getSubAccounts().stream().map(Account::getId).toList();
			if( subAccountIds.contains(accountDTO.getParent().getId()) ) {
				LOGGER.error("Account couldn't be child of {}", accountDTO.getParent());
				throw new MalformedRequestException("Parent would be recursive");
			}
		}
		account.setParent(this.getParent(user.getId(), accountDTO.getParent()));

		account.setAmount(this.mapAmount(account.getType(), account.getAmount()));
		account.setColor(account.getColor().toUpperCase());
		account.setUpdatedAt(LocalDate.now());

		var accountSaved = this.accountRepository.save(account);

		return this.accountMapper.mapToAccountInUse(accountSaved);
	}

	private BigDecimal mapAmount(EnumAccountType type, BigDecimal amount) {
		return AccountServiceImpl.ACCOUNT_TYPES_WITHOUT_AMOUNT.contains(type) ? null : amount;
	}

	private Account getParent(Long userId, AccountDTO parentDTO) {
		if( parentDTO == null ) {
			return null;
		}

		if( parentDTO.getId() == null ) {
			throw new MalformedRequestException("Malformed parent");
		}

		return this.accountRepository.findByUserIdAndId(userId, parentDTO.getId())
				.orElseThrow(() -> {
					LOGGER.error("Account with id {} doesn't exit", parentDTO.getId());
					return new ResourceNotFoundException("Parent doesn't exist");
				});
	}

	@Override
	public List<AccountDTO> inUse() {
		LOGGER.debug("inUse called");
		var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		var accountsInUse = this.accountRepository.accountsInUse(user.getId());
		return  this.accountMapper.mapToAccountsInUse(accountsInUse);
	}

	@Override
	public List<AccountDTO> usableAccounts() {
		LOGGER.debug("usableAccounts called");
		var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		var accountsInUse = this.accountRepository.usableAccounts(user.getId());
		return this.accountMapper.mapToAccountsInUse(accountsInUse);
	}
}
