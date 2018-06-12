package com.syntel.inventoryForecasting.model;

public class SkuMasterModel {

    private String sku_id;
    private String sku_description;

    public SkuMasterModel() {
    }

    public String getSku_id() {
        return sku_id;
    }

    public void setSku_id(String sku_id) {
        this.sku_id = sku_id;
    }

    public String getSku_description() {
        return sku_description;
    }

    public void setSku_description(String sku_description) {
        this.sku_description = sku_description;
    }
}
