import { EnumAccountType } from "../enums/enum-account-type";
import { EnumStatus } from "../enums/enum-status";
import { EnumTransactionType } from "../enums/enum-transaction-type";
import { Currency } from "./currency.type";
import { Transaction } from "./transaction.type";
import { User } from "./user.type";

export interface Account {
	id?:					number;
	user?:					User;
	currency?:				Currency;
	parent?:				Account;
	subAccounts?:			Array<Account>;
	origins?:				Array<Transaction>;
	destinations?:			Array<Transaction>;
	name?:					string;
	amount?:				number;
	icon?:					string;
	color?:					string;
	includeInBalance?:		Boolean;
	isTemporal?:			Boolean;
	status?:				EnumStatus;
	type?:					EnumAccountType;
	createdAt?:				Date;
	updatedAt?:				Date;
	deletedAt?:				Date;

	hasChildren?:			Boolean;
	hasTransactions?:		Boolean;
}

export type AccountsForTransactionTypes = {
	[key in EnumTransactionType]: AccountTypesForTransactionType;
}

export interface AccountTypesForTransactionType {
	origins:				Array<EnumAccountType>;
	destinations:			Array<EnumAccountType>;
}

export interface TypeAccountTypes {
	origins:				Array<Account>;
	destinations:			Array<Account>;
}
