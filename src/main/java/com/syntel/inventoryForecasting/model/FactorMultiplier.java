package com.syntel.inventoryForecasting.model;

public class FactorMultiplier {
    private int sf_percentage;
    private boolean sf_sign;

    public FactorMultiplier() {
    }

    public FactorMultiplier(int sf_percentage, boolean sf_sign) {
        this.sf_percentage = sf_percentage;
        this.sf_sign = sf_sign;
    }

    public int getSf_percentage() {
        return sf_percentage;
    }

    public void setSf_percentage(int sf_percentage) {
        this.sf_percentage = sf_percentage;
    }

    public boolean isSf_sign() {
        return sf_sign;
    }

    public void setSf_sign(boolean sf_sign) {
        this.sf_sign = sf_sign;
    }
}
