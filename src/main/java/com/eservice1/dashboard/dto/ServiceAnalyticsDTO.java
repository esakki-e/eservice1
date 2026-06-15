package com.eservice1.dashboard.dto;

public class ServiceAnalyticsDTO {

    private String serviceName;
    private Long requestCount;

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(
            String serviceName) {

        this.serviceName =
                serviceName;
    }

    public Long getRequestCount() {
        return requestCount;
    }

    public void setRequestCount(
            Long requestCount) {

        this.requestCount =
                requestCount;
    }
}