package com.syntel.inventoryForecasting.model;

public class FakeDataEntry {

    private Integer strNumber;
    private Integer factor;
    private Integer week;
    private Integer year;
    private Integer[][] dataArray;

    public FakeDataEntry() {
        System.out.println("1st Contruct");
    }

    public FakeDataEntry(Integer strNumber, Integer factor, Integer week, Integer year, Integer[][] dataArray) {
        this.strNumber = strNumber;
        this.factor = factor;
        this.week = week;
        this.year = year;
        this.dataArray = dataArray;
        System.out.println("2nd Contruct");
    }

    public Integer getStrNumber() {
        return strNumber;
    }

    public void setStrNumber(Integer strNumber) {
        this.strNumber = strNumber;
    }

    public Integer getFactor() {
        return factor;
    }

    public void setFactor(Integer factor) {
        this.factor = factor;
    }

    public Integer getWeek() {
        return week;
    }

    public void setWeek(Integer week) {
        this.week = week;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer[][] getDataArray() {
        return dataArray;
    }

    public void setDataArray(Integer[][] dataArray) {
        this.dataArray = dataArray;
    }
}
