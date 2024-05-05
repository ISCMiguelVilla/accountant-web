import { EnumStatus } from "../enums/enum-status";

export interface Currency {
	id?:					number;
	status?:				EnumStatus;
	name?:					string;
	iso?:					string;
	color?:					string;
	createdAt?:				Date;
	updatedAt?:				Date;
}
