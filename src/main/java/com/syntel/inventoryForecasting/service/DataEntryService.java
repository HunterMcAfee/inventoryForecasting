package com.syntel.inventoryForecasting.service;

import com.syntel.inventoryForecasting.dao.DataEntryDao;
import com.syntel.inventoryForecasting.model.DataEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DataEntryService {

    @Autowired
    private DataEntryDao dataEntryDao;

    public String storeDataEntry(DataEntry dataEntry) {
        return dataEntryDao.storeDataEntry(dataEntry);
    }

}
