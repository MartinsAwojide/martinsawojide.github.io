---
layout: post
title: "SCADAgric: Agentic Farm Monitoring"
date: 2025-04-30 12:00:00
description: An agentic farm monitoring system combining IoT simulation, ThingsBoard, Chainlit, and LangGraph for real-time sensor monitoring and LLM-powered decision-making. CMU-Africa Master's Capstone, April 2025.
tags: agentic-ai iot edge langgraph
categories: projects
related_publications: true
---

An agentic farm monitoring system combining IoT simulation, ThingsBoard, Chainlit, and LangGraph to enable real-time sensor monitoring, automated control, alerting, data visualization, and LLM-powered decision-making through a multi-agent architecture.

**Team:** D'Amour Nsanzimfura · Claude Kwizera · George Igwegbe · Martins Awojide

**Resources:** [Slides](https://docs.google.com/presentation/d/1I3JV1gkgichxwABez41WdOuUcY8so8x_/edit?usp=sharing&ouid=112760051114141627573&rtpof=true&sd=true) · [Demo Video](https://drive.google.com/file/d/1Mus7AHhKXssJJ_b-9SEf5u0J7UOpbmte/view?usp=sharing) · [GitHub](https://github.com/gigwegbe/function-calling-for-sensors-at-the-edge)

---

## Project Structure

- **`cloud-integration/`** — Codebase for the initial cloud setup and deployment.
- **`llm/`** — Codebase for running the large language model (LLM) components.
- **`simulated-farm-setup/`** — Code for setting up the simulated farm model and integrating with ThingsBoard.
- **`farm-eda/`** — Exploratory data analysis (EDA) for the Nyagatare Farm in Eastern Province.

To run the project, first complete the setup for ThingsBoard and the IoT Simulator. Once those are configured, you can proceed to set up the agent services and the Flask integration app.

---

## Initial Setup — ThingsBoard and IoT Simulator

- [ThingsBoard Database Setup](https://github.com/gigwegbe/function-calling-for-sensors-at-the-edge/tree/main/simulated-farm-setup/thingsboard/database)
- [ThingsBoard Dashboard Configuration](https://github.com/gigwegbe/function-calling-for-sensors-at-the-edge/tree/main/simulated-farm-setup/thingsboard/dashboard)
- [IoT Simulator Device Setup](https://github.com/gigwegbe/function-calling-for-sensors-at-the-edge/tree/main/simulated-farm-setup/thingsboard/devices)

---

## Agent Services & Flask Integration

1. Clone the repository and set your working directory to the `llm` folder.
2. Install Python 3.11+.
3. Create and activate a virtual environment:

```bash
python3.11 -m venv myenv
source myenv/bin/activate
```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

5. Create a `.env` file with your API credentials:

```bash
TAVILY_API_KEY="tvly-*****"
LANGSMITH_API_KEY="lsv2_*******"
OPENAI_PROJECT_API_KEY='sk-******'
LANGSMITH_PROJECT="SCADAgri-Visualization"
OPENWEATHERMAP_API_KEY='*************'
```

6. Run the agent (Chainlit interface):

```bash
chainlit run sensor_chat_supervisor_agent.py -w --port 8000
```

7. Run the Flask integration app (embeds the Chainlit chat inside ThingsBoard):

```bash
python3 app.py
```

Open `http://localhost:5000` in your browser to see the full interface.

---

## Performance and Evaluation

To test and evaluate agent behaviour using LangGraph and LangSmith:

1. Start the LangGraph development server:

```bash
langgraph dev
```

2. Open `http://127.0.0.1:2024` to view the agent graph.
3. Navigate to LangSmith Studio to test and evaluate the agent.

---

{% cite nsanzimfura2025scadagric %}
