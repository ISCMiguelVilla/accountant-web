package com.devs.web.accountant.representation.mappers;

import com.devs.web.accountant.repository.entities.ScheduleTransaction;
import com.devs.web.accountant.representation.dtos.ScheduleTransactionDTO;
import org.mapstruct.*;

import java.util.List;

@Mapper(
		componentModel = "spring",
		implementationPackage = "com.devs.web.accountant.representation.mappers.impl",
		uses = {
				AccountMapper.class
		}
)
public interface ScheduleTransactionMapper {

	@IterableMapping(qualifiedByName = "mapToTransaction")
	List<ScheduleTransactionDTO> map(List<ScheduleTransaction> scheduleTransaction);

	@Named("mapToTransaction")
	@Mapping(target = "origin", qualifiedByName = "isolatedAccount")
	@Mapping(target = "destination", qualifiedByName = "isolatedAccount")
	ScheduleTransactionDTO map(ScheduleTransaction scheduleTransaction);

	List<ScheduleTransaction> mapTo(List<ScheduleTransactionDTO> scheduleTransactionDTO);

	ScheduleTransaction mapTo(ScheduleTransactionDTO scheduleTransactionDTO);

	@Mapping(target = "id", ignore = true)
	@Mapping(target = "origin", ignore = true)
	@Mapping(target = "destination", ignore = true)
	@Mapping(target = "createdAt", ignore = true)
	@Mapping(target = "updatedAt", ignore = true)
	@Mapping(target = "deletedAt", ignore = true)
	void update(@MappingTarget ScheduleTransaction scheduleTransaction, ScheduleTransactionDTO scheduleTransactionDTO);
}
