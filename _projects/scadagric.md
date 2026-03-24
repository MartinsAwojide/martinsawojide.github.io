---
layout: page
title: SCADAgric
description: LLM function-calling framework for agricultural IoT sensors at the edge
img: assets/img/12.jpg
importance: 1
category: research
related_publications: true
---

**SCADAgric** is an edge-native framework that enables large language models to directly call functions on real-time sensor streams — without routing data through the cloud. Built for precision agriculture, it demonstrates how LLMs can serve as autonomous reasoning agents in low-connectivity environments.

## The Problem

Agricultural sensors (soil moisture, temperature, humidity, CO₂) produce continuous time-series data. Existing IoT deployments require cloud round-trips for any intelligent decision-making — untenable where network connectivity is intermittent or expensive, as in much of Sub-Saharan Africa.

## What We Built

- A **function-calling interface** that exposes sensor read, threshold-check, and actuator-trigger operations as typed tool definitions consumable by an LLM
- An **edge inference runtime** running on Raspberry Pi / NVIDIA Jetson that processes LLM-generated function calls locally
- A **semantic query layer**: farmers or agronomists can ask natural-language questions ("Is soil moisture in field 3 below the irrigation threshold?") and receive grounded answers from live sensor data

## Key Outcomes

- Zero cloud dependency for real-time sensor queries — all inference runs locally
- Demonstrated on a 12-sensor prototype greenhouse setup
- Latency under 200 ms for sensor read + LLM reasoning cycle on Jetson Nano

## Links

- [GitHub Repository](https://github.com/gigwegbe/function-calling-for-sensors-at-the-edge)

{% cite nsanzimfura2024scadagric %}
