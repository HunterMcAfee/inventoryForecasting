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

        ArrayList<Object> arguments = new ArrayList<>();


        //todo: add quotes around everything
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
        if(query.getFactor() != ""){
            sqlConditions += " AND f_description = ?";
            arguments.add(query.getFactor());
        }

        //todo: need to figure out date logic
        

        String sqlOrder = " ORDER BY sh_year, sh_week";
        String sql  = sqlSelect + sqlFrom + sqlWhere + sqlConditions + sqlOrder;

        return jdbcTemplate.query(sql, arguments.toArray(), new BeanPropertyRowMapper<>(QueryResult.class));
    }
}
