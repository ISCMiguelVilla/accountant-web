import { Account } from "./account.type";
import { User } from "./user.type";

import { EnumOperationType } from "../enums/enum-operation-type";
import { EnumStatus } from "../enums/enum-status";
import { EnumTransactionType } from "../enums/enum-transaction-type";

export interface Transaction {
	id?:							number;
	scheduleTransactionId?:			number;
	user?:							User;
	origin?:						Account;
	destination?:					Account;
	uuid?:							string;
	amount?:						number;
	originOriginalAmount?:			number;
	originUpdatedAmount?:			number;
	destinationOriginalAmount?:		number;
	destinationUpdatedAmount?:		number;
	interest?:						number;
	description?:					string;
	applied?:						Boolean;
	type?:							EnumTransactionType;
	operationType?:					EnumOperationType;
	status?:						EnumStatus;
	appliedAt?:						Date;
	savedAt?:						Date;
	createdAt?:						Date;
	updatedAt?:						Date;
	deletedAt?:						Date;
}
