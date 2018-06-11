package com.syntel.inventoryForecasting.dao;

import com.syntel.inventoryForecasting.model.Factors;
import com.syntel.inventoryForecasting.model.QueryResult;
import com.syntel.inventoryForecasting.model.SearchParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ForecastDao {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Factors> getFactors(){
        String sql = "Select f_description FROM factors";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Factors.class));
    }

    public List<QueryResult> getPastSales(SearchParam query, boolean avg) {
        String sqlSelect = "SELECT sh_week AS week, sh_year AS year, f_description AS factor, sh_sku_id AS sku_id, sku_description AS description, sh_qty AS quantity";
        if(avg){
            sqlSelect = "SELECT sh_week AS week, sh_year AS year, f_description AS factor, sh_sku_id AS sku_id, sku_description AS description, AVG(sh_qty) AS quantity";

        }
        String sqlFrom = " FROM saleshistory, factors, skumaster";
        String sqlWhere = " WHERE sh_factor_id = f_id AND sh_sku_id = sku_id";
        String sqlConditions = "";
        String sqlOrder = " ORDER BY sh_year, sh_week";

        boolean sameYear = false;
        ArrayList<Object> arguments = new ArrayList<>();

        if(query.getType() != ""){
            sqlFrom += ", strmaster";
            sqlConditions += " AND sh_str_id = str_id AND str_type = ?";
            arguments.add(query.getType());
        }
        if(query.getStr() != ""){
            sqlConditions += " AND sh_str_id = ?";
            arguments.add(query.getStr());
        }
        if(query.getSku() != ""){
            sqlConditions += " AND sh_sku_id = ?";
            arguments.add(query.getSku());
        }
        //factor is for manipulation not searching
//        if(query.getFactor() != "") {
//            sqlConditions += " AND f_description = ?";
//            arguments.add(query.getFactor());
//        }
        if(query.getWeekStart() != 0){ //both weeks were filled out or least the first week was filled
            if(query.getYearStart() != 0){ //if both years exist
                if(query.getYearStart() == query.getYearEnd()){ //if the same year
                    sameYear = true;
                    sqlConditions += " AND (sh_week >= ? AND sh_week <= ?) AND sh_year >= ?";
                    arguments.add(query.getWeekStart()); arguments.add(query.getWeekEnd()); arguments.add(query.getYearStart());
                }
                else{//todo: range between years
                    sqlConditions += "  AND ((sh_week >= ? AND sh_year = ?) OR sh_year > ? )";
                    arguments.add(query.getWeekStart()); arguments.add(query.getYearStart()); arguments.add(query.getYearStart());

                    String outterSQL = "SELECT strPoint.* FROM (";
                    String innerSQL  = sqlSelect + sqlFrom + sqlWhere + sqlConditions + sqlOrder;
                    outterSQL += innerSQL;
                    outterSQL += ") strPoint WHERE NOT (week > ? AND year >= ?)";

                    arguments.add(query.getWeekEnd());
                    arguments.add(query.getYearEnd());

                    return jdbcTemplate.query(outterSQL, arguments.toArray(), new BeanPropertyRowMapper<>(QueryResult.class));

                }
            }
            else if(query.getYearEnd() != 0){ //only filled the endyear box and not the start year
                sqlConditions += " AND sh_year = ?";
                arguments.add(query.getYearEnd());
            }
            else{ //no year was filled out
                sqlConditions += " AND sh_week >= ? AND sh_week <= ? ";
                arguments.add(query.getWeekStart()); arguments.add(query.getWeekEnd());
            }
        }
        else if(query.getWeekEnd() != 0){
            sqlConditions += " AND sh_year = ?";
            arguments.add(query.getWeekEnd());
        }

        if(query.getWeekStart() == 0 && query.getWeekEnd() == 0){
                if(query.getYearStart() != 0){
                    sqlConditions += " AND sh_year >= ? AND sh_year <= ?";
                    arguments.add(query.getYearStart());
                    arguments.add(query.getYearEnd());
                }
                else if(query.getYearEnd() != 0){
                    sqlConditions += " AND sh_year = ?";
                    arguments.add(query.getYearEnd());
                }
        }

        String sql  = sqlSelect + sqlFrom + sqlWhere + sqlConditions +  sqlOrder;

        return jdbcTemplate.query(sql, arguments.toArray(), new BeanPropertyRowMapper<>(QueryResult.class));
    }

    public List<QueryResult> getForecast(SearchParam searchParams, List<QueryResult> results) {
        List<QueryResult> forecastResults = new ArrayList<>();
        for (int i = 1; i <= 52; i++) {
            List<QueryResult> cacheList = new ArrayList<>();
            for (QueryResult result : results) {
                if (result.getWeek() == i) {
                    cacheList.add(result);
                }
            }

            int averageQty = 0;
            if (cacheList.size() > 0) {
                if (cacheList.size() == 1) {
                    List<QueryResult> weekRangeResults = new ArrayList<>();
                    for (QueryResult weekResult : results) {
                        if (weekResult.getWeek() <= i + 3 && weekResult.getWeek() >= i - 3) {
                            weekRangeResults.add(weekResult);
                        }
                    }
                    for (QueryResult weekResult : weekRangeResults) {
                        averageQty += weekResult.getQuantity();
                    }
                    QueryResult weekForecast = new QueryResult();
                    weekForecast.setSku_id(cacheList.get(0).getSku_id());
                    weekForecast.setDescription(cacheList.get(0).getDescription());
                    weekForecast.setWeek(cacheList.get(0).getWeek());
                    weekForecast.setYear(2018);
                    weekForecast.setFactor(searchParams.getFactor());
                    weekForecast.setQuantity(averageQty / weekRangeResults.size());
                    forecastResults.add(weekForecast);
                } else {
                    for (QueryResult weekResult : cacheList) {
                        averageQty += weekResult.getQuantity();
                    }
                    QueryResult weekForecast = new QueryResult();
                    weekForecast.setSku_id(cacheList.get(0).getSku_id());
                    weekForecast.setDescription(cacheList.get(0).getDescription());
                    weekForecast.setWeek(cacheList.get(0).getWeek());
                    weekForecast.setYear(2018);
                    weekForecast.setFactor(searchParams.getFactor());
                    weekForecast.setQuantity(averageQty / cacheList.size());
                    forecastResults.add(weekForecast);
                }
            }
        }
        return forecastResults;
    }
}
