package com.syntel.inventoryForecasting.service;

import com.syntel.inventoryForecasting.dao.ForecastDao;
import com.syntel.inventoryForecasting.model.FactorMultiplier;
import com.syntel.inventoryForecasting.model.Factors;
import com.syntel.inventoryForecasting.model.QueryResult;
import com.syntel.inventoryForecasting.model.SearchParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForecastService {
    @Autowired
    ForecastDao forecastDao;

    public List<Factors> getFactors(){
        return forecastDao.getFactors();
    }

    public List<QueryResult> getPastSales(SearchParam query) {

        List<QueryResult> results = forecastDao.getPastSales(query);
        if(results.isEmpty()){ //if that years search did not work move back one more year
            query.setYearStart(query.getYearStart() - 1);
            query.setYearEnd(query.getYearEnd() - 1);
            results = forecastDao.getPastSales(query);
//            if(results.isEmpty()){ //if the previous year had no info, range the weeks
//                    boolean avgCall = false;
//                    if(query.getWeekStart() == query.getWeekEnd() && query.getYearStart() == query.getYearEnd()){
//                        avgCall = true;
//                    }
//
//                    query.setWeekStart(query.getWeekStart() - 3);
//                    if(query.getWeekStart() < 1){
//                        query.setWeekStart(52+query.getWeekStart());
//                        query.setYearStart(query.getYearStart() - 1);
//                    }
//                    query.setYearStart(query.getWeekEnd() + 3);
//                    if(query.getWeekEnd() > 52){
//                        query.setWeekEnd(query.getWeekEnd() % 52);
//                        query.setYearEnd(query.getYearEnd() + 1);
//                    }
//
//                    if(avgCall){
//                        results = forecastDao.getPastSales(query, true);
//                    }
//                    else{
//                        results = forecastDao.getPastSales(query, false);
//                    }
//
//            }
        }

        return results;
    }

    public List<QueryResult> getForecast(SearchParam searchParams, List<QueryResult> pastInfoResults) {
        return forecastDao.getForecast(searchParams, pastInfoResults);
    }

    public FactorMultiplier getFactorMultiplier(SearchParam query) {
        return forecastDao.getFactorMultiplier(query);
    }
}
