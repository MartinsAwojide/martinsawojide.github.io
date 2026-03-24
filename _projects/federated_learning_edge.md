---
layout: page
title: Federated Learning at the Edge
description: Multi-site NVFLARE deployment for privacy-preserving ML on heterogeneous hardware
img: assets/img/3.jpg
importance: 3
category: research
related_publications: true
---

**Federated Learning at the Edge** investigates the practical challenges of deploying privacy-preserving machine learning across multiple geographically distributed edge nodes — using NVIDIA FLARE (NVFLARE) on heterogeneous hardware typical of African research and healthcare institutions.

## The Challenge

Centralised training requires pooling sensitive data (medical records, transaction logs, agricultural surveys) to a single server — untenable in many African contexts due to data sovereignty regulations, bandwidth constraints, and institutional trust barriers. Federated learning trains a shared model without ever moving raw data off-device, but real-world deployments face:

- Severe **data heterogeneity** (non-IID distributions across sites)
- **Intermittent connectivity** between nodes
- **Compute heterogeneity** (Jetson AGX vs. Raspberry Pi vs. server GPU in the same federation)

## What We Built

- A 4-node NVFLARE federation spanning Raspberry Pi 4, Jetson Nano, Jetson Orin, and a desktop GPU server
- Custom **FedProx** and **SCAFFOLD** aggregation strategies tuned for high data heterogeneity
- **Asynchronous round management** to handle nodes dropping in and out of training rounds
- Benchmark suite comparing convergence speed, communication cost, and final model accuracy across aggregation strategies

## Key Results

- FedProx with μ=0.01 converged 2.4× faster than FedAvg under the most heterogeneous data split
- End-to-end training on a simulated medical imaging task (chest X-ray classification) matched 94% of centralised accuracy with zero raw data sharing
- Asynchronous mode reduced total wall-clock time by 38% vs. synchronous rounds when one node had 3× slower compute

## Links

- [Poster (Google Slides)](https://docs.google.com/presentation/d/1example)

{% cite igwegbe2024federated %}
