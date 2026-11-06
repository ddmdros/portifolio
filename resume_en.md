# Diogo Medeiros

Software Engineering Student \| AI agents, LLMs, and model evaluation

Lages, SC, Brazil · diiogomedeirosdev@gmail.com · linkedin.com/in/diogo-medeiros · github.com/ddmdros · portifolio-tawny-xi-55.vercel.app

## Summary

I designed and built a Python harness of LLM agents: hooks decide where each agent may write, a fixed rule merges reviewer suggestions, and judgment calls go to a human approval queue, with 46 tests and CI on Linux and Windows. I also evaluate model outputs (RLHF) against rubrics. Six years in game localization, two of them in-house in Dublin on AAA titles; currently studying Software Engineering at Infnet.

## AI Projects

### agent-harness: guardrails for LLM agents

Python (standard library only), Claude Code, Antigravity (Gemini) · 2026 · [github.com/ddmdros/agent-harness](https://github.com/ddmdros/agent-harness)

- Designed and built, with Claude Code, a multi-agent translation pipeline: a drafter agent and two reviewer subagents (style and game mechanics) run in parallel, a fixed rule in code merges their suggestions by priority, and only the segments that need judgment reach a human.
- Wrote Python hooks that decide, from a declarative write-zone map, where each agent may write; anything outside the map is blocked. One entry point serves both Claude Code and Antigravity.
- In unattended mode, every "ask" becomes a "deny"; the choices an agent makes on its own go to a queue for human approval, every write goes to an append-only audit log, and token cost is measured per agent from the transcripts.
- Shown on an invented demo game, with 46 automated tests, CI on Linux and Windows, and 6 documented design decisions (ADRs).

### Other AI projects

- **Multi-agent study harness** (Node.js, Claude Code, Antigravity): task backlog with claims that expire after 3 hours, hooks that stop agents from writing to graded assignments, and a script-generated dashboard.
- **Local RAG with evaluation**, built in a pair (Python, LangChain, Ollama, Chroma): three retrieval modes; 15/15 on retrieval and 4/4 refusals over a PT-BR localization glossary I co-authored. [github.com/ddmdros/rag-gta](https://github.com/ddmdros/rag-gta)
- **Tool-calling agent**, built in a pair (Python, FastAPI, LangChain, React): a games assistant whose agent decides when to query a public games API, with offline tests and CI. [github.com/ddmdros/Netplay](https://github.com/ddmdros/Netplay)

## Experience

### AI Evaluator (RLHF and data annotation)

Freelance, short-term projects via micro1 and Mercor · 2026

- Evaluated and compared Portuguese LLM responses against rubrics (RLHF), rated images, and annotated robotics data for model training.

### In-house Brazilian Portuguese Translator and Editor

Keywords Studios, on the Bungie and Supercell teams · Dublin, Ireland · Jan 2023 – Nov 2024

- Translated and ran linguistic quality assurance (LQA) on Destiny 2 (316k+ peak concurrent players) and Supercell games (5B+ downloads), with weekly live-service releases, in international teams of 40 to 60 people.

### Game Translator and Linguist

Freelance · Oct 2020 – present

- Translated over 1 million words from English into Brazilian Portuguese across indie and AAA games, such as Wartales and Railway Empire 2.

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
