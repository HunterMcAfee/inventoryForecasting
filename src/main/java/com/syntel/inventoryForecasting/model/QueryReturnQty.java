package com.syntel.inventoryForecasting.model;

public class QueryReturnQty {

    private Integer avg_qty;

    public QueryReturnQty() {}

    public QueryReturnQty(int avg_qty) {
        this.avg_qty = avg_qty;
    }

    public int getAvg_qty() {
        return avg_qty;
    }

    public void setAvg_qty(int avg_qty) {
        this.avg_qty = avg_qty;
    }
}
