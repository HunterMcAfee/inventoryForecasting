package com.syntel.inventoryForecasting.model;

public class QueryResult {
    private int week;
    private int year;
    private String factor;
    private String sku_id;
    private String description;
    private int quantity;

    public QueryResult () {}

    public QueryResult(int week, int year, String factor, String sku_id, String description, int quantity) {
        this.week = week;
        this.year = year;
        this.factor = factor;
        this.sku_id = sku_id;
        this.description = description;
        this.quantity = quantity;
    }

    public int getWeek() {
        return week;
    }

    public void setWeek(int week) {
        this.week = week;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getFactor() {
        return factor;
    }

    public void setFactor(String factor) {
        this.factor = factor;
    }

    public String getSku_id() {
        return sku_id;
    }

    public void setSku_id(String sku_id) {
        this.sku_id = sku_id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
