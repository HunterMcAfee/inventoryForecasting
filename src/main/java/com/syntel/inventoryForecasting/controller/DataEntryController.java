package com.syntel.inventoryForecasting.controller;

import com.syntel.inventoryForecasting.model.DataEntry;
import com.syntel.inventoryForecasting.service.DataEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class DataEntryController {

    @Autowired
    private DataEntryService dataEntryService;

    @CrossOrigin
    @RequestMapping(name = "/dataEntry", method = RequestMethod.POST)
    public String storeDataEntry(@RequestBody DataEntry dataEntry) {
        return dataEntryService.storeDataEntry(dataEntry);
    }


}
