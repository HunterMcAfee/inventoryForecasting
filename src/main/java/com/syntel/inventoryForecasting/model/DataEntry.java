package com.syntel.inventoryForecasting.model;

public class DataEntry {

    private int storeId;
    private int week;
    private int year;
    private int[] soldQuantuty;
    private String[] skuNum;
    private int factorId;

    public DataEntry() {}

    public DataEntry(int storeId, int week, int year, int[] soldQuantuty, String[] skuNum, int factorId) {
        this.storeId = storeId;
        this.week = week;
        this.year = year;
        this.soldQuantuty = soldQuantuty;
        this.skuNum = skuNum;
        this.factorId = factorId;
    }


    public Integer getStoreId() {
        return storeId;
    }

    public void setStoreId(Integer storeId) {
        this.storeId = storeId;
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

    public int[] getSoldQuantuty() {
        return soldQuantuty;
    }

    public void setSoldQuantuty(int[] soldQuantuty) {
        this.soldQuantuty = soldQuantuty;
    }

    public String[] getSkuNum() {
        return skuNum;
    }

    public void setSkuNum(String[] skuNum) {
        this.skuNum = skuNum;
    }

    public int getFactorId() {
        return factorId;
    }

    public void setFactorId(int factorId) {
        this.factorId = factorId;
    }
}
