package com.devs.web.accountant.repository.entities;

import com.devs.web.accountant.representation.enums.EnumAccountType;
import com.devs.web.accountant.representation.enums.EnumStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity(name = "accounts")
@Table(schema = "accountant", name = "accounts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@NamedEntityGraph(
		name = "Account.parent",
		attributeNodes = @NamedAttributeNode(value = "parent", subgraph = "subgraph.currency"),
		subgraphs = {
			@NamedSubgraph(name = "subgraph.currency", attributeNodes = @NamedAttributeNode(value = "currency")),
		}
)
@NamedEntityGraph(
		name = "Account.subAccounts",
		attributeNodes = @NamedAttributeNode(value = "subAccounts")
)
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "currency_id")
	private Currency currency;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_account_id")
	private Account parent;

	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_account_id")
	private List<Account> subAccounts;

	@OneToMany(mappedBy = "origin", fetch = FetchType.LAZY)
	private List<Transaction> origins;

	@OneToMany(mappedBy = "destination", fetch = FetchType.LAZY)
	private List<Transaction> destinations;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "amount")
	private BigDecimal amount;

	@Column(name = "icon", nullable = false)
	private String icon;

	@Column(name = "color", nullable = false)
	private String color;

	@Enumerated(EnumType.STRING)
	private EnumAccountType type;

	@Column(name = "include_in_balance", columnDefinition = "TINYINT", nullable = false)
	private Boolean includeInBalance;

	@Column(name = "is_temporal", columnDefinition = "TINYINT", nullable = false)
	private Boolean isTemporal;

	@Enumerated(EnumType.STRING)
	private EnumStatus status;

	@Column(name="created_at", nullable = false)
	private LocalDate createdAt;

	@Column(name="updated_at")
	private LocalDate updatedAt;

	@Column(name="deleted_at")
	private LocalDate deletedAt;
}
