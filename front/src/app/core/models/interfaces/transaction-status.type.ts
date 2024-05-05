import { Transaction } from "./transaction.type";

export enum EnumTransactionStatus {
	SUCCESS							= 'SUCCESS',
	INSUFFICIENT_FOUNDS				= 'INSUFFICIENT_FOUNDS',
	SENSELESS						= 'SENSELESS',
	TRANSACTION_NOT_SUPPORTED		= 'TRANSACTION_NOT_SUPPORTED',
	ERROR							= 'ERROR',
}

export interface TransactionStatus {
	status:							EnumTransactionStatus,
	summary?:						string;
	detail?:						string;
	transaction?:					Transaction;
}

export function TransactionException(transactionStatus: TransactionStatus) {
	return transactionStatus
}
TransactionException.prototype = Object.create(Error.prototype);
