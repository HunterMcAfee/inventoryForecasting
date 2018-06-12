package com.syntel.inventoryForecasting.model;

public class QueryReturnQty {

    private Integer avg_qty;

    public QueryReturnQty() {}

    public QueryReturnQty(int avg_qty) {
        this.avg_qty = avg_qty;
    }

    public Integer getAvg_qty() {
        return avg_qty;
    }

    public void setAvg_qty(Integer avg_qty) {
        this.avg_qty = avg_qty;
    }
}
