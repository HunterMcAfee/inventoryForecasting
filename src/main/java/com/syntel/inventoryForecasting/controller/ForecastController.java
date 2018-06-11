package com.syntel.inventoryForecasting.controller;

import com.syntel.inventoryForecasting.model.Factors;
import com.syntel.inventoryForecasting.model.ForecastPayload;
import com.syntel.inventoryForecasting.model.QueryResult;
import com.syntel.inventoryForecasting.model.SearchParam;
import com.syntel.inventoryForecasting.service.ForecastService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ForecastController {
    @Autowired
    ForecastService forecastService;

    @CrossOrigin
    @RequestMapping("/factors")
    public List<Factors> factors(){
        return forecastService.getFactors();
    }

    @CrossOrigin
    @PostMapping("/past")
    public List<QueryResult> getPastSales(@RequestBody SearchParam query) {
        return forecastService.getPastSales(query);
    }

    @CrossOrigin
    @PostMapping("/forecast")
    public List<QueryResult> getForecast(@RequestBody ForecastPayload forecastPayload) {
//        System.out.println(forecastPayload.getPastInfoResults().get(0).getFactor());
//        System.out.println(forecastPayload.getPastInfoResults().get(0).getSku_id());
//        System.out.println(forecastPayload.getPastInfoResults().get(0).getDescription());
//        System.out.println(forecastPayload.getPastInfoResults().get(0).getQuantity());
//        System.out.println(forecastPayload.getPastInfoResults().get(0).getWeek());
//        System.out.println(forecastPayload.getPastInfoResults().get(0).getYear());
        return forecastService.getForecast(forecastPayload.getSearchParams(), forecastPayload.getPastInfoResults());
    }
}
