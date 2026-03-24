---
layout: page
title: Inflation Nowcasting
description: High-frequency ML models for real-time inflation estimation in Sub-Saharan Africa
img: assets/img/7.jpg
importance: 2
category: research
related_publications: true
---

**Inflation Nowcasting** applies machine learning to high-frequency, non-traditional data sources to produce real-time estimates of inflation — bridging the gap between monthly official statistics and the rapidly changing economic reality on the ground.

## Motivation

In many African economies, official Consumer Price Index (CPI) data is released monthly with a 3–6 week lag. For central banks, businesses, and policymakers, this creates a blind spot in fast-moving inflationary environments (e.g., post-pandemic supply shocks, currency devaluations). Nowcasting — predicting current conditions using leading indicators — addresses this gap.

## Approach

- **Data sources**: Commodity spot prices, currency exchange rates, satellite-derived agricultural productivity indices, web-scraped supermarket price panels, mobile money transaction aggregates
- **Models**: XGBoost, LightGBM, and LSTM ensembles benchmarked against ARIMA and naïve baselines
- **Evaluation**: Rolling-window backtesting across Nigeria, Kenya, Rwanda, and Ghana CPI series (2018–2024)

## Key Findings

- Gradient-boosted models trained on high-frequency data reduce mean absolute error by 31–47% versus AR(12) baselines depending on the country
- Satellite-derived crop indices are the single highest-importance feature for Nigeria and Kenya; mobile money flows dominate for Rwanda
- Weekly granularity is achievable with the proposed pipeline; daily is feasible for countries with richer web-scraped coverage

## Links

- [Preprint (Typst)](https://typst.app/project/rqNGAGxHyRC5f7RdbKp0bs)

{% cite awojide2024nowcasting %}
