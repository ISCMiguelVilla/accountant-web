import { Injectable } from '@angular/core';

import * as uuid from 'uuid';

import { Account, TypeAccountTypes, AccountsForTransactionTypes } from '../models/interfaces/account.type';
import { Transaction } from '../models/interfaces/transaction.type';

import { EnumAccountType } from '../models/enums/enum-account-type';
import { EnumTransactionType } from '../models/enums/enum-transaction-type';
import { TransactionException, EnumTransactionStatus } from '../models/interfaces/transaction-status.type';

@Injectable({
  providedIn: 'root'
})
export class TransactionsLocalService {

	private readonly ACCOUNTS_FOR_TRANSACTION_TYPE: AccountsForTransactionTypes = {
		[EnumTransactionType.INCOME]:		{ origins: [ EnumAccountType.SUPPLIER ], destinations: [ EnumAccountType.STORAGE ] },
		[EnumTransactionType.EXPENSE]:		{ origins: [ EnumAccountType.STORAGE ], destinations: [ EnumAccountType.CONSUMER ] },

		[EnumTransactionType.TRANSFER]:		{
			origins:		[ EnumAccountType.STORAGE ],
			destinations:	[ EnumAccountType.STORAGE ]
		},

		[EnumTransactionType.INVEST]: {
			origins:		[ EnumAccountType.STORAGE, EnumAccountType.INVESTMENT ],
			destinations:	[ EnumAccountType.INVESTMENT, EnumAccountType.BUSINESS ]
		},
		[EnumTransactionType.PROFIT]: {
			origins:		[ EnumAccountType.INVESTMENT, EnumAccountType.BUSINESS ],
			destinations:	[ EnumAccountType.STORAGE, EnumAccountType.INVESTMENT ]
		},

		[EnumTransactionType.DIVIDEND]: {
			origins:		[ EnumAccountType.INVESTMENT, EnumAccountType.BUSINESS, EnumAccountType.STORAGE, EnumAccountType.CREDITOR ],
			destinations:	[ EnumAccountType.INVESTMENT, EnumAccountType.BUSINESS, EnumAccountType.STORAGE, EnumAccountType.CREDITOR ]
		},
		[EnumTransactionType.INTEREST]: {
			origins:		[ EnumAccountType.INVESTMENT, EnumAccountType.BUSINESS, EnumAccountType.STORAGE, EnumAccountType.DEBTOR ],
			destinations:	[]
		},

		[EnumTransactionType.BORROW]:		{ origins: [ EnumAccountType.STORAGE	], destinations: [ EnumAccountType.CREDITOR	] },
		[EnumTransactionType.COLLECTION]:	{ origins: [ EnumAccountType.CREDITOR	], destinations: [ EnumAccountType.STORAGE	] },

		[EnumTransactionType.DEBT]:			{ origins: [ EnumAccountType.DEBTOR		], destinations: [ EnumAccountType.STORAGE, EnumAccountType.CONSUMER	] },
		[EnumTransactionType.PAYMENT]:		{ origins: [ EnumAccountType.STORAGE	], destinations: [ EnumAccountType.DEBTOR	] },
	};

	constructor() { }

	private static readonly LOCAL_TRANSACTIONS_KEY = 'transactions';

	public save(transactions: Array<Transaction>): void {
		localStorage.setItem(TransactionsLocalService.LOCAL_TRANSACTIONS_KEY, JSON.stringify(transactions));
	}
	
	public findAll(): Array<Transaction> {
		return JSON.parse(localStorage.getItem(TransactionsLocalService.LOCAL_TRANSACTIONS_KEY)) as Array<Transaction>;
	}

	public remove(): void {
		localStorage.removeItem(TransactionsLocalService.LOCAL_TRANSACTIONS_KEY);
	}

	public getAccounts(transactionType: EnumTransactionType, accounts: Array<Account>): TypeAccountTypes {
		const { origins, destinations } = this.ACCOUNTS_FOR_TRANSACTION_TYPE[transactionType];

		const accountsForTransaction: TypeAccountTypes = {
			origins:		[],
			destinations:	[],
		};

		origins.forEach(accountType => {
			accounts.filter((account: Account) => account.type == accountType)
					.forEach((account: Account) => accountsForTransaction.origins.push(account));
		});

		destinations.forEach(accountType => {
			accounts.filter((account: Account) => account.type == accountType)
					.forEach((account: Account) => accountsForTransaction.destinations.push(account));
		});

		return accountsForTransaction;
	}

	private static readonly TRANSACTION_TYPES_WITH_DESTINATION_OPTIONAL = [ EnumTransactionType.DIVIDEND, EnumTransactionType.INTEREST ]

	public isDestinationAccountOptional(type: EnumTransactionType): boolean {
		return TransactionsLocalService.TRANSACTION_TYPES_WITH_DESTINATION_OPTIONAL.includes(type);
	}

	private static readonly TRANSACTIONS_ASCENDING = (objA: Transaction, objB: Transaction) => {
		return new Date(objA.savedAt).getTime() - new Date(objB.savedAt).getTime();
	};

	private static readonly FIND_ACCOUNT = (accounts: Array<Account>, id: number): Account => {
		const index: number = accounts.findIndex((account: Account) => account.id == id);
		return accounts[index];
	}

	public add(accounts: Array<Account>, transactions: Array<Transaction>, transaction: Transaction): any {
		transaction.uuid = uuid.v4();
		transactions.push(transaction);

		return this.applyTransactions(accounts, transactions);
	}

	public edit(accounts: Array<Account>, transactions: Array<Transaction>, transactionToEdit: Transaction): any {
		transactions = transactions.filter((transaction: Transaction) => transaction.uuid != transactionToEdit.uuid);

		let result;
		try {
			result = this.add(accounts, transactions, transactionToEdit);
		} catch(error) {
			error.status = EnumTransactionStatus.SENSELESS;
			throw TransactionException(error);
		}
		return result;
	}

	public delete(accounts: Array<Account>, transactions: Array<Transaction>, transactionToDelete: Transaction): any {
		transactions = transactions.filter((transaction: Transaction) => transaction.uuid != transactionToDelete.uuid);

		return this.applyTransactions(accounts, transactions);
	}

	public applyTransactions(accounts: Array<Account>, transactions: Array<Transaction>): any {
		transactions.sort(TransactionsLocalService.TRANSACTIONS_ASCENDING);

		for( const transaction of transactions ) {
			const origin = TransactionsLocalService.FIND_ACCOUNT(accounts, transaction.origin.id);
			const destination = TransactionsLocalService.FIND_ACCOUNT(accounts, transaction.destination?.id);

			this._apply(origin, destination, transaction);
		};

		return {
			accounts,
			transactions,
		}
	}

	public _apply(origin: Account, destination: Account, transaction: Transaction) {
		switch(transaction.type) {
			case EnumTransactionType.INCOME:		this._applyIncome(origin, destination, transaction);		break;
			case EnumTransactionType.EXPENSE:		this._applyExpense(origin, destination, transaction);		break;
			case EnumTransactionType.TRANSFER:		this._applyTransfer(origin, destination, transaction);		break;
			case EnumTransactionType.INVEST:		this._applyInvest(origin, destination, transaction);		break;
			case EnumTransactionType.DIVIDEND:		this._applyDividend(origin, destination, transaction);		break;
			case EnumTransactionType.PROFIT:		this._applyProfit(origin, destination, transaction);		break;
			case EnumTransactionType.INTEREST:		this._applyInterest(origin, destination, transaction);		break;
			case EnumTransactionType.BORROW:		this._applyBorrow(origin, destination, transaction);		break;
			case EnumTransactionType.COLLECTION:	this._applyCollection(origin, destination, transaction);	break;
			case EnumTransactionType.DEBT:			this._applyDebt(origin, destination, transaction);			break;
			case EnumTransactionType.PAYMENT:		this._applyPayment(origin, destination, transaction);		break;
			default: throw TransactionException({
				status:			EnumTransactionStatus.TRANSACTION_NOT_SUPPORTED,
				detail:			`${transaction.type} is not supported`
			});
		};
	}

	private _applyIncome(_: Account, destination: Account, transaction: Transaction): void {
		destination.amount = this._round(destination.amount + (transaction.amount - transaction.interest));
	}

	private _applyExpense(origin: Account, _: Account, transaction: Transaction): void {
		if( this._round(transaction.amount + transaction.interest) > origin.amount ) {
			throw TransactionException({
				status:			EnumTransactionStatus.INSUFFICIENT_FOUNDS,
				detail:			`${origin.name} has ${origin.amount} but requires ${transaction.amount} with ${transaction.interest} interest`
			});
		}

		if( transaction.applied ) {
			origin.amount = this._round(origin.amount - ( transaction.amount + transaction.interest ));
		}
	}

	private _applyTransfer(origin: Account, destination: Account, transaction: Transaction): void {
		this._transferOfFunds(origin, destination, transaction);
	}

	private _applyInvest(origin: Account, destination: Account, transaction: Transaction): void {
		this._transferOfFunds(origin, destination, transaction);
	}

	private _applyProfit(origin: Account, destination: Account, transaction: Transaction): void {
		this._transferOfFunds(origin, destination, transaction);
	}

	private _applyDividend(origin: Account, destination: Account, transaction: Transaction): void {
		if( destination ) {
			destination.amount = this._round(destination.amount + ( transaction.amount - transaction.interest ));
		} else {
			origin.amount = this._round(origin.amount + ( transaction.amount - transaction.interest ));
		}
	}

	private _applyInterest(origin: Account, _: Account, transaction: Transaction): void {
		if( EnumAccountType.DEBTOR == origin.type ) {
			origin.amount = this._round(origin.amount + transaction.amount);
		} else {
			origin.amount = this._round(origin.amount - transaction.amount);
		}
	}

	private _applyBorrow(origin: Account, destination: Account, transaction: Transaction): void {
		if( origin.amount < transaction.amount ) {
			this._throwInsufficientFounds(origin, destination, transaction);
		}

		origin.amount = this._round(origin.amount - transaction.amount);
		destination.amount = this._round(destination.amount + transaction.amount);
	}

	private _applyCollection(origin: Account, destination: Account, transaction: Transaction): void {
		if( origin.amount < transaction.amount ) {
			throw TransactionException({
				status:			EnumTransactionStatus.SENSELESS,
				detail:			`The debt is for ${origin.amount} and you are trying to collect ${transaction.amount}`,
			});
		}

		origin.amount = this._round(origin.amount - transaction.amount);
		destination.amount = this._round(destination.amount + transaction.amount);
	}

	private _applyDebt(origin: Account, destination: Account, transaction: Transaction): void {
		origin.amount = origin.amount + transaction.amount;

		if( transaction.applied ) {
			destination.amount = this._round(destination.amount + (transaction.amount - transaction.interest));
		}
	}

	private _applyPayment(origin: Account, destination: Account, transaction: Transaction) {
		if( this._round(transaction.amount + transaction.interest) > origin.amount ) {
			this._throwInsufficientFounds(origin, destination, transaction);
		}
		if( this._round(transaction.amount - transaction.interest) > destination.amount ) {
			throw TransactionException({
				status:			EnumTransactionStatus.SENSELESS,
				detail:			`Your debt is ${destination.amount} and you are trying to transfer ${transaction.amount} with ${transaction.interest} interest`,
			});
		}

		origin.amount = this._round(origin.amount - (transaction.amount + transaction.interest));
		destination.amount = this._round(destination.amount - (transaction.amount - transaction.interest));
	}

	private _transferOfFunds(origin: Account, destination: Account, transaction: Transaction): void {
		if( origin.amount < transaction.amount ) {
			this._throwInsufficientFounds(origin, destination, transaction);
		}
		
		origin.amount = this._round(origin.amount - transaction.amount);
		if( transaction.applied ) {
			destination.amount = this._round(destination.amount + (transaction.amount - transaction.interest));
		}
	}

	private _round(number: number, places: number = 2): number {
		return parseFloat(number.toFixed(places));
	}

	private _throwInsufficientFounds(origin: Account, destination: Account, transaction: Transaction): void {
		throw TransactionException({
			status:			EnumTransactionStatus.INSUFFICIENT_FOUNDS,
			detail:			`${origin.name} has ${origin.amount} but requires ${transaction.amount} with ${transaction.interest} interest`,
		});
	}
}
