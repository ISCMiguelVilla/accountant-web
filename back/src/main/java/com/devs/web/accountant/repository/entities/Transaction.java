package com.devs.web.accountant.repository.entities;

import com.devs.web.accountant.representation.enums.EnumOperationType;
import com.devs.web.accountant.representation.enums.EnumStatus;
import com.devs.web.accountant.representation.enums.EnumTransactionType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity(name = "transactions")
@Table(schema = "accountant", name = "transactions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@NamedEntityGraph(
		name = "Transaction.accounts",
		attributeNodes = {
				@NamedAttributeNode(value = "origin", subgraph = "subgraph.origin"),
				@NamedAttributeNode(value = "destination", subgraph = "subgraph.destination")
		},
		subgraphs = {
				@NamedSubgraph(name = "subgraph.origin", attributeNodes = @NamedAttributeNode(value = "currency")),
				@NamedSubgraph(name = "subgraph.destination", attributeNodes = @NamedAttributeNode(value = "currency")),
		}
)
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "origin_id")
	private Account origin;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "destination_id")
	private Account destination;

	@Column(name = "uuid", nullable = false)
	private String uuid;

	@Column(name = "amount", nullable = false)
	private BigDecimal amount;

	@Column(name = "interest")
	private BigDecimal interest;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "applied", nullable = false, columnDefinition = "TINYINT")
	private Boolean applied;

	@Enumerated(EnumType.STRING)
	private EnumTransactionType type;

	@Enumerated(EnumType.STRING)
	private EnumOperationType operationType;

	@Enumerated(EnumType.STRING)
	private EnumStatus status;

	@Column(name="applied_at")
	private LocalDateTime appliedAt;

	@Column(name="saved_at", nullable = false)
	private LocalDateTime savedAt;

	@Column(name="created_at", nullable = false)
	private LocalDateTime createdAt;

	@Column(name="updated_at")
	private LocalDateTime updatedAt;

	@Column(name="deleted_at")
	private LocalDateTime deletedAt;
}
