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
            if(results.isEmpty()){ //if the previous year had no info, range the weeks
                    boolean avgCall = false;

                    int init_strweek = query.getWeekStart();
                    int init_endweek = query.getWeekEnd();
                    int init_stryear = query.getYearStart();
                    int init_endyear = query.getYearEnd();

                    if(query.getWeekStart() == query.getWeekEnd() && query.getYearStart() == query.getYearEnd()){ //only one week was looked up
                        avgCall = true; //ill need to make a different call to the database
                    }

                    query.setWeekStart(query.getWeekStart() - 3);
                    if(query.getWeekStart() < 1){
                        query.setWeekStart(52+query.getWeekStart());
                        query.setYearStart(query.getYearStart() - 1);
                    }

                    query.setYearStart(query.getWeekEnd() + 3);
                    if(query.getWeekEnd() > 52){
                        query.setWeekEnd(query.getWeekEnd() - 52);
                        query.setYearEnd(query.getYearEnd() + 1);
                    }

                    results = forecastDao.getPastSales(query);
                    if(results.isEmpty()){
                        //reset time range back to original
                        query.setWeekStart(init_strweek);
                        query.setWeekEnd(init_endweek);
                        query.setYearStart(init_stryear);
                        query.setYearEnd(init_endyear);
                        //check another store for information
                        if(query.getStr() == ""){
                            return results; // no store was specified so cant do this
                        }
                        //this needs to be a different query
                        results = forecastDao.getDifferentStoresales(query);
                    }
                    else if(avgCall){
                        int avg = 0;
                        for(int i = 0; i < results.size(); i++){
                            avg += results.get(i).getQuantity();
                        }

                        avg /= results.size();

                        results.get(0).setQuantity(avg);

                        while(results.size() > 1) {
                            results.remove(results.size() - 1);
                        }
                    }
            }
        }

        return results;
    }

    public List<QueryResult> getForecast(SearchParam searchParams, List<QueryResult> pastInfoResults) {
        return forecastDao.getForecast(searchParams, pastInfoResults);
    }

    public List<FactorMultiplier> getFactorMultiplier(SearchParam query) {
        return forecastDao.getFactorMultiplier(query);
    }
}
