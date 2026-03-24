---
layout: page
title: Real-Time Fruit Detection on the STM32N6
description: YOLOv5 object detection on the STM32N6570-DK using the Neural ART Accelerator and Edge Impulse
img: assets/img/8.jpg
importance: 3
category: work
related_publications: true
---

**Real-Time Fruit Detection on the STM32N6 with Edge Impulse** deploys a YOLOv5 object detection model on ST's flagship Neural ART Accelerator-equipped microcontroller — achieving real-time bounding-box inference on a zero-flash platform with no external CPU or GPU.

## Hardware: STM32N6570-DK

The [STM32N6570-DK](https://www.st.com/en/evaluation-tools/stm32n6570-dk.html) development board centres on STMicroelectronics' STM32N6, which integrates a dedicated **Neural ART Accelerator (NPU)** alongside the Arm Cortex-M55 core. The NPU provides hardware-accelerated inference for quantised neural networks, dramatically reducing power consumption and latency vs. CPU-only inference on comparable MCUs.

### Zero Internal Flash

The STM32N6 has **no internal flash** — all code, model weights, and data reside in external memory. Boot, firmware, and model binaries are loaded from separate addresses at startup. Deployment therefore requires three distinct binaries placed at three specific memory addresses in a defined order, a non-obvious constraint that affects toolchain setup and debugging.

## Software: Edge Impulse + ST Neural ART Executable Mode

[Edge Impulse](https://edgeimpulse.com/) handles the full ML pipeline: dataset management, model training (YOLOv5 architecture), and export targeting ST's Neural ART Executable format — a binary format the NPU can execute natively without a runtime interpreter layer. The workflow:

1. Collect and label a fruit image dataset in Edge Impulse Studio
2. Train a YOLOv5 model with impulse blocks configured for object detection
3. Export as ST Neural ART Executable targeting the STM32N6
4. Flash three binaries (FSBL boot loader, application firmware, model) to their respective external memory addresses via STM32CubeProgrammer

## Outcome

The deployed system detects fruit in the live camera feed at real-time frame rates, rendering bounding boxes directly on the STM32N6570-DK's display. The project demonstrates the full pipeline from Edge Impulse training to NPU deployment on a zero-flash embedded platform — including the deployment pitfalls specific to the three-binary boot architecture.

## Links

- [Hackster.io Project](https://www.hackster.io/546876/real-time-fruit-detection-on-the-stm32n6-with-edge-impulse-047652)

{% cite spannier2025stm32n6 %}
