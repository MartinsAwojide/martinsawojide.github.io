---
layout: page
title: Screen Scraping with a VLM on the Rubik Pi
description: Running Liquid AI's LVLM2.0 1.5B on a Rubik Pi 3 edge device with llama.cpp for visual screen-scraping tasks
img: assets/img/7.jpg
importance: 3
category: work
related_publications: true
---

**Screen Scraping with a Visual Language Model on the Rubik Pi** demonstrates running a compact vision-language model entirely on an ARM-based edge device — no cloud, no GPU — using llama.cpp to parse and interpret on-screen content from camera input.

## Motivation

Screen scraping typically relies on rule-based coordinate mapping or OCR pipelines tied to a fixed display layout. A VLM-based approach is layout-agnostic: the model reads the screen the way a person would, making it robust to display format changes and usable across different meter types, dashboards, or UI panels without retraining.

## Hardware: Rubik Pi 3

The [Rubik Pi 3](https://www.rubikpi.ai/) is a Qualcomm-based single-board computer designed for edge AI workloads. It provides enough CPU/NPU headroom to run quantised small-scale language models locally — a meaningful step beyond microcontroller-class hardware while remaining deployable in embedded form factors.

## Model: Liquid AI LVLM2.0 1.5B

[Liquid AI's LVLM2.0](https://www.liquid.ai/) at 1.5B parameters is a compact vision-language model optimised for efficiency. The 1.5B size is small enough to fit in the memory envelope of the Rubik Pi 3 while retaining the visual reasoning capability needed to extract structured information from screen images.

## Inference Engine: llama.cpp

llama.cpp provides CPU-optimised quantised inference for LLaMA-architecture models, including multimodal extensions. It runs without CUDA, making it compatible with the Rubik Pi's CPU-only compute profile.

## Performance

| Metric | Reading |
| --- | --- |
| Prompt speed | ~19 tok/s |
| Generation | ~9 tok/s |
| Image encode | ~21 s |
| Total time | ~31.6 s |

Image encoding dominates total latency — the model processes the visual token sequence on CPU, which is the primary bottleneck on this hardware class.

## Links

- [Hackster.io Project](https://www.hackster.io/545457/screen-scraping-with-visual-language-model-on-the-rubik-pi-1e7b9a)

{% cite spannier2025rubikpi %}
