package com.syntel.inventoryForecasting.service;

import com.syntel.inventoryForecasting.dao.ForecastDao;
import com.syntel.inventoryForecasting.model.QueryResult;
import com.syntel.inventoryForecasting.model.SearchParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForecastService {
    @Autowired
    ForecastDao forecastDao;

    public List<QueryResult> getPastSales(SearchParam query) {
        return forecastDao.getPastSales(query);
    }
}
