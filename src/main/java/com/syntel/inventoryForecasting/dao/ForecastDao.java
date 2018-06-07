package com.syntel.inventoryForecasting.dao;

import com.syntel.inventoryForecasting.model.QueryResult;
import com.syntel.inventoryForecasting.model.SearchParam;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ForecastDao {

    public List<QueryResult> getPastSales(SearchParam query) {
        List<QueryResult> results = new ArrayList<>();
        QueryResult test = new QueryResult();
        results.add(test);
        return results;
    }
}
