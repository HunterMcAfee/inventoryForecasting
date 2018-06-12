package com.syntel.inventoryForecasting.model;

public class FactorMultiplier {
    private int sf_percentvalue;
    private boolean sf_sign;

    public FactorMultiplier() {
    }

    public FactorMultiplier(int sf_percentvalue, boolean sf_sign) {
        this.sf_percentvalue = sf_percentvalue;
        this.sf_sign = sf_sign;
    }

    public int getSf_percentvalue() {
        return sf_percentvalue;
    }

    public void setSf_percentvalue(int sf_percentvalue) {
        this.sf_percentvalue = sf_percentvalue;
    }

    public boolean isSf_sign() {
        return sf_sign;
    }

    public void setSf_sign(boolean sf_sign) {
        this.sf_sign = sf_sign;
    }
}
