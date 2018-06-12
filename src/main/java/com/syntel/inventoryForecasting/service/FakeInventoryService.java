package com.syntel.inventoryForecasting.service;

import com.syntel.inventoryForecasting.dao.FakeInventoryDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FakeInventoryService {

    @Autowired
    FakeInventoryDao fakeInventoryDao;

    public FakeInventoryDao fakeServiceDao(){
        return fakeInventoryDao;
    }
}
