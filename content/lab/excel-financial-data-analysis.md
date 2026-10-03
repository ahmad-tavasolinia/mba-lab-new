---
title: "Excel: Financial Data Analysis"
date: "2026-09-18"
code: "MBA·LAB·20"
journeyPhase: "phase-1"
category: "projects"
topics: ["finance"]
summary: "Building a transaction-level financial model to analyze spending patterns, cash flow, and financial performance."
centralQuestion: "How can a simple transaction-level dataset be turned into a useful financial model in Excel?"
keyIdeas:
  - "Separate transaction-level data from the summary calculations that use it."
  - "Use criteria-based formulas to turn raw transactions into meaningful financial measures."
  - "Build a model that makes both overall performance and category-level spending easy to inspect."
connections: []
openQuestions:
  - "How could the model be extended to analyze spending trends over multiple months?"
  - "What additional metrics or visualizations would make the model more useful for decision-making?"
finalPerspective: "The project is a small example of turning structured financial data into a model that can be explored, checked, and extended."
sources: []
projectType: "Excel"
practice:
  - "Excel Tables and structured references"
  - "SUMIF"
  - "SUMIFS"
  - "COUNTIF"
  - "COUNTA"
  - "MAXIFS"
  - "XLOOKUP"
  - "Basic arithmetic and cell references"
  - "Charts for financial data visualization"
screenshots:
  - src: "/mba-lab/projects/financial-data-analysis/monthly-spending-by-category.png"
    alt: "Excel chart showing monthly spending by category"
    caption: "Monthly Spending by Category, comparing expense totals across categories."
  - src: "/mba-lab/projects/financial-data-analysis/income-and-expenses.png"
    alt: "Excel chart comparing total income and total expenses"
    caption: "Income and Expenses, a visual comparison of total income and total expenses."
  - src: "/mba-lab/projects/financial-data-analysis/summary.png"
    alt: "Excel summary table with financial calculations"
    caption: "Summary, the calculated financial measures produced from the transaction table."
  - src: "/mba-lab/projects/financial-data-analysis/transactions.png"
    alt: "Excel transaction table"
    caption: "Transaction Database, the structured table used as the underlying dataset."
download:
  label: "Download the Excel file"
  href: "/mba-lab/projects/financial-data-analysis/financial-data-analysis.xlsx"
---

I built this project as a small transaction-level financial model in Excel. The workbook starts with a structured transaction table and turns it into a financial summary covering income, expenses, net balance, spending by category, transaction counts, average expense, and the largest expense. The goal was to practice moving from raw financial data to calculations and then to a clearer view of financial performance.

The project also gave me a chance to practice Excel formulas in a real, connected model rather than as isolated exercises. The summary calculations use criteria-based functions and lookups against the transaction table, while charts make some of the results easier to interpret.
