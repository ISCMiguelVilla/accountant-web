package com.devs.web.accountant.application.services;

import com.devs.web.accountant.representation.enums.EnumDimension;
import com.devs.web.accountant.representation.views.BalanceItemView;

import java.util.List;

public interface HomeService {

	List<BalanceItemView> balance(EnumDimension dimension, Integer size, String reference);
}
