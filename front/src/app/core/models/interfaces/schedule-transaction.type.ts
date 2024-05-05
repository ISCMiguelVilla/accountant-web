import { Account } from "./account.type";
import { User } from "./user.type";

import { EnumStatus } from "../enums/enum-status";
import { EnumTransactionType } from "../enums/enum-transaction-type";

export interface ScheduleTransaction {
	id?:							number;

	user?:							User;
	origin?:						Account;
	destination?:					Account;

	cronExpression?:				string;
	nextExecution?:					Date;
	lastExecution?:					Date;

	amount?:						number;
	interest?:						number;
	description?:					string;

	type?:							EnumTransactionType;
	status?:						EnumStatus;

	createdAt?:						Date;
	updatedAt?:						Date;
	deletedAt?:						Date;
}

export interface CronExpressionView {
	cronExpression?:				string;
	nextExecution?:					Date;
}