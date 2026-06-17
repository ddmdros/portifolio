# NetPlay: Documentação do Marketplace de Jogos Colaborativo

**Autores:** Diogo de Souza Medeiros, Stephanie Pinho

**Última modificação:** 08/06/2026

**Principais tecnologias utilizadas:** React, TypeScript, FastAPI, Supabase, LangChain

---

## 1. Introdução

### Visão Geral

**NetPlay** é uma plataforma de economia colaborativa P2P (Peer-to-Peer) projetada para conectar usuários dentro de uma mesma cidade para empréstimo, troca e compra de jogos em mídia física. Utilizando Geração Aumentada de Recuperação (RAG) e inteligência espacial, a plataforma permite que os usuários encontrem títulos raros ou caros com base em suas preferências específicas e proximidade.

### Justificativa Arquitetural

O projeto serve como um estudo de caso técnico na integração de **agentes baseados em LLM** com **bancos de dados relacionais e espaciais**. A arquitetura foi projetada para resolver o "problema de alucinação" de LLMs tradicionais, fundamentando o conhecimento do chatbot em dados de inventário em tempo real e metadados de jogos externos, garantindo que as recomendações sejam sempre precisas, disponíveis localmente e relevantes para o perfil do usuário.

### Fluxo de Funcionamento e Usabilidade

O usuário interage com um agente de IA que compreende o contexto, a localização e o histórico do usuário. O fluxo idealizado inclui:

* **Descoberta Baseada em Localização:** Uso do PostGIS para calcular a proximidade e encontrar jogos dentro de um raio específico (por exemplo, 10 km).
* **Gerenciamento de Perfil e Reputação:** Usuários podem consultar suas próprias estatísticas, contribuindo para uma economia circular segura e ativa.
* **Recomendações Ricas em Metadados:** O agente fornece dados técnicos verificados (datas de lançamento, plataformas, classificação indicativa) integrados com a API do RAWG.

---

## 2. Arquitetura de Dados e Integração de IA

O ecossistema é estruturado em três camadas principais de dados, garantindo inteligência semântica e precisão espacial.

### Fluxo do Ecossistema

1. **Camada de Identidade e Conhecimento:** Gerenciada via **Supabase (PostgreSQL)**. A tabela `users` guarda reputação e dados espaciais (PostGIS), enquanto a `game_catalog` serve como a biblioteca universal para compreensão semântica.
2. **Camada de Marketplace:** As tabelas `user_inventory` e `user_wishlist` mapeiam a oferta e a demanda, conectando usuários a cópias físicas específicas de jogos.
3. **Camada de Inteligência e Transação:** A tabela `chat_memory` mantém o contexto usando estratégias de sumarização do LangChain, enquanto a `transactions` atua como o registro definitivo dos acordos entre locadores e locatários.

### RAG e Fluxo de Agentes

O pipeline de RAG resolve as limitações críticas de LLMs comuns:

* **Busca Vetorial:** O `pgvector` permite buscas de similaridade semântica entre os jogos.
* **Chamada de Ferramentas (Tool Calling):** O agente utiliza ferramentas customizadas (`search_local_games`, `get_account_info`) para buscar dados em tempo real em vez de depender de conjuntos de dados de treinamento desatualizados.

```python
# Implementação conceitual de Tool Calling
def search_local_games(query: str, user_lat: float, user_lon: float):
    # Consulta PostGIS para encontrar jogos dentro de um raio de 10km
    return db.query("SELECT * FROM inventory WHERE ST_DWithin(...)")
```

---

## 3. Especificações Técnicas

Para garantir alto desempenho e escalabilidade, a stack integra infraestrutura moderna com ferramentas prontas para produção.

| Camada / Componente | Tecnologia | Justificativa Técnica |
| --- | --- | --- |
| **Backend** | Python / FastAPI | Framework assíncrono de alto desempenho para operações intensivas de IA. |
| **Orquestração de IA** | LangChain | Gerencia a lógica do agente, memória de conversa e integração de ferramentas. |
| **Banco de Dados** | Supabase (PostgreSQL) | Infraestrutura relacional de nível corporativo com PostGIS para consultas espaciais. |
| **Banco Vetorial** | pgvector | Permite busca semântica e injeção de contexto no pipeline RAG. |
| **Frontend** | React / Vite | Framework SPA para uma experiência de chat dinâmica e reativa. |
| **API Externa** | API RAWG | Fornece metadados verificados, evitando alucinações sobre datas de lançamento e plataformas. |

---

## 4. Qualidade de Código e Lógica do Agente

A lógica de agentes foi desenhada para fluxos complexos, utilizando:

* **Estratégias de Sumarização:** Para lidar com grandes janelas de contexto, o agente adota uma estratégia mista: mantém intactas as últimas 4-5 mensagens para um fluxo natural enquanto comprime o histórico anterior.
* **Humano no Circuito (Human-in-the-Loop):** Usuários podem acionar atualizações de perfil ou expansões de busca diretamente pelo chat, tornando o sistema altamente interativo.

---

## 5. Estrutura do Projeto

```text
netplay/
 ┣ src/
 ┃ ┣ components/        # Interface do chat, cards com resultados dos jogos
 ┃ ┣ hooks/             # Ferramentas do agente e gerenciamento de estado
 ┃ ┣ services/          # Integração com APIs (FastAPI/Supabase/RAWG)
 ┃ ┗ types/             # Contratos TypeScript para entidades de jogo e usuário
 ┣ backend/
 ┃ ┣ agents/            # Lógica do LangChain/LangGraph
 ┃ ┣ database/          # Esquemas SQL (extensões PostGIS/Vector)
 ┃ ┗ routes/            # Endpoints do FastAPI
 ┗ vite.config.ts       # Configurações de compilação e otimização
```

---

## 6. Próximos Passos e Melhorias Futuras

* **Integração com LangGraph:** Migração para lógica de agentes baseada em grafos para fluxos de transação de múltiplas etapas mais complexos.
* **Mapeamento Visual:** Integração da **Google Maps API** para exibir os resultados da busca como pins interativos no mapa.
* **Gamificação:** Implementação de um sistema de troféus e reputação para incentivar ainda mais a atividade colaborativa circular.
* **Automated Cataloging:** Aprimoramento do backend para importar e vetorizar automaticamente novos itens via API do RAWG conforme os usuários registram suas coleções.

---

### Contatos & Links do Projeto

* **Diogo Medeiros:** ddmdros@proton.me | [GitHub](https://github.com/ddmdros) | [LinkedIn](https://www.linkedin.com/in/diogo-medeiros/) | [Portfólio](https://portifolio-tawny-xi-55.vercel.app/)
* **Stephanie Pinho:** [GitHub](https://github.com/stephanielumertz) | [LinkedIn](https://www.linkedin.com/in/stephanielumertz/)
* **E-mail da Dupla:** steandydevs@gmail.com
* **Links do Projeto:**
  * **Deploy de Demonstração:** [Vercel](https://llm-project-tau.vercel.app/)
  * **Código Fonte:** [GitHub](https://github.com/steadydevs/llm_project)
