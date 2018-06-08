package com.syntel.inventoryForecasting.dao;

import com.syntel.inventoryForecasting.model.QueryResult;
import com.syntel.inventoryForecasting.model.SearchParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
public class ForecastDao {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<QueryResult> getPastSales(SearchParam query) {
        String sql = "SELECT sh_week AS week, sh_year AS year, f_description AS factor, sh_sku_id AS sku_id, sku_description AS description, sh_qty AS quantity FROM saleshistory, factors, skumaster WHERE sh_factor_id = f_id AND sh_sku_id = sku_id ORDER BY sh_year, sh_week LIMIT 1";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(QueryResult.class));
//        List<QueryResult> results = new ArrayList<>();
//        QueryResult test = new QueryResult();
//        results.add(test);
//        return results;
    }
}
