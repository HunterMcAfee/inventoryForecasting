package com.syntel.inventoryForecasting.dao;

import com.syntel.inventoryForecasting.model.DataEntry;
import com.syntel.inventoryForecasting.model.QueryReturnQty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.List;

@Component
public class DataEntryDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    @Qualifier("dataSource")
    DataSource dataSource;

    private String storeData = "INSERT into forecast_capstone.saleshistory (sh_str_id, sh_week, sh_year, sh_qty, sh_sku_id, sh_factor_id) values (?,?,?,?,?,?)";
    private String avgQtyByFactor = "SELECT round(AVG(sh_qty)) AS avg_qty from forecast_capstone.saleshistory where sh_factor_id = ? and sh_str_id = ? and sh_sku_id = ?";
    private String storeFactorData = "INSERT into forecast_capstone.salesfactor (sf_sh_id, sf_f_id, sf_sign, sf_percentvalue) values (?,?,?,?)";


    public String storeDataEntry(DataEntry dataEntry) {
        System.out.println(dataEntry.getStoreId());
        System.out.println(dataEntry.getFactorId());
        System.out.println(dataEntry.getWeek());
        System.out.println(dataEntry.getYear());
        for (String str : dataEntry.getSkuNum()) {
            System.out.println("SKU NUM : " + str );
        }
        for (int qty : dataEntry.getSoldQuantuty()) {
            System.out.println("QTY SOLD : " + qty);
        }

        int stoteId = dataEntry.getStoreId();
        int [] quantityArr = dataEntry.getSoldQuantuty();
        String [] skuArr = dataEntry.getSkuNum();
        System.out.println(skuArr.length);


//        List<Double> aveQuantityNormalDay1 = jdbcTemplate.query("SELECT AVG(sh_qty) from saleshistory where sh_factor_id = " + dataEntry.getFactorId(), new BeanPropertyRowMapper<>(Double.class));
//        System.out.println(aveQuantityNormalDay.get(0));
        List<QueryReturnQty> aveQuantityNormalDay = null;
        List<QueryReturnQty> listOfPKSalesFactor = null;
        int [] listOfAveQtyNormalDay = new int[skuArr.length];
        int index = 0;

        for (String skuStr : skuArr) {
            aveQuantityNormalDay = jdbcTemplate.query("SELECT round(AVG(sh_qty)) AS avg_qty from forecast_capstone.saleshistory where saleshistory.sh_factor_id = " + 0 + " and saleshistory.sh_str_id = " + stoteId + " and saleshistory.sh_sku_id LIKE  '%" + skuStr + "%'", new BeanPropertyRowMapper<>(QueryReturnQty.class));
//            aveQuantityNormalDay = jdbcTemplate.query("SELECT round(AVG(sh_qty)) AS avg_qty from forecast_capstone.saleshistory where saleshistory.sh_factor_id = " + 0 + " and saleshistory.sh_str_id = " + stoteId, new BeanPropertyRowMapper<>(QueryReturnQty.class));
          //  aveQuantityNormalDay = jdbcTemplate.query(avgQtyByFactor, )
//            aveQuantityByFactor = jdbcTemplate.query(avgQtyByFactor + dataEntry.getFactorId() + " and sh_sku_id = " + skuStr, new BeanPropertyRowMapper<>(QueryReturnQty.class));
            listOfAveQtyNormalDay[index] = aveQuantityNormalDay.get(0).getAvg_qty();
            index++;
        }
        for(int i = 0; i < skuArr.length; i++) {
            System.out.println(listOfAveQtyNormalDay[i]);
        }
        //List<QueryReturnQty> aveQuantityNormalDay = jdbcTemplate.query("SELECT sh_qty from forecast_capstone.saleshistory where sh_factor_id = " + dataEntry.getFactorId(), new BeanPropertyRowMapper<>(QueryReturnQty.class));

//        int avgQtyNormalDay = aveQuantityNormalDay.get(0).getAvg_qty();
//        System.out.println(avgQtyNormalDay);

//        //List<QueryReturnQty> aveQuantityNormalDay = jdbcTemplate.query("SELECT sh_qty from forecast_capstone.saleshistory where sh_factor_id = " + dataEntry.getFactorId(), new BeanPropertyRowMapper<>(QueryReturnQty.class));
//        int avgQtyByFactor = aveQuantityByFactor.get(0).getAvg_qty();
//        System.out.println(avgQtyByFactor);
        int [] primarykeyOfsalesfactor = new int[skuArr.length];
        for(int i = 0; i < skuArr.length; i++) {
            jdbcTemplate.update(storeData, dataEntry.getStoreId(), dataEntry.getWeek(), dataEntry.getYear(), quantityArr[i],
                    skuArr[i], dataEntry.getFactorId());
            listOfPKSalesFactor = jdbcTemplate.query("select max(sh_id) AS avg_qty from forecast_capstone.saleshistory", new BeanPropertyRowMapper<>(QueryReturnQty.class));
            primarykeyOfsalesfactor[i] = listOfPKSalesFactor.get(0).getAvg_qty();
            System.out.println("12345");
        }

        for (int pk : primarykeyOfsalesfactor) {
            System.out.println(pk);
        }
        int percentage = 0;
        int sign = 0;

        for(int i = 0; i < skuArr.length; i++) {
            System.out.println("+++++++++++++");
            int averageQuantitySkuByNormalday = listOfAveQtyNormalDay[i];
           // int averageQuantitySkuByFactorId = aveQuantityByFactor.get(i).getAvg_qty();
            int quantityForSku = quantityArr[i];

            if(quantityForSku > averageQuantitySkuByNormalday) {
                double temp = quantityForSku -  averageQuantitySkuByNormalday;
                percentage = (int) Math.round((temp / averageQuantitySkuByNormalday) * 100);
                sign = 1;
            } else if (averageQuantitySkuByNormalday > quantityForSku) {
                double temp = averageQuantitySkuByNormalday - quantityForSku;
                percentage = (int) Math.round(((temp / averageQuantitySkuByNormalday) * 100));
                sign = 0;
            } else {
                percentage = 0;
                sign = 1;
            }
            System.out.println("Percentage: " + percentage + " sign " + sign);
            System.out.println(primarykeyOfsalesfactor[i]);
            jdbcTemplate.update(storeFactorData, primarykeyOfsalesfactor[i], dataEntry.getFactorId(), sign, percentage);
        }

        return "Mayur Maisuria Syntel";
    }
}
