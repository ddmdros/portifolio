# Diogo Medeiros

Software Engineering Student \| AI agents, LLMs, and model evaluation

Lages, SC, Brazil · ddmdros@proton.me · linkedin.com/in/diogo-medeiros · github.com/ddmdros · portifolio-tawny-xi-55.vercel.app

## Summary

I use AI in production in my own work: I designed and built a Python harness of LLM agents that translates and reviews games for real clients and tripled my throughput, from 300 to about 900 words per hour. I also evaluate model outputs (RLHF) against rubrics. Six years in game localization, two of them in-house in Dublin on AAA titles; currently studying Software Engineering at Infnet.

## AI Projects

### Multi-agent harness for game translation

Python, Claude Code, Antigravity (Gemini) · 2026 · in production · open core: [github.com/ddmdros/agent-harness](https://github.com/ddmdros/agent-harness)

- Designed and built, with Claude Code, an agent pipeline: a translator agent and reviewer subagents (accuracy, fluency, and game mechanics) that run in parallel, merge their suggestions by a fixed rule, and leave the final call to a human.
- Raised my throughput from 300 to about 900 words per hour (40k words in Sep–Oct 2026, excluding what the translation memory already covered), with human review kept on every delivery.
- Wrote Python hooks that decide, from a declarative map, where each agent may write. An anonymization layer with a pre-commit hook keeps client data out of git.
- Measured the token cost of each session from the transcripts. In unattended mode, the agent logs every choice it made on its own to a queue for human approval.
- About 6.6k lines of Python with automated tests and 53 architecture decision records (ADRs). The same rules apply to Claude and Gemini.

### Other AI projects

- **Multi-agent study harness** (Node.js, Claude Code, Antigravity): task backlog with claims that expire after 3 hours, hooks that stop agents from writing to graded assignments, and a script-generated dashboard.
- **Local RAG with evaluation**, built in a pair (Python, LangChain, Ollama, Chroma): similarity, MMR, and multi-query retrieval, with evaluation: 15/15 on retrieval and 4/4 refusals on the glossary. [github.com/ddmdros/rag-gta](https://github.com/ddmdros/rag-gta)
- **Tool-calling agent**, built in a pair (Python, FastAPI, LangChain, PostgreSQL, React): a gaming marketplace where the agent queries a public API and the database. [github.com/ddmdros/Netplay](https://github.com/ddmdros/Netplay)

## Experience

### AI Evaluator (RLHF and data annotation)

Freelance, short-term projects via micro1 and Mercor · 2026

- Evaluated and compared Portuguese LLM responses against rubrics (RLHF), rated images, and annotated robotics data for model training.

### In-house Brazilian Portuguese Translator and Editor

Keywords Studios, on the Bungie and Supercell teams · Dublin, Ireland · Jan 2023 – Nov 2024

- Translated and ran linguistic quality assurance (LQA) on Destiny 2 (316k+ peak concurrent players) and Supercell games (5B+ downloads), with weekly live-service releases, in international teams of 40 to 60 people.

### Game Translator and Localizer

Freelance · Oct 2020 – present

- Translated over 1 million words from English into Brazilian Portuguese across indie and AAA games, such as Wartales and Railway Empire 2. Since 2026, I work with the agent harness described above.

## Education

- **B.Sc. in Software Engineering**, Instituto Infnet · 2025 – Oct 2029 (expected). Next block: AI Agent Analysis and Security.
- **B.A. in Journalism**, Federal University of Santa Catarina (UFSC) · 2017 – 2022 · GPA 3.8/4.0

## Skills

- **Applied AI:** LLM agents and subagents, prompt and context engineering, hooks and guardrails, RAG, tool calling, output evaluation (RLHF, rubrics), token cost. Tools: Claude Code, Antigravity (Gemini), LangChain, Ollama, Chroma, OpenAI
- **Languages and frameworks:** Python, Java, C#, TypeScript, JavaScript, SQL · FastAPI, Spring Boot, PostgreSQL, React, Vite
- **Engineering:** Git, automated testing (pytest, JUnit), ADRs, spec-driven development with OpenSpec

## Certifications and languages

Google Cloud: **Generative AI Leader** and **Cloud Computing Foundations** (2026) · Alura: **Object-Oriented Programming in Java**

Portuguese (native) · English C2 (EF SET, 2022: efset.org/cert/iwWZUS) · French (intermediate)
