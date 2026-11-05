# rag-gta: local RAG with an evaluation set

**Authors:** Diogo Medeiros, Stephanie Pinho

**Last modified:** 11/05/2026

**Main technologies:** Python, LangChain, Ollama (`llama3.1:8b`, `nomic-embed-text`), Chroma, GitHub Actions

**Code:** [github.com/ddmdros/rag-gta](https://github.com/ddmdros/rag-gta)

---

## 1. What it is

A RAG system that runs entirely on the local machine, with no paid API and no data leaving it. It answers in Portuguese over two corpora:

- **lore:** the Grand Theft Auto universe, from GTA Wiki articles, with the source of every answer;
- **glossary:** an EN → PT-BR game localization glossary, where the answer must come out *exactly* as in the source.

Running the same pipeline on both domains shows where each configuration helps and where it hurts.

## 2. How it works

```text
question
  -> (with history) the LLM rewrites the question to stand on its own
  -> Chroma retriever: similarity, MMR, or multi-query
  -> prompt with the chunks and a refusal rule with a fixed sentence
  -> llama3.1:8b, temperature 0
  -> answer + sources
```

- **Ingestion:** lore is split by article (each chunk keeps its source title and URL), then into 1,500-character chunks with 300 of overlap. The glossary becomes **one document per term**: a chunk that separates a term from its translation is useless.
- **Retrieval:** `similarity` (glossary default, k = 4), `mmr` (lore default, k = 8, relevant and diverse chunks), and `multiquery` (the LLM rephrases the question several ways and merges the results).
- **Measurable refusal:** with no answer in the chunks, the model says a fixed sentence, which the evaluation can count.

## 3. Evaluation

Each corpus has a question set: the glossary has 15 answerable questions and 4 that must be refused; the lore has 10 and 3. Metrics are kept separate, because each points to a different part:

| Metric | What it measures | If it is low, change |
|---|---|---|
| `retrieval_hit` | the expected term was in the retrieved chunks | chunking, *k*, retrieval mode, embeddings |
| `answer_hit` | the expected term is in the answer | prompt, model |
| `false_refusal` | the model refused a question that had an answer | refusal rule too strong |
| `refusal_ok` | the model refused an out-of-corpus question | hallucination |

The glossary's expected terms are checked against the CSV in a test: the evaluation tests the system, not the memory of whoever wrote the questions. The evaluation runs on GitHub Actions (the **Eval** workflow), with Ollama installed on the runner.

### Results (glossary)

`llama3.1:8b` + `nomic-embed-text`, CPU-only GitHub Actions runner, 11/05/2026:

| Mode | Retrieval | Answer | False refusal | Correct refusal | s/question |
|---|---|---|---|---|---|
| similarity | 15/15 | 15/15 | 0 | 3/4 | 16 |
| mmr | 14/15 | 14/15 | 0 | 3/4 | 16 |
| multiquery | 15/15 | 15/15 | 0 | 4/4 | 66 |

Only `multiquery` refuses every out-of-glossary question, at about four times the latency. `mmr` misses one term: in a glossary, where each document is one term, retrieving diverse chunks hurts. That is why the glossary defaults to `similarity`.

## 4. Evolution

The project started as six separate prototypes built in a pair: a CrewAI agent, a retrieval chain, an agent over the lore, LCEL with MMR, per-session memory, and multi-query with sources. In November 2026, I merged everything into one package with the three retrieval modes as options, tests that run without Ollama, and the evaluation set. I fixed what the earlier versions let slip:

- retrieval ran twice per question (once for the context, once for the sources);
- the CSV header and license were indexed as if they were terms;
- the history-aware rewrite prompt existed but was never used;
- the loaders came from `langchain-community`, which is deprecated.

## 5. Data and credits

- **Glossary:** *Video Games Localization Glossary – Portuguese (Brazil)*, under CC BY-NC 4.0.
- **Lore:** [GTA Wiki](https://gta.fandom.com) articles, under CC BY-SA, fetched from a fixed list so anyone can rebuild the same corpus. Grand Theft Auto is a trademark of Rockstar Games; this is a study project with no affiliation.
- Built by Diogo Medeiros and Stephanie Pinho ([GitHub](https://github.com/stephanielumertz), [LinkedIn](https://www.linkedin.com/in/stephanielumertz/)).
