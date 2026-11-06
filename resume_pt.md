# Diogo Medeiros

Estudante de Engenharia de Software \| Agentes de IA, LLMs e avaliação de modelos

Lages, SC · ddmdros@proton.me · linkedin.com/in/diogo-medeiros · github.com/ddmdros · portifolio-tawny-xi-55.vercel.app

## Resumo

Projetei e construí um harness de agentes de LLM em Python: hooks decidem onde cada agente pode escrever, uma regra fixa junta as sugestões dos revisores e as decisões de julgamento vão para uma fila de aprovação humana, com 46 testes e CI em Linux e Windows. Também avalio respostas de modelos (RLHF) com rubricas. Tenho 6 anos de localização de jogos, 2 deles in-house em Dublin em títulos AAA, e curso Engenharia de Software no Infnet.

## Projetos de IA

### agent-harness: travas para agentes de LLM

Python (só biblioteca padrão), Claude Code, Antigravity (Gemini) · 2026 · [github.com/ddmdros/agent-harness](https://github.com/ddmdros/agent-harness)

- Projetei e construí, com Claude Code, um pipeline de tradução com vários agentes: um agente tradutor e dois subagentes revisores (estilo e mecânica de jogo) rodam em paralelo, uma regra fixa em código junta as sugestões por prioridade e só os segmentos que exigem julgamento chegam a um humano.
- Escrevi travas (hooks) em Python que decidem, a partir de um mapa declarativo de zonas, onde cada agente pode escrever; o que fica fora do mapa é bloqueado. Um único ponto de entrada atende Claude Code e Antigravity.
- Em modo sem supervisão, todo "perguntar" vira "negar"; as escolhas que o agente faz sozinho vão para uma fila de aprovação humana, cada escrita entra num registro de auditoria só de acréscimo e o custo em tokens é medido por agente a partir dos transcripts.
- Demonstrado num jogo fictício, com 46 testes automatizados, CI em Linux e Windows e 6 registros de decisão (ADRs).

### Outros projetos de IA

- **Harness de estudo com vários agentes** (Node.js, Claude Code, Antigravity): backlog com reserva de tarefa que expira em 3 horas, hooks que impedem o agente de escrever nos trabalhos avaliados e painel gerado por script.
- **RAG local com avaliação**, em dupla (Python, LangChain, Ollama, Chroma): três modos de busca; 15/15 na recuperação e 4/4 recusas sobre um glossário de localização PT-BR de que sou coautor. [github.com/ddmdros/rag-gta](https://github.com/ddmdros/rag-gta)
- **Agente com tool calling**, em dupla (Python, FastAPI, LangChain, React): assistente de games em que o agente decide quando consultar uma API pública de jogos, com testes sem rede e CI. [github.com/ddmdros/Netplay](https://github.com/ddmdros/Netplay)

## Experiência

### Avaliador de IA (RLHF e anotação de dados)

Autônomo, em projetos pontuais via micro1 e Mercor · 2026

- Avaliei e comparei respostas de LLMs em português com rubricas (RLHF), avaliei imagens e anotei dados de robótica para treino de modelos.

### Tradutor e editor in-house de português brasileiro

Keywords Studios, nas equipes da Bungie e da Supercell · Dublin, Irlanda · jan/2023 – nov/2024

- Fiz tradução e controle de qualidade linguística (LQA) de Destiny 2 (mais de 316 mil jogadores simultâneos no pico) e de jogos da Supercell (mais de 5 bilhões de downloads), com entregas semanais de live-service, em equipes internacionais de 40 a 60 pessoas.

### Tradutor e localizador de jogos

Autônomo · out/2020 – atual

- Traduzi mais de 1 milhão de palavras do inglês para o português em jogos indie e AAA, como Wartales e Railway Empire 2.

## Formação

- **Bacharelado em Engenharia de Software**, Instituto Infnet · 2025 – out/2029 (previsão). Próximo bloco: Análise e Segurança de Agentes de IA.
- **Bacharelado em Jornalismo**, UFSC · 2017 – 2022 · média 9,54/10

## Habilidades

- **IA aplicada:** agentes e subagentes de LLM, engenharia de prompt e de contexto, hooks e guardrails, RAG, tool calling, avaliação de saídas (RLHF, rubricas), custo em tokens. Ferramentas: Claude Code, Antigravity (Gemini), LangChain, Ollama, Chroma, OpenAI
- **Linguagens e frameworks:** Python, Java, C#, TypeScript, JavaScript, SQL · FastAPI, Spring Boot, PostgreSQL, React, Vite
- **Engenharia:** Git, testes automatizados (pytest, JUnit), ADRs, especificação com OpenSpec

## Certificações e idiomas

Google Cloud: **Generative AI Leader** e **Cloud Computing Foundations** (2026) · Alura: **POO com Java**

Português (nativo) · Inglês C2 (EF SET, 2022: efset.org/cert/iwWZUS) · Francês intermediário
