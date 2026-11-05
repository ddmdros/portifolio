# rag-gta: RAG local com avaliação

**Autores:** Diogo Medeiros, Stephanie Pinho

**Última modificação:** 05/11/2026

**Principais tecnologias:** Python, LangChain, Ollama (`llama3.1:8b`, `nomic-embed-text`), Chroma, GitHub Actions

**Código:** [github.com/ddmdros/rag-gta](https://github.com/ddmdros/rag-gta)

---

## 1. O que é

Um RAG que roda inteiro na máquina, sem API paga e sem mandar dados para fora. Responde em português sobre dois corpora:

- **lore:** o universo Grand Theft Auto, a partir de artigos do GTA Wiki, com a fonte de cada resposta;
- **glossário:** um glossário de localização de games EN → PT-BR que escrevi em coautoria, em que a resposta precisa sair *exatamente* como está na fonte.

O mesmo pipeline nos dois domínios mostra onde cada configuração ajuda e onde atrapalha.

## 2. Como funciona

```text
pergunta
  -> (com histórico) o LLM reescreve a pergunta para ficar independente
  -> retriever no Chroma: similarity, MMR ou multi-query
  -> prompt com os trechos e uma regra de recusa com frase fixa
  -> llama3.1:8b, temperatura 0
  -> resposta + fontes
```

- **Ingestão:** a lore é dividida por artigo (cada trecho guarda o título e a URL de origem) e depois em trechos de 1.500 caracteres com 300 de sobreposição. O glossário vira **um documento por termo**: um trecho que separa o termo da tradução não serve para nada.
- **Recuperação:** `similarity` (padrão do glossário, k = 4), `mmr` (padrão da lore, k = 8, trechos relevantes e diferentes entre si) e `multiquery` (o LLM reescreve a pergunta de vários jeitos e junta os resultados).
- **Recusa mensurável:** sem resposta nos trechos, o modelo diz uma frase fixa, e a avaliação consegue contar.

## 3. Avaliação

Cada corpus tem um conjunto de perguntas: o glossário tem 15 com resposta e 4 que devem ser recusadas; a lore tem 10 e 3. As métricas ficam separadas, porque cada uma aponta para uma peça diferente:

| Métrica | O que mede | Se estiver baixa, mexa em |
|---|---|---|
| `retrieval_hit` | o termo esperado estava nos trechos recuperados | divisão em trechos, *k*, modo de busca, embeddings |
| `answer_hit` | o termo esperado está na resposta | prompt, modelo |
| `false_refusal` | o modelo recusou uma pergunta que tinha resposta | regra de recusa muito forte |
| `refusal_ok` | o modelo recusou a pergunta fora do corpus | alucinação |

Os termos esperados do glossário são conferidos contra o CSV num teste: a avaliação testa o sistema, não a memória de quem escreveu as perguntas. A avaliação roda no GitHub Actions (workflow **Eval**), com o Ollama instalado no runner.

### Resultados (glossário)

`llama3.1:8b` + `nomic-embed-text`, runner do GitHub Actions só com CPU, 05/11/2026:

| Modo | Recuperação | Resposta | Recusa indevida | Recusa correta | s/pergunta |
|---|---|---|---|---|---|
| similarity | 15/15 | 15/15 | 0 | 3/4 | 16 |
| mmr | 14/15 | 14/15 | 0 | 3/4 | 16 |
| multiquery | 15/15 | 15/15 | 0 | 4/4 | 66 |

O `multiquery` é o único que recusa todas as perguntas fora do glossário, mas custa cerca de 4 vezes mais tempo. O `mmr` perde um termo: num glossário, em que cada documento é um termo, buscar trechos diferentes entre si atrapalha. Por isso o padrão do glossário é `similarity`.

### Resultados (lore)

Mesmos modelos e runner, 05/11/2026 ([rodada](https://github.com/ddmdros/rag-gta/actions/runs/42053328578)), corpus de 17 artigos do GTA Wiki (364 trechos):

| Modo | Recuperação | Resposta | Recusa indevida | Recusa correta | s/pergunta |
|---|---|---|---|---|---|
| similarity | 10/10 | 9/10 | 0 | 3/3 | 149 |
| mmr | 10/10 | 9/10 | 0 | 3/3 | 124 |
| multiquery | 10/10 | 10/10 | 0 | 0/3 | 203 |

A busca achou o trecho certo em todas as perguntas, mesmo com artigos em inglês e perguntas em português: toda falha está na geração. O `similarity` erra o irmão de CJ e o `mmr` erra o protagonista de Vice City, com o trecho certo no contexto. O `multiquery` acerta as dez respostas, mas não recusa nenhuma das três perguntas fora do corpus, o contrário do que fez no glossário. Como responder errado ao que está fora do escopo é pior do que responder devagar, o padrão da lore continua `mmr`.

## 4. Evolução

O projeto começou em dupla como seis protótipos separados: um agente CrewAI, uma cadeia de recuperação, um agente sobre a lore, LCEL com MMR, memória por sessão e multi-query com fontes. Em novembro de 2026, juntei tudo num pacote com os três modos de busca como opção, testes sem Ollama e o conjunto de avaliação. Corrigi o que as versões anteriores deixavam escapar:

- a recuperação rodava duas vezes por pergunta (uma para o contexto, outra para as fontes);
- o cabeçalho e a licença do CSV entravam no índice como se fossem termos;
- o prompt de reescrita com histórico existia, mas não era usado;
- os loaders vinham do `langchain-community`, que foi descontinuado.

## 5. Dados e créditos

- **Glossário:** *Video Games Localization Glossary – Portuguese (Brazil)*, de Diogo Medeiros e Bruna Beatriz Gabriel, publicado no projeto colaborativo [Multilingual Gameloc Glossaries](https://locdandloaded.net/2022/06/14/multilingual-gameloc-glossaries/), de Lucile Danilov, sob CC BY-NC 4.0.
- **Lore:** artigos do [GTA Wiki](https://gta.fandom.com), sob CC BY-SA, baixados por uma lista fixa de artigos para que qualquer pessoa remonte o mesmo corpus. Grand Theft Auto é marca da Rockstar Games; este é um projeto de estudo, sem relação com a empresa.
- Feito em dupla por Diogo Medeiros e Stephanie Pinho ([GitHub](https://github.com/stephanielumertz), [LinkedIn](https://www.linkedin.com/in/stephanielumertz/)).
