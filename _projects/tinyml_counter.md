---
layout: page
title: TinyML Digital Counter
description: Screen-scraping electricity meter displays with a custom neural network on an OpenMV Cam M7
img: assets/img/6.jpg
importance: 4
category: work
related_publications: true
---

**TinyML Digital Counter** is an edge AI system that reads digital electricity meter displays autonomously — capturing digit images on a microcontroller, running inference locally, and transmitting readings to a cloud dashboard over WiFi via MQTT.

## Problem

In Nigeria and across much of Sub-Saharan Africa, electricity meters are still read manually by field agents visiting millions of households monthly. This is expensive, error-prone, and creates billing disputes. The goal was a low-cost device that could be retrofitted in front of an existing meter display — no hardware modification to the meter itself.

## Solution

- **Screen scraping** approach: a rule-based coordinate mapping pipeline segments the meter display image, isolates each digit (15×20 px), and detects the decimal point position
- **Custom neural network** (three dense layers) trained on 3,260 labeled digit samples — a MobileNet baseline achieved only 20.2% accuracy on the non-standard 15×20 input; the custom model reached **99.8% accuracy**
- **TensorFlow Lite** (INT8 quantised) deployed on an **OpenMV Cam M7** running MicroPython via OpenMV IDE
- Model trained and optimised in **Edge Impulse Studio**
- Readings transmitted over WiFi using **MQTT** to an **Adafruit IO** cloud dashboard for real-time monitoring

## Key Outcomes

- 99.8% digit recognition accuracy on held-out test set
- Full pipeline runs on a microcontroller — no cloud inference required
- Presented at the Hackster.io Impact Summit 2023

## Links

- [Hackster.io Project](https://www.hackster.io/491913/tinyml-digital-counter-for-electric-metering-system-e5e36f)
- [GitHub](https://github.com/gigwegbe/tinyml-digital-counter-for-metering)
- [NVIDIA Community Video](https://www.youtube.com/watch?v=JzMmXoWW9dc)

{% cite igwegbe2023tinyml %}
