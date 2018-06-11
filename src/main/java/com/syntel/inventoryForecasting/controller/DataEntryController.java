package com.syntel.inventoryForecasting.controller;

import com.syntel.inventoryForecasting.model.DataEntry;
import com.syntel.inventoryForecasting.model.FactorModel;
import com.syntel.inventoryForecasting.model.SkuMasterModel;
import com.syntel.inventoryForecasting.model.StrNumModel;
import com.syntel.inventoryForecasting.service.DataEntryService;
import com.syntel.inventoryForecasting.service.FakeInventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DataEntryController {

    @Autowired
    private DataEntryService dataEntryService;

    @Autowired
    private FakeInventoryService fakeInventoryService;

    @CrossOrigin
    @RequestMapping(name = "/dataEntry", method = RequestMethod.POST)
    public String storeDataEntry(@RequestBody DataEntry dataEntry) {
        return dataEntryService.storeDataEntry(dataEntry);
    }

    @CrossOrigin
    @PostMapping("/factorData")
    public List<FactorModel> getFactorData(){
        return fakeInventoryService.fakeServiceDao().getFactorList();
    }

    @CrossOrigin
    @PostMapping("/skuMasterData")
    public List<SkuMasterModel> getSkuData(){
        return fakeInventoryService.fakeServiceDao().getSkuMasterTable();
    }

    @CrossOrigin
    @PostMapping("strMasterData")
    public List<StrNumModel> getStrData(){
        return fakeInventoryService.fakeServiceDao().getStrNumTable();
    }

}
