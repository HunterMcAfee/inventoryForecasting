package com.syntel.inventoryForecasting.dao;

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

    public List<QueryResult> getPastSales(SearchParam query) {
        String sqlSelect = "SELECT sh_week AS week, sh_year AS year, f_description AS factor, sh_sku_id AS sku_id, sku_description AS description, sh_qty AS quantity";
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
        if(query.getFactor() != "") {
            sqlConditions += " AND f_description = ?";
            arguments.add(query.getFactor());
        }

        if(query.getWeekStart() != 0){ //both weeks were filled out or least the first week was filled
            if(query.getYearStart() != 0){ //if both years exist
                if(query.getYearStart() == query.getYearEnd()){ //if the same year
                    sameYear = true;
                    sqlConditions += "AND sh_week >= 8 AND sh_week <= 50) AND sh_year >= 2016";
                    arguments.add(query.getWeekStart());
                    arguments.add(query.getWeekEnd());
                    arguments.add(query.getYearStart());
                }
                else{//todo: range between years

                }
            }
            else if(query.getYearEnd() != 0){ //only filled the endyear box and not the start year
                sqlConditions += " AND sh_year = ?";
                arguments.add(query.getYearEnd());
            }
            else{ //no year was filled out
                sqlConditions += " AND sh_week >= ? AND sh_week <= ? ";
                arguments.add(query.getWeekStart());
                arguments.add(query.getWeekEnd());
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

        String sql  = sqlSelect + sqlFrom + sqlWhere + sqlConditions + sqlOrder;


        return jdbcTemplate.query(sql, arguments.toArray(), new BeanPropertyRowMapper<>(QueryResult.class));
    }
}
