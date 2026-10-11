---
title: "SQL: Business Analysis: Sales Performance"
date: "2026-10-11"
code: "MBA·LAB·22"
journeyPhase: "phase-1"
category: "projects"
topics: ["finance", "strategy"]
summary: "Using SQL Server and AdventureWorks data to compare online and offline sales performance from 2011 to 2014."
centralQuestion: "How did sales performance change between 2011 and 2014, and how did online and offline sales compare?"
keyIdeas:
  - "More orders do not necessarily mean more revenue."
  - "Offline sales generated more revenue per order and more total revenue, despite lower order volume."
  - "The sharp 2014 revenue decline warrants further investigation beyond order counts."
connections: []
openQuestions:
  - "Did customers place smaller orders in 2014, did the product mix change, or was something else happening?"
  - "Which channel is more profitable after discounts, marketing, and fulfillment costs?"
finalPerspective: "The project offered practice in using SQL to identify transactional patterns and turn them into questions for further analysis."
sources: []
projectType: "SQL Server"
practice:
  - "SQL Server and T-SQL"
  - "Aggregate functions: SUM and COUNT"
  - "Conditional aggregation with CASE WHEN"
  - "Grouping and sorting with GROUP BY and ORDER BY"
  - "Extracting years from dates with YEAR()"
  - "Calculating average order value and revenue ratios"
  - "Comparing online and offline sales performance"
  - "Interpreting query results in a business context"
screenshots:
  - src: "/projects/sql-business-analysis-sales-performance/annual-sales-results.png"
    alt: "SQL Server query and annual sales results for 2011 through 2014"
    caption: "Annual sales results from the AdventureWorks sample database, grouped by online and offline orders."
download:
  label: "Download SQL Query (.sql)"
  href: "/projects/sql-business-analysis-sales-performance/Annual_Sales_Analysis.sql"
---

I used SQL Server to explore sales data from the AdventureWorks sample database, comparing online and offline sales between 2011 and 2014. I wanted to answer a simple question: how did sales performance change between 2011 and 2014, and how did online and offline sales compare?

SQL_QUERY_INSERTION_POINT

## What I Found

Total orders grew by around 7.3 times between 2011 and 2014. The biggest jump occurred between 2012 and 2013, when order volume increased by approximately 3.6 times. In 2014, however, total orders fell by about 17%.

Online orders grew from 1,201 in 2011 to 11,131 in 2014, an increase of more than nine times. Offline orders followed a different pattern: they increased initially, but by 2014 their annual volume was much closer to the 2011 level.

Revenue followed a more surprising trajectory. It increased substantially from 2011 to 2012, rose by around 30% in 2013, and then dropped by approximately 54% in 2014. The decline was much sharper than the fall in order volume, making 2014 particularly interesting to investigate.

Another finding was the difference between order volume and revenue across the two channels. Online orders were much more numerous, but offline sales generated more revenue in every year analyzed. In 2014, offline revenue was about 1.4 times online revenue, compared with approximately 3.1 times in 2013.

This difference was also reflected in average order value. Offline orders had a substantially higher average value than online orders throughout the period, although average order value declined in both channels in 2014.

Freight costs added another dimension to the comparison. Total offline freight was higher than online freight in every year, but the gap narrowed considerably by 2014. This was worth exploring alongside the growth in online orders and the narrowing revenue gap.

## Key Insights

The analysis highlighted an important distinction: more orders do not necessarily mean more revenue. Online sales dominated order volume, while offline sales continued to generate more revenue per order and in total.

The online channel may offer room for growth, particularly if the business can increase average order value while managing fulfillment costs. However, the data alone cannot establish which channel is more profitable. That would require looking at other costs, such as discounts, marketing, and order fulfillment.

The sharp revenue decline in 2014 also raises a question worth investigating: did customers start placing smaller orders, did the product mix change, or was something else happening?

This project gave me an opportunity to practice SQL in a business context, identify patterns in transactional data, and turn those patterns into questions for further analysis.
