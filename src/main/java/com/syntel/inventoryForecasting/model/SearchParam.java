package com.syntel.inventoryForecasting.model;

public class SearchParam {
    private String str;
    private String sku;
    private String type;
    private String factor;
    private int weekStart;
    private int yearStart;
    private int weekEnd;
    private int yearEnd;

    public SearchParam () {}

    public SearchParam(String str, String sku, String type, String factor, int weekStart, int yearStart, int weekEnd, int yearEnd) {
        this.str = str;
        this.sku = sku;
        this.type = type;
        this.factor = factor;
        this.weekStart = weekStart;
        this.yearStart = yearStart;
        this.weekEnd = weekEnd;
        this.yearEnd = yearEnd;
    }

    public String getStr() {
        return str;
    }

    public void setStr(String str) {
        this.str = str;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFactor() {
        return factor;
    }

    public void setFactor(String factor) {
        this.factor = factor;
    }

    public int getWeekStart() {
        return weekStart;
    }

    public void setWeekStart(int weekStart) {
        this.weekStart = weekStart;
    }

    public int getYearStart() {
        return yearStart;
    }

    public void setYearStart(int yearStart) {
        this.yearStart = yearStart;
    }

    public int getWeekEnd() {
        return weekEnd;
    }

    public void setWeekEnd(int weekEnd) {
        this.weekEnd = weekEnd;
    }

    public int getYearEnd() {
        return yearEnd;
    }

    public void setYearEnd(int yearEnd) {
        this.yearEnd = yearEnd;
    }
}
