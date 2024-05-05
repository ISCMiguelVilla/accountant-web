import { EnumAccountantExceptionType } from "../enums/enum-accountant-exception-type";

export interface AccountantException {
	message:			string;
	time:				Date;
	type:				EnumAccountantExceptionType;
}
