package com.syntel.inventoryForecasting.model;

public class FactorMultiplier {
    private float factorMultiplier;
    private boolean sign;

    public FactorMultiplier() {
    }

    public FactorMultiplier(float factorMultiplier, boolean sign) {
        this.factorMultiplier = factorMultiplier;
        this.sign = sign;
    }

    public float getFactorMultiplier() {
        return factorMultiplier;
    }

    public void setFactorMultiplier(float factorMultiplier) {
        this.factorMultiplier = factorMultiplier;
    }

    public boolean isSign() {
        return sign;
    }

    public void setSign(boolean sign) {
        this.sign = sign;
    }
}
