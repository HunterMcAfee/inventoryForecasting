package com.syntel.inventoryForecasting.model;

import java.util.List;

public class ForecastPayload {
    private List<QueryResult> pastInfoResults;
    private SearchParam searchParams;

    public ForecastPayload() {
    }

    public ForecastPayload(List<QueryResult> pastInfoResults, SearchParam searchParams) {
        this.pastInfoResults = pastInfoResults;
        this.searchParams = searchParams;
    }

    public List<QueryResult> getPastInfoResults() {
        return pastInfoResults;
    }

    public void setPastInfoResults(List<QueryResult> pastInfoResults) {
        this.pastInfoResults = pastInfoResults;
    }

    public SearchParam getSearchParams() {
        return searchParams;
    }

    public void setSearchParams(SearchParam searchParams) {
        this.searchParams = searchParams;
    }
}
