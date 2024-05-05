package com.devs.web.accountant.config;

import com.devs.web.accountant.repository.AccountRepository;
import com.devs.web.accountant.repository.CurrencyRepository;
import com.devs.web.accountant.repository.TransactionRepository;
import com.devs.web.accountant.repository.UserRepository;
import com.devs.web.accountant.repository.entities.Account;
import com.devs.web.accountant.repository.entities.Currency;
import com.devs.web.accountant.repository.entities.Transaction;
import com.devs.web.accountant.repository.entities.User;
import com.devs.web.accountant.representation.enums.EnumAccountType;
import com.devs.web.accountant.representation.enums.EnumOperationType;
import com.devs.web.accountant.representation.enums.EnumStatus;
import com.devs.web.accountant.representation.enums.EnumTransactionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Component
public class DatabaseSeeder {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CurrencyRepository currencyRepository;

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private TransactionRepository transactionRepository;

	@Value("${spring.jpa.hibernate.ddl-auto}")
	private String ddlAuto;

	@EventListener
	private void seed(ContextRefreshedEvent event) {
		if( !"create-drop".equalsIgnoreCase(ddlAuto) ) {
			return;
		}
		System.out.println("SEEDING DATABASE");
//		this.seedUser();
//		this.seedCurrencies();
//		this.seedAccounts();
//		this.seedTransactions();
	}

	private User defaultUser;
	private void seedUser() {
		this.defaultUser = this.userRepository.save(User.builder().id(1L).name("Miguel Villa").build());
		this.userRepository.save(User.builder().id(2L).name("Angelina Reyes").build());
		this.userRepository.save(User.builder().id(3L).name("John Doe").build());
		this.userRepository.save(User.builder().id(4L).name("Jane Doe").build());
	}

	private Currency mexicanPeso;

	private void seedCurrencies() {
		this.mexicanPeso = this.createCurrency(1L, "Mexican Peso", "MXN");
		this.createCurrency(2L, "Dollar", "USD");
	}

	private Currency createCurrency(Long id, String name, String iso) {
		var currency = Currency.builder()
				.id(id)
				.status(EnumStatus.ACTIVE)
				.name(name)
				.iso(iso)
				.color("#FFFFFF")
				.createdAt(LocalDate.now())
				.build();
		return this.currencyRepository.save(currency);
	}

	private Account jobsGroup;
	private Account sitDigital;
	private Account bank;
	private Account bankApart;

	private void seedAccounts() {
		this.jobsGroup	= this.createAccount(1L, null, "Jobs", false, false, EnumAccountType.GROUP);
		this.sitDigital	= this.createAccount(2L, this.jobsGroup, "SitDigital", false, false, EnumAccountType.SUPPLIER);
		this.bank		= this.createAccount(3L, null, "BBVA", true, false, EnumAccountType.STORAGE);
		this.bankApart	= this.createAccount(4L, this.bank, "Apart", true, false, EnumAccountType.STORAGE);
		this.createAccount(5L, null, "Home", false, false, EnumAccountType.CONSUMER);
		this.createAccount(6L, null, "Debtor", false, false, EnumAccountType.DEBTOR);
		this.createAccount(7L, null, "Invest", true, false, EnumAccountType.INVESTMENT);
		this.createAccount(8L, null, "Creditor", true, false, EnumAccountType.CREDITOR);
		this.createAccount(9L, null, "Debtor", true, false, EnumAccountType.DEBTOR);
	}

	private Account createAccount(Long id, Account parent, String name, boolean includeInBalance, boolean isTemporal, EnumAccountType type) {
		var account = Account.builder()
				.id(id)
				.user(this.defaultUser)
				.parent(parent)
				.currency(this.mexicanPeso)
				.amount(BigDecimal.ZERO)
				.name(name)
				.icon("fa-solid fa-beer-mug-empty")
				.color("#EEEEEE")
				.includeInBalance(includeInBalance)
				.isTemporal(isTemporal)
				.status(EnumStatus.ACTIVE)
				.type(type)
				.createdAt(LocalDate.now())
				.build();
		return this.accountRepository.save(account);
	}

	private void seedTransactions() {
		this.createTransaction(1L, this.sitDigital, this.bank, EnumTransactionType.INCOME, EnumOperationType.ADDITION, 31000L, "Salary");
		this.bank.setAmount(BigDecimal.valueOf(11000L));
		this.accountRepository.save(this.bank);

		this.createTransaction(2L, this.bank, this.bankApart, EnumTransactionType.TRANSFER, EnumOperationType.NEUTER, 20000L, "Saving");
		this.bankApart.setAmount(BigDecimal.valueOf(20000L));
		this.accountRepository.save(this.bankApart);
	}

	private void createTransaction(Long id, Account origin, Account destination, EnumTransactionType type, EnumOperationType operationType, Long amount, String description) {
		var transaction = Transaction.builder()
				.id(id)
				.user(this.defaultUser)
				.uuid(UUID.randomUUID().toString())
				.origin(origin)
				.destination(destination)
				.type(type)
				.operationType(operationType)
				.amount(BigDecimal.valueOf(amount))
				.description(description)
				.applied(Boolean.TRUE)
				.status(EnumStatus.ACTIVE)
				.savedAt(LocalDateTime.now())
				.appliedAt(LocalDateTime.now())
				.createdAt(LocalDateTime.now()).build();
		this.transactionRepository.save(transaction);
	}
}
