---
layout: page
title: AutoVisionInspector
description: Edge-deployed automated visual quality inspection for manufacturing defect detection
img: assets/img/9.jpg
importance: 5
category: work
related_publications: true
---

**AutoVisionInspector** is an automated visual quality inspection pipeline designed for deployment directly on edge hardware — achieving near-cloud accuracy with sub-10 ms inference latency, making real-time defect detection feasible on factory floors without cloud connectivity.

## Background

Visual inspection of manufactured goods (packaging integrity, surface defects, fill-level checking) is traditionally done by human inspectors or expensive vision systems costing $50,000+. Modern deep learning makes it possible to build accurate vision models, but cloud inference introduces unacceptable latency (>100 ms) and connectivity dependency for high-speed production lines.

## What We Built

- A **YOLOv8-based defect detection model** fine-tuned on a custom dataset of packaging defects (incorrect labels, dents, seal failures) from a Nigerian food production facility
- **TensorRT optimisation pipeline**: FP16 precision conversion reduces model size by 2× and improves throughput 3.8× on Jetson Orin compared to native PyTorch
- **Streaming inference server** accepting RTSP camera feeds, processing at 120 FPS on Jetson AGX Orin
- Integration with **OPC-UA** industrial protocol for direct communication with PLC reject actuators

## Performance

| Metric | Cloud (GPU server) | Edge (Jetson Orin) |
| --- | --- | --- |
| Inference latency | 8 ms | 9.2 ms |
| Throughput | 125 FPS | 108 FPS |
| Accuracy (mAP@0.5) | 91.3% | 90.8% |

Accuracy degradation of <0.5% with full independence from cloud infrastructure.

## Links

See {% cite igwegbe2025autovision %} for the full technical report.
