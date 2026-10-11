SELECT
    YEAR(OrderDate) AS Year,
    COUNT(*) AS TotalOrders,
    COUNT(CASE WHEN OnlineOrderFlag = 1 THEN 1 END) AS OnlineOrders,
    COUNT(CASE WHEN OnlineOrderFlag = 0 THEN 1 END) AS OfflineOrders,
    SUM(TotalDue) AS TotalRevenue,
    SUM(CASE WHEN OnlineOrderFlag = 1 THEN TotalDue END) AS OnlineRevenue,
    SUM(CASE WHEN OnlineOrderFlag = 0 THEN TotalDue END) AS OfflineRevenue,
    SUM(CASE WHEN OnlineOrderFlag = 1 THEN TotalDue END)
        / COUNT(CASE WHEN OnlineOrderFlag = 1 THEN 1 END) AS AverageValueOnlineOrders,
    SUM(CASE WHEN OnlineOrderFlag = 0 THEN TotalDue END)
        / COUNT(CASE WHEN OnlineOrderFlag = 0 THEN 1 END) AS AverageValueOfflineOrders,
    SUM(Freight) AS TotalFreight,
    SUM(CASE WHEN OnlineOrderFlag = 1 THEN Freight END) AS TotalOnlineFreight,
    SUM(CASE WHEN OnlineOrderFlag = 0 THEN Freight END) AS TotalOfflineFreight,
    ROUND(SUM(Freight) * 100.0 / SUM(TotalDue), 2) AS FreightPercentage,
    SUM(TotalDue) / COUNT(*) AS AverageOrderValue,
    SUM(CASE WHEN OnlineOrderFlag = 1 THEN TotalDue END)
        / COUNT(CASE WHEN OnlineOrderFlag = 1 THEN 1 END) AS AverageOnlineOrderValue,
    SUM(CASE WHEN OnlineOrderFlag = 0 THEN TotalDue END)
        / COUNT(CASE WHEN OnlineOrderFlag = 0 THEN 1 END) AS AverageOfflineOrderValue
FROM Sales.SalesOrderHeader
GROUP BY YEAR(OrderDate)
ORDER BY YEAR(OrderDate) ASC;
