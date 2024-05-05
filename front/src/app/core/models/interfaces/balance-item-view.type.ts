import { EnumOperationType } from "../enums/enum-operation-type";

export interface BalanceItemView {
	date:						string;
	operationType:				EnumOperationType;
	amount:						number;
}
