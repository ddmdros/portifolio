# Diogo Medeiros

Estudante de Engenharia de Software \| Agentes de IA, LLMs e avaliação de modelos

Lages, SC · ddmdros@proton.me · linkedin.com/in/diogo-medeiros · github.com/ddmdros · portifolio-tawny-xi-55.vercel.app

## Resumo

Uso IA em produção no meu próprio trabalho: projetei e construí um harness de agentes de LLM em Python que traduz e revisa jogos para clientes reais e triplicou minha produtividade, de 300 para cerca de 900 palavras por hora. Também avalio respostas de modelos (RLHF) com rubricas. Tenho 6 anos de localização de jogos, 2 deles in-house em Dublin em títulos AAA, e curso Engenharia de Software no Infnet.

## Projetos de IA

### Harness multiagente para tradução de jogos

Python, Claude Code, Antigravity (Gemini) · 2026 · em produção · núcleo aberto: [github.com/ddmdros/agent-harness](https://github.com/ddmdros/agent-harness)

- Projetei e construí, com Claude Code, um pipeline de agentes: um agente tradutor e subagentes revisores (fidelidade, naturalidade e mecânica de jogo) que rodam em paralelo, juntam as sugestões por regra e deixam a decisão final para um humano.
- Aumentei minha produtividade de 300 para cerca de 900 palavras por hora (40 mil palavras em set–out/2026, sem contar o que a memória de tradução já cobria), sem tirar a revisão humana de cada entrega.
- Escrevi travas (hooks) em Python que decidem, a partir de um mapa declarativo, onde cada agente pode escrever. Uma camada de anonimização com pre-commit impede que dado de cliente entre no git.
- Medi o custo de cada sessão em tokens a partir dos transcripts. Em modo sem supervisão, o agente registra numa fila cada escolha que fez sozinho, para aprovação humana.
- Cerca de 6,6 mil linhas de Python com testes automatizados e 53 registros de decisão (ADRs). As mesmas regras valem para Claude e Gemini.

### Outros projetos de IA

- **Harness de estudo com vários agentes** (Node.js, Claude Code, Antigravity): backlog com reserva de tarefa que expira em 3 horas, hooks que impedem o agente de escrever nos trabalhos avaliados e painel gerado por script.
- **RAG local com avaliação**, em dupla (Python, LangChain, Ollama, Chroma): busca por similaridade, MMR e múltiplas consultas, com conjunto de avaliação de recuperação e de recusa. [github.com/ddmdros/rag-gta](https://github.com/ddmdros/rag-gta)
- **Agente com tool calling**, em dupla (Python, FastAPI, LangChain, PostgreSQL, React): marketplace de jogos em que o agente consulta uma API pública e o banco de dados. [github.com/ddmdros/Netplay](https://github.com/ddmdros/Netplay)

## Experiência

### Avaliador de IA (RLHF e anotação de dados)

Autônomo, em projetos pontuais via micro1 e Mercor · 2026

- Avaliei e comparei respostas de LLMs em português com rubricas (RLHF), avaliei imagens e anotei dados de robótica para treino de modelos.

### Tradutor e editor in-house de português brasileiro

Keywords Studios, nas equipes da Bungie e da Supercell · Dublin, Irlanda · jan/2023 – nov/2024

- Fiz tradução e controle de qualidade linguística (LQA) de Destiny 2 (mais de 316 mil jogadores simultâneos no pico) e de jogos da Supercell (mais de 5 bilhões de downloads), com entregas semanais de live-service, em equipes internacionais de 40 a 60 pessoas.

### Tradutor e localizador de jogos

Autônomo · out/2020 – atual

- Traduzi mais de 1 milhão de palavras do inglês para o português em jogos indie e AAA, como Wartales e Railway Empire 2. Desde 2026, trabalho com o harness de agentes descrito acima.

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
