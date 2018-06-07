package com.syntel.inventoryForecasting.controller;

import com.syntel.inventoryForecasting.model.QueryResult;
import com.syntel.inventoryForecasting.model.SearchParam;
import com.syntel.inventoryForecasting.service.ForecastService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ForecastController {
    @Autowired
    ForecastService forecastService;

    @CrossOrigin
    @PostMapping("/past")
    public List<QueryResult> getPastSales(@RequestBody SearchParam query) {
//        System.out.println(query.getFactor());
//        System.out.println(query.getSku());
//        System.out.println(query.getStr());
//        System.out.println(query.getType());
//        System.out.println(query.getWeekStart());
//        System.out.println(query.getYearStart());
//        System.out.println(query.getWeekEnd());
//        System.out.println(query.getYearEnd());
        return forecastService.getPastSales(query);
    }

    @CrossOrigin
    @PostMapping("/forecast")
    public String getForecast() {
        return  "Hello";
    }
}
