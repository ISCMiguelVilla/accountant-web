package com.devs.web.accountant.representation.views;

import com.devs.web.accountant.representation.dtos.AccountDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountsInUse {

	List<AccountDTO> accountsInUse;
}
