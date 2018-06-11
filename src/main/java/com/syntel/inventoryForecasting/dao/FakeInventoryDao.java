package com.syntel.inventoryForecasting.dao;

import com.syntel.inventoryForecasting.model.FactorModel;
import com.syntel.inventoryForecasting.model.FakeDataEntry;
import com.syntel.inventoryForecasting.model.SkuMasterModel;
import com.syntel.inventoryForecasting.model.StrNumModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class FakeInventoryDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;


    // I want to add data entry to the table
    public void addFakeData(FakeDataEntry aFakeData){
        for (int i=0; i < aFakeData.getDataArray().length; i++){
             for(int j=0; j<aFakeData.getDataArray()[i].length; j++){
             }
            System.out.println("INSERT into table values ("+aFakeData.getStrNumber()+","+aFakeData.getFactor()+","+aFakeData.getWeek()+","+aFakeData.getYear()+","+aFakeData.getDataArray()[i]+")");
            System.out.println();
        }
        String sql = "INSERT into __ values(?,?,?,?,?,?)";
        System.out.println("Adding Table Now ... ");
    }


    public List<FactorModel> getFactorList(){
        String SQL = "SELECT * FROM forecast_capstone.factors;";
        List<FactorModel> m = jdbcTemplate.query(SQL, new BeanPropertyRowMapper<>(FactorModel.class));
        return m;
    }

    public List<SkuMasterModel> getSkuMasterTable(){
        String SQL = "SELECT * FROM forecast_capstone.skumaster;";
        List<SkuMasterModel> m = jdbcTemplate.query(SQL, new BeanPropertyRowMapper<>(SkuMasterModel.class));
        return m;
    }

    public List<StrNumModel> getStrNumTable(){
        String SQL = "SELECT * FROM forecast_capstone.strmaster;";
        List<StrNumModel> m = jdbcTemplate.query(SQL, new BeanPropertyRowMapper<>(StrNumModel.class));
        return m;
    }
}
