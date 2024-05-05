package com.devs.web.accountant.application.services.impl;

import com.devs.web.accountant.application.services.TransactionsService;
import com.devs.web.accountant.config.exceptions.InsufficientFundsException;
import com.devs.web.accountant.config.exceptions.ResourceNotFoundException;
import com.devs.web.accountant.config.exceptions.SenselessTransactionException;
import com.devs.web.accountant.config.exceptions.TransactionNotSupportedException;
import com.devs.web.accountant.repository.AccountRepository;
import com.devs.web.accountant.repository.ScheduleTransactionRepository;
import com.devs.web.accountant.repository.TransactionRepository;
import com.devs.web.accountant.repository.entities.Account;
import com.devs.web.accountant.repository.entities.Transaction;
import com.devs.web.accountant.repository.entities.User;
import com.devs.web.accountant.representation.dtos.AccountDTO;
import com.devs.web.accountant.representation.dtos.TransactionDTO;
import com.devs.web.accountant.representation.enums.EnumAccountType;
import com.devs.web.accountant.representation.enums.EnumOperationType;
import com.devs.web.accountant.representation.enums.EnumStatus;
import com.devs.web.accountant.representation.enums.EnumTransactionType;
import com.devs.web.accountant.representation.mappers.TransactionMapper;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.support.CronExpression;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

class OriginsDestinations {
	List<EnumAccountType> origins;
	List<EnumAccountType> destinations;
	boolean destinationOptional;

	OriginsDestinations(List<EnumAccountType> origins) {
		this.origins = origins;
		this.destinationOptional = true;
	}

	OriginsDestinations(List<EnumAccountType> origins, List<EnumAccountType> destinations) {
		this.origins = origins;
		this.destinations = destinations;
		this.destinationOptional = false;
	}

	OriginsDestinations(List<EnumAccountType> origins, List<EnumAccountType> destinations, boolean destinationOptional) {
		this.origins = origins;
		this.destinations = destinations;
		this.destinationOptional = destinationOptional;
	}
}

@Service
public class TransactionsServiceImpl implements TransactionsService {

	private static final Logger LOGGER = LoggerFactory.getLogger(TransactionsServiceImpl.class);

	private static final List<EnumTransactionType> TRANSACTION_TYPES_WITH_DESTINATION_OPTIONAL = List.of(
			EnumTransactionType.DIVIDEND,
			EnumTransactionType.INTEREST
	);

	private static final List<EnumTransactionType> ADDITION_TRANSACTIONS =  Arrays.asList(
			EnumTransactionType.INCOME,
			EnumTransactionType.DIVIDEND
	);

	private static final List<EnumTransactionType> SUBTRACTION_TRANSACTIONS =  Arrays.asList(
			EnumTransactionType.EXPENSE,
			EnumTransactionType.INTEREST
	);

	private static final List<EnumTransactionType> NEUTER_TRANSACTIONS =  Arrays.asList(
			EnumTransactionType.TRANSFER,
			EnumTransactionType.INVEST,
			EnumTransactionType.PROFIT,

			EnumTransactionType.BORROW,
			EnumTransactionType.COLLECTION,
			EnumTransactionType.DEBT,
			EnumTransactionType.PAYMENT
	);

	private static final Map<EnumTransactionType, OriginsDestinations> VALID_ACCOUNTS_PER_TRANSACTION = new HashMap<EnumTransactionType, OriginsDestinations>() {{
		put(EnumTransactionType.INCOME, new OriginsDestinations(
				List.of(EnumAccountType.SUPPLIER),
				List.of(EnumAccountType.STORAGE)
		));
		put(EnumTransactionType.EXPENSE, new OriginsDestinations(
				List.of(EnumAccountType.STORAGE),
				List.of(EnumAccountType.CONSUMER)
		));

		put(EnumTransactionType.TRANSFER, new OriginsDestinations(
				List.of(EnumAccountType.STORAGE),
				List.of(EnumAccountType.STORAGE)
		));

		put(EnumTransactionType.INVEST, new OriginsDestinations(
				List.of(EnumAccountType.STORAGE, EnumAccountType.INVESTMENT),
				List.of(EnumAccountType.INVESTMENT, EnumAccountType.BUSINESS)
		));
		put(EnumTransactionType.PROFIT, new OriginsDestinations(
				List.of(EnumAccountType.INVESTMENT, EnumAccountType.BUSINESS),
				List.of(EnumAccountType.STORAGE, EnumAccountType.INVESTMENT)
		));

		put(EnumTransactionType.DIVIDEND, new OriginsDestinations(
				List.of(EnumAccountType.INVESTMENT, EnumAccountType.BUSINESS, EnumAccountType.STORAGE, EnumAccountType.CREDITOR),
				List.of(EnumAccountType.INVESTMENT, EnumAccountType.BUSINESS, EnumAccountType.STORAGE, EnumAccountType.CREDITOR),
				true
		));
		put(EnumTransactionType.INTEREST, new OriginsDestinations(
				List.of(EnumAccountType.INVESTMENT, EnumAccountType.BUSINESS, EnumAccountType.STORAGE, EnumAccountType.DEBTOR)
		));

		put(EnumTransactionType.BORROW, new OriginsDestinations(
				List.of(EnumAccountType.STORAGE),
				List.of(EnumAccountType.CREDITOR)
		));
		put(EnumTransactionType.COLLECTION, new OriginsDestinations(
				List.of(EnumAccountType.CREDITOR),
				List.of(EnumAccountType.STORAGE)
		));

		put(EnumTransactionType.DEBT, new OriginsDestinations(
				List.of(EnumAccountType.DEBTOR),
				List.of(EnumAccountType.STORAGE, EnumAccountType.CONSUMER)
		));
		put(EnumTransactionType.PAYMENT, new OriginsDestinations(
				List.of(EnumAccountType.STORAGE),
				List.of(EnumAccountType.DEBTOR)
		));
	}};

	private final TransactionRepository transactionRepository;

	private final AccountRepository accountRepository;

	private final ScheduleTransactionRepository scheduleTransactionRepository;

	private final TransactionMapper transactionMapper;

	@Autowired
	public TransactionsServiceImpl(
			TransactionRepository transactionRepository,
			AccountRepository accountRepository,
			ScheduleTransactionRepository scheduleTransactionRepository,
			TransactionMapper transactionMapper
	) {
		this.transactionRepository = transactionRepository;
		this.accountRepository = accountRepository;
		this.scheduleTransactionRepository = scheduleTransactionRepository;
		this.transactionMapper = transactionMapper;
	}

	@Override
	public TransactionDTO findById(Long id) {
		return this.transactionMapper.map(this.transactionRepository.findById(id).get());
	}

	@Override
	public List<TransactionDTO> list() {
		return this.transactionMapper.map(this.transactionRepository.findByStatus(EnumStatus.ACTIVE));
	}

	@Override
	public TransactionDTO create(TransactionDTO transaction) {
		var transactions = this.createBulk(List.of(transaction));
		return transactions.get(0);
	}

	@Override
	public TransactionDTO apply(Long id) {
		var transaction = this.transactionRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Transaction with id " + id + " not found"));

		if( transaction.getApplied() ) {
			return this.transactionMapper.map(transaction);
		}

		if( List.of(EnumTransactionType.TRANSFER, EnumTransactionType.INVEST, EnumTransactionType.PROFIT).contains(transaction.getType()) ) {
			this.applyTransferOfFunds(transaction);
		} else if(Objects.equals(EnumTransactionType.EXPENSE, transaction.getType())) {
			this.applyExpense(transaction);
		} else if(Objects.equals(EnumTransactionType.DEBT, transaction.getType())) {
			this.applyDebt(transaction);
		} else {
			throw new TransactionNotSupportedException("Transaction with id " + id + " is not applicable");
		}

		transaction.setApplied(Boolean.TRUE);
		transaction.setAppliedAt(LocalDateTime.now());
		this.transactionRepository.save(transaction);

		return this.transactionMapper.map(transaction);
	}

	private void applyTransferOfFunds(Transaction transaction) {
		var destination = this.accountRepository.findById(transaction.getDestination().getId())
				.orElseThrow(() -> {
					LOGGER.warn("apply - Destination is required.");
					return new ResourceNotFoundException("Destination is required.");
				});
		var interest = Optional.ofNullable(transaction.getInterest()).orElse(BigDecimal.ZERO);
		destination.setAmount(destination.getAmount().add(transaction.getAmount().subtract(interest)));
		transaction.setDestination(destination);
		this.accountRepository.save(destination);
	}

	private void applyExpense(Transaction transaction) {
		var origin = this.accountRepository.findById(transaction.getOrigin().getId())
				.orElseThrow(() -> {
					LOGGER.warn("valid - Origen is required.");
					throw new ResourceNotFoundException("Origen is required.");
				});

		this.applyExpense(origin, null, transaction);

		this.accountRepository.save(origin);
	}

	private void applyExpense(Account origin, Account destination, Transaction transaction) {
		var interest = Optional.ofNullable(transaction.getInterest()).orElse(BigDecimal.ZERO);

		if( transaction.getAmount().add(interest).compareTo(origin.getAmount()) > 0 ) {
			throw new InsufficientFundsException("Account [" + origin.getName() + "] has [" + origin.getAmount() + "] but requires [" + transaction.getAmount() + "]");
		}

		origin.setAmount(origin.getAmount().subtract(transaction.getAmount().add(interest)));

		this.accountRepository.save(origin);
	}

	private void applyDebt(Transaction transaction) {
		var destination = this.accountRepository.findById(transaction.getDestination().getId())
				.orElseThrow(() -> {
					LOGGER.warn("apply - Destination is required.");
					return new ResourceNotFoundException("Destination is required.");
				});

		var interest = Optional.ofNullable(transaction.getInterest()).orElse(BigDecimal.ZERO);
		destination.setAmount(destination.getAmount().add(transaction.getAmount().subtract(interest)));
	}

	@Override
	@Transactional
	public List<TransactionDTO> createBulk(List<TransactionDTO> transactions) {
		this.valid(transactions);

		var accountIds = this.getAccountIds(transactions);
		var accounts = this.accountRepository.usedAccounts(1L, accountIds);

		transactions.sort(Comparator.comparing(TransactionDTO::getSavedAt));

		transactions.forEach(transaction -> {
			transaction.setApplied(false);
			Optional.ofNullable(transaction.getAppliedAt()).ifPresent((_appliedAt) -> transaction.setApplied(true));

			this.applyTransaction(accounts, transaction);
		});

		var transactionsSaved = this.saveTransactions(transactions);

		this.nextExecutions(transactions);

		return this.transactionMapper.map(transactionsSaved);
	}

	private void valid(List<TransactionDTO> transactions) {
		transactions.forEach(transactionDTO -> {
			var originOptional = Optional.ofNullable(transactionDTO.getOrigin());
			if( originOptional.isEmpty() ) {
				LOGGER.warn("valid - Origen is required.");
				throw new ResourceNotFoundException("Origen is required.");
			}

			var origin = transactionDTO.getOrigin();
			var destination = transactionDTO.getDestination();
			if( destination == null && !TRANSACTION_TYPES_WITH_DESTINATION_OPTIONAL.contains(transactionDTO.getType()) ) {
				LOGGER.warn("valid - Destination is required.");
				throw new ResourceNotFoundException("Destination is required.");
			}

			var originsDestinations = VALID_ACCOUNTS_PER_TRANSACTION.get(transactionDTO.getType());

			var destinationOptional = Optional.ofNullable(destination);
			var isDestinationValid = (destinationOptional.isEmpty() && originsDestinations.destinationOptional) || originsDestinations.destinations.contains(destination.getType());

			if( !( originsDestinations.origins.contains(origin.getType()) && isDestinationValid ) ) {
				if( destinationOptional.isEmpty() ) {
					this.throwTransactionNotSupportedException(transactionDTO.getType(), origin.getType());
				} else {
					this.throwTransactionNotSupportedException(transactionDTO.getType(), origin.getType(), destination.getType());
				}
			}
		});
	}

	private Set<Long> getAccountIds(List<TransactionDTO> transactions) {
		return transactions.stream()
				.flatMap(transaction -> Stream.of(transaction.getOrigin(), transaction.getDestination()))
				.filter(Objects::nonNull)
				.map(AccountDTO::getId)
				.collect(Collectors.toSet());
	}

	private List<Transaction> saveTransactions(List<TransactionDTO> transactionsDTO) {
		var transactions = transactionsDTO.stream()
				.map(this::mapToTransaction)
				.collect(Collectors.toList());

		return this.transactionRepository.saveAll(transactions);
	}

	private Transaction mapToTransaction(TransactionDTO transactionDTO) {
		Transaction transaction = new Transaction();

		transaction.setUser(User.builder().id(1L).build());

		transaction.setOrigin(Account.builder().id(transactionDTO.getOrigin().getId()).build());
		if( Optional.ofNullable(transactionDTO.getDestination()).isPresent() ) {
			transaction.setDestination(Account.builder().id(transactionDTO.getDestination().getId()).build());
		}

		transaction.setUuid(UUID.randomUUID().toString());

		transaction.setAmount(transactionDTO.getAmount());
		transaction.setInterest(transactionDTO.getInterest());
		transaction.setDescription(transactionDTO.getDescription());

		transaction.setApplied(Optional.ofNullable(transactionDTO.getAppliedAt()).isPresent());
		transaction.setType(transactionDTO.getType());
		transaction.setOperationType(this.getOperationType(transactionDTO.getType()));

		transaction.setStatus(EnumStatus.ACTIVE);

		transaction.setAppliedAt(transactionDTO.getAppliedAt());
		transaction.setSavedAt(transactionDTO.getSavedAt());
		transaction.setCreatedAt(LocalDateTime.now());

		return transaction;
	}

	private EnumOperationType getOperationType(EnumTransactionType type) {
		EnumOperationType operationType = null;
		if( ADDITION_TRANSACTIONS.contains(type) ) {
			operationType = EnumOperationType.ADDITION;
		} else if( SUBTRACTION_TRANSACTIONS.contains(type) ) {
			operationType = EnumOperationType.SUBTRACTION;
		} else if( NEUTER_TRANSACTIONS.contains(type) ) {
			operationType = EnumOperationType.NEUTER;
		}
		return operationType;
	}

	private void applyTransaction(List<Account> accounts, TransactionDTO transaction) {
		var origin = this.findAccount(accounts, transaction.getOrigin().getId());
		var destination = transaction.getDestination() != null ? this.findAccount(accounts, transaction.getDestination().getId()) : null;

		this.applyTransaction(origin, destination, transaction);
	}

	private Account findAccount(List<Account> accounts, Long id) {
		return accounts.stream()
				.filter(account -> account.getId().equals(id))
				.findFirst()
				.orElse(null);
	}

	private void applyTransaction(Account origin, Account destination, TransactionDTO transaction) {
		if( EnumTransactionType.INCOME == transaction.getType() ) {
			this.income(origin, destination, transaction);
		} else if( EnumTransactionType.EXPENSE == transaction.getType() ) {
			this.expense(origin, destination, transaction);
		} else if( EnumTransactionType.TRANSFER == transaction.getType() ) {
			this.transfer(origin, destination, transaction);
		} else if( EnumTransactionType.INVEST == transaction.getType() ) {
			this.invest(origin, destination, transaction);
		} else if( EnumTransactionType.DIVIDEND == transaction.getType() ) {
			this.dividend(origin, destination, transaction);
		} else if( EnumTransactionType.PROFIT == transaction.getType() ) {
			this.profit(origin, destination, transaction);
		} else if( EnumTransactionType.INTEREST == transaction.getType() ) {
			this.interest(origin, destination, transaction);
		} else if( EnumTransactionType.BORROW == transaction.getType() ) {
			this.borrow(origin, destination, transaction);
		} else if( EnumTransactionType.COLLECTION == transaction.getType() ) {
			this.collection(origin, destination, transaction);
		} else if( EnumTransactionType.DEBT == transaction.getType() ) {
			this.debt(origin, destination, transaction);
		} else if( EnumTransactionType.PAYMENT == transaction.getType() ) {
			this.payment(origin, destination, transaction);
		}
	}

	private void income(Account origin, Account destination, TransactionDTO transaction) {
		var interest = Optional.ofNullable(transaction.getInterest()).orElse(BigDecimal.ZERO);
		destination.setAmount(destination.getAmount().add(transaction.getAmount().subtract(interest)));
	}

	private void expense(Account origin, Account destination, TransactionDTO transaction) {
		var interest = Optional.ofNullable(transaction.getInterest()).orElse(BigDecimal.ZERO);

		if( transaction.getAmount().add(interest).compareTo(origin.getAmount()) > 0 ) {
			this.throwInsufficientFundsException(origin, transaction);
		}

		if( transaction.getApplied() ) {
			origin.setAmount(origin.getAmount().subtract(transaction.getAmount().add(interest)));
		}
	}

	private void transfer(Account origin, Account destination, TransactionDTO transaction) {
		this.transferOfFunds(origin, destination, transaction);
	}

	private void invest(Account origin, Account destination, TransactionDTO transaction) {
		this.transferOfFunds(origin, destination, transaction);
	}

	private void profit(Account origin, Account destination, TransactionDTO transaction) {
		this.transferOfFunds(origin, destination, transaction);
	}

	private void dividend(Account origin, Account destination, TransactionDTO transaction) {
		var interest = Optional.ofNullable(transaction.getInterest()).orElse(BigDecimal.ZERO);

		if( Optional.ofNullable(destination).isPresent() ) {
			destination.setAmount(destination.getAmount().add(transaction.getAmount().subtract(interest)));
		} else {
			origin.setAmount(origin.getAmount().add(transaction.getAmount().subtract(interest)));
		}
	}

	private void interest(Account origin, Account destination, TransactionDTO transaction) {
		if( EnumAccountType.DEBTOR == origin.getType() ) {
			origin.setAmount(origin.getAmount().add(transaction.getAmount()));
		} else {
			origin.setAmount(origin.getAmount().subtract(transaction.getAmount()));
		}
	}

	private void borrow(Account origin, Account destination, TransactionDTO transaction) {
		if( transaction.getAmount().compareTo(origin.getAmount()) > 0 ) {
			this.throwInsufficientFundsException(origin, transaction);
		}

		origin.setAmount(origin.getAmount().subtract(transaction.getAmount()));
		destination.setAmount(destination.getAmount().add(transaction.getAmount()));
	}

	private void collection(Account origin, Account destination, TransactionDTO transaction) {
		if( transaction.getAmount().compareTo(origin.getAmount()) > 0 ) {
			throw new SenselessTransactionException("The borrow is for " + origin.getAmount() + " and you are trying to collect " + transaction.getAmount());
		}

		origin.setAmount(origin.getAmount().subtract(transaction.getAmount()));
		destination.setAmount(destination.getAmount().add(transaction.getAmount()));
	}

	private void debt(Account origin, Account destination, TransactionDTO transaction) {
		origin.setAmount(origin.getAmount().add(transaction.getAmount()));

		if( transaction.getApplied() ) {
			var interest = Optional.ofNullable(transaction.getInterest()).orElse(BigDecimal.ZERO);
			destination.setAmount(destination.getAmount().add(transaction.getAmount().subtract(interest)));
		}
	}

	private void payment(Account origin, Account destination, TransactionDTO transaction) {
		var interest = Optional.ofNullable(transaction.getInterest()).orElse(BigDecimal.ZERO);

		if( transaction.getAmount().add(interest).compareTo(origin.getAmount()) > 0 ) {
			this.throwInsufficientFundsException(origin, transaction);
		}
		if( transaction.getAmount().subtract(interest).compareTo(destination.getAmount()) > 0 ) {
			throw new SenselessTransactionException("The debt is for " + destination.getAmount() + " and you are trying to collect " + transaction.getAmount());
		}

		origin.setAmount(origin.getAmount().subtract(transaction.getAmount().add(interest)));
		destination.setAmount(destination.getAmount().subtract(transaction.getAmount().subtract(interest)));
	}

	private void transferOfFunds(Account origin, Account destination, TransactionDTO transaction) {
		if( transaction.getAmount().compareTo(origin.getAmount()) > 0 ) {
			this.throwInsufficientFundsException(origin, transaction);
		}

		var interest = Optional.ofNullable(transaction.getInterest()).orElse(BigDecimal.ZERO);
		origin.setAmount(origin.getAmount().subtract(transaction.getAmount()));

		if( transaction.getApplied() ) {
			destination.setAmount(destination.getAmount().add(transaction.getAmount().subtract(interest)));
		}
	}

	private void nextExecutions(List<TransactionDTO> transactionDTOs) {
		var scheduleTransactionDTOs = transactionDTOs.stream().filter(transactionDTO -> transactionDTO.getScheduleTransactionId() != null).toList();
		var scheduleTransactions = scheduleTransactionRepository.findAllById(scheduleTransactionDTOs.stream().map(TransactionDTO::getScheduleTransactionId).toList());
		var updatedAt = LocalDateTime.now();
		scheduleTransactions.forEach(scheduleTransaction -> {
			var transactionDTO = scheduleTransactionDTOs.stream().filter(item -> item.getScheduleTransactionId().equals(scheduleTransaction.getId())).findFirst().get();
			scheduleTransaction.setNextExecution(this.nextExecution(scheduleTransaction.getCronExpression(), scheduleTransaction.getNextExecution()));
			scheduleTransaction.setLastExecution(transactionDTO.getSavedAt());
			scheduleTransaction.setUpdatedAt(updatedAt);
		});
		this.scheduleTransactionRepository.saveAll(scheduleTransactions);
	}

	private LocalDateTime nextExecution(String cronExpressionString, LocalDateTime reference) {
		var cronExpression = CronExpression.parse(cronExpressionString);
		var lastExecution = Optional.ofNullable(reference).orElse(LocalDate.now().atStartOfDay());
		return cronExpression.next(lastExecution);
	}

	private void throwInsufficientFundsException(Account origin, TransactionDTO transaction) {
		LOGGER.warn("Account [" + origin.getName() + "] has [" + origin.getAmount() + "] but requires [" + transaction.getAmount() + "]");
		throw new InsufficientFundsException("Account [" + origin.getName() + "] has [" + origin.getAmount() + "] but requires [" + transaction.getAmount() + "]");
	}

	private void throwTransactionNotSupportedException(EnumTransactionType type, EnumAccountType originType) {
		LOGGER.warn("You are trying to make an [" + type + "] from a type [" + originType + "] account.");
		throw new TransactionNotSupportedException("You are trying to make an [" + type + "] from a type [" + originType + "] account.");
	}

	private void throwTransactionNotSupportedException(EnumTransactionType type, EnumAccountType originType, EnumAccountType destinationType) {
		LOGGER.warn("You are trying to make an [" + type + "] from a type [" + originType + "] account to a type [" + destinationType + "] account.");
		throw new TransactionNotSupportedException("You are trying to make an [" + type + "] from a type [" + originType + "] account to a type [" + destinationType + "] account.");
	}
}
