package com.syntel.inventoryForecasting.controller;

import com.syntel.inventoryForecasting.model.*;
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
        return forecastService.getForecast(forecastPayload.getSearchParams(), forecastPayload.getPastInfoResults());
    }

    @CrossOrigin
    @PostMapping("/factorMultiplier")
    public List<FactorMultiplier> getFactorMultiplier(@RequestBody SearchParam query) {
        return forecastService.getFactorMultiplier(query);
    }
}
