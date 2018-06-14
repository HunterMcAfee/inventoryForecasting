package com.syntel.inventoryForecasting.dao;

import com.syntel.inventoryForecasting.model.FactorMultiplier;
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

    public List<Factors> getFactors() {
        String sql = "Select f_description FROM forecast_capstone.factors";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Factors.class));
    }

    public List<QueryResult> getPastSales(SearchParam query) {
        String sqlSelect = "SELECT sh_week AS week, sh_year AS year, f_description AS factor, sh_sku_id AS sku_id, sku_description AS description, sh_qty AS quantity";
        String sqlFrom = " FROM forecast_capstone.saleshistory, forecast_capstone.factors, forecast_capstone.skumaster";
        String sqlWhere = " WHERE sh_factor_id = f_id AND sh_sku_id = sku_id";
        String sqlConditions = "";
        String sqlOrder = " ORDER BY sh_year, sh_week";

        ArrayList<Object> arguments = new ArrayList<>();

        if (query.getType() != "") {
            sqlFrom += ", forecast_capstone.strmaster";
            sqlConditions += " AND sh_str_id = str_id AND str_type = ?";
            arguments.add(query.getType());
        }
        if (query.getStr() != "") {
            sqlConditions += " AND sh_str_id = ?";
            arguments.add(query.getStr());
        }
        if (query.getSku() != "") {
            sqlConditions += " AND sh_sku_id = ?";
            arguments.add(query.getSku());
        }

        if(query.getWeekStart() != 0){ //both weeks were filled out or least the first week was filled
            if(query.getYearStart() != 0){ //if both years exist
                if(query.getYearStart() == query.getYearEnd()){ //if the same year
                    sqlConditions += " AND (sh_week >= ? AND sh_week <= ?) AND sh_year = ?";
                    arguments.add(query.getWeekStart()); arguments.add(query.getWeekEnd()); arguments.add(query.getYearStart());
                }
                else{//todo: range between years
                    sqlConditions += "  AND ((sh_week >= ? AND sh_year = ?) OR sh_year > ? )";
                    arguments.add(query.getWeekStart());
                    arguments.add(query.getYearStart());
                    arguments.add(query.getYearStart());

                    String outterSQL = "SELECT strPoint.* FROM (";
                    String innerSQL = sqlSelect + sqlFrom + sqlWhere + sqlConditions + sqlOrder;
                    outterSQL += innerSQL;
                    outterSQL += ") strPoint WHERE NOT (week > ? AND year >= ?)";

                    arguments.add(query.getWeekEnd());
                    arguments.add(query.getYearEnd());

                    return jdbcTemplate.query(outterSQL, arguments.toArray(), new BeanPropertyRowMapper<>(QueryResult.class));

                }
            } else if (query.getYearEnd() != 0) { //only filled the endyear box and not the start year
                sqlConditions += " AND sh_year = ?";
                arguments.add(query.getYearEnd());
            } else { //no year was filled out
                sqlConditions += " AND sh_week >= ? AND sh_week <= ? ";
                arguments.add(query.getWeekStart());
                arguments.add(query.getWeekEnd());
            }
        } else if (query.getWeekEnd() != 0) {
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

        String sql = sqlSelect + sqlFrom + sqlWhere + sqlConditions + sqlOrder;

        return jdbcTemplate.query(sql, arguments.toArray(), new BeanPropertyRowMapper<>(QueryResult.class));
    }

    public List<QueryResult> getDifferentStoresales(SearchParam query){
        String sqlSelect = "SELECT sh_week AS week, sh_year AS year, f_description AS factor, sh_sku_id AS sku_id, sku_description AS description, sh_qty AS quantity";
        String sqlFrom = " FROM forecast_capstone.saleshistory, forecast_capstone.factors, forecast_capstone.skumaster, forecast_capstone.strmaster, (SELECT str_type AS stype FROM forecast_capstone.strmaster WHERE str_id = ?) strtype";
        String sqlWhere = " WHERE sh_factor_id = f_id AND sh_sku_id = sku_id AND sh_str_id = str_id AND stype = str_type";
        String sqlConditions = "";
        String sqlOrder = " ORDER BY sh_year, sh_week";

        ArrayList<Object> arguments = new ArrayList<>();
        arguments.add(query.getStr());

        if(query.getSku() != ""){
            sqlConditions += " AND sh_sku_id = ?";
            arguments.add(query.getSku());
        }

        if(query.getWeekStart() != 0){ //both weeks were filled out or least the first week was filled
            if(query.getYearStart() != 0){ //if both years exist
                if(query.getYearStart() == query.getYearEnd()){ //if the same year
                    sqlConditions += " AND (sh_week >= ? AND sh_week <= ?) AND sh_year = ?";
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

        return jdbcTemplate.query("", arguments.toArray(), new BeanPropertyRowMapper<>(QueryResult.class));
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

            if (cacheList.size() > 1) {
                int averageQty = 0;
                for (QueryResult weekResult : cacheList) {
                    averageQty += weekResult.getQuantity();
                }
                QueryResult weekForecast = new QueryResult();
                weekForecast.setSku_id(cacheList.get(0).getSku_id());
                weekForecast.setDescription(cacheList.get(0).getDescription());
                weekForecast.setWeek(cacheList.get(0).getWeek());
                weekForecast.setYear(2018);
                if (!cacheList.get(0).getFactor().isEmpty()) {
                    weekForecast.setFactor(cacheList.get(0).getFactor());
                }
                weekForecast.setQuantity(averageQty / cacheList.size());
                forecastResults.add(weekForecast);
            } else if (cacheList.size() == 1) {
                int averageQty = 0;
                for (QueryResult weekResult : cacheList) {
                    averageQty += weekResult.getQuantity();
                }
                QueryResult weekForecast = new QueryResult();
                weekForecast.setSku_id(cacheList.get(0).getSku_id());
                weekForecast.setDescription(cacheList.get(0).getDescription());
                weekForecast.setWeek(cacheList.get(0).getWeek());
                weekForecast.setYear(2018);
                if (!cacheList.get(0).getFactor().isEmpty()) {
                    weekForecast.setFactor(cacheList.get(0).getFactor());
                }
                weekForecast.setQuantity(averageQty);
                forecastResults.add(weekForecast);
            }
        }
        return forecastResults;
    }

    public List<FactorMultiplier> getFactorMultiplier(SearchParam query) {
        if (query.getFactor().equalsIgnoreCase("Normal Day")) {
            FactorMultiplier factorMultiplier = new FactorMultiplier(100, true);
            List<FactorMultiplier> factorMultiplierArrayList = new ArrayList<>();
            factorMultiplierArrayList.add(factorMultiplier);
            return factorMultiplierArrayList;
        } else if (query.getFactor() != "") {
            String sql = "SELECT sf_sign, sf_percentvalue FROM forecast_capstone.salesfactor, forecast_capstone.saleshistory, forecast_capstone.factors WHERE sf_sh_id = sh_id AND sf_f_id = f_id ";
            ArrayList<Object> arguments = new ArrayList<>();
            if (query.getStr() != "") {
                sql += " AND sh_str_id = ?";
                arguments.add(query.getStr());
            }
            if (query.getFactor() != "") {
                sql += " AND f_description = ?";
                arguments.add(query.getFactor());
            }
            return jdbcTemplate.query(sql, arguments.toArray(), new BeanPropertyRowMapper<>(FactorMultiplier.class));
        } else {
            FactorMultiplier factorMultiplier = new FactorMultiplier(100, true);
            List<FactorMultiplier> factorMultiplierArrayList = new ArrayList<>();
            factorMultiplierArrayList.add(factorMultiplier);
            return factorMultiplierArrayList;
        }
    }
}
