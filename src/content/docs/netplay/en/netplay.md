# NetPlay: Collaborative Gaming Marketplace Documentation

**Authors:** Diogo de Souza Medeiros, Stephanie Pinho

**Last modified:** 06/08/2026

**Main technologies used:** React, TypeScript, FastAPI, Supabase, LangChain

---

## 1. Introduction

### Overview

**NetPlay** is a P2P (Peer-to-Peer) collaborative economy platform designed to connect users within the same city for the lending, trading, and purchasing of physical media games. By leveraging Retrieval-Augmented Generation (RAG) and spatial intelligence, the platform allows users to find rare or expensive titles based on their specific taste and proximity.

### Architectural Rationale

The project serves as a technical case study in integrating **LLM-based agents** with **relational and spatial databases**. The architecture was designed to solve the "hallucination problem" of traditional LLMs by grounding the chatbot's knowledge in real-time inventory data and external gaming metadata, ensuring that recommendations are always accurate, locally available, and relevant to the user's profile.

### Dynamics and Usability Flow

The user interacts with an AI agent that understands context, location, and user history. The idealized flow includes:

* **Location-Based Discovery:** Using PostGIS to calculate proximity and find games within a specific radius (e.g., 10km).
* **Profile & Reputation Management:** Users can query their own stats, contributing to a secure and active circular economy.
* **Metadata-Rich Recommendations:** The agent provides verified technical data (release dates, platforms, age rating) integrated with the RAWG API.

---

## 2. Data Architecture and AI Integration

The ecosystem is structured into three main layers of data, ensuring both semantic intelligence and spatial precision.

### The Ecosystem Flow

1. **Identity & Knowledge Layer:** Managed via **Supabase (PostgreSQL)**. `users` holds reputation and spatial data (PostGIS), while `game_catalog` acts as the universal library for semantic understanding.
2. **Marketplace Layer:** `user_inventory` and `user_wishlist` map the supply and demand, linking users to specific physical media copies.
3. **Intelligence & Transaction Layer:** `chat_memory` maintains context using LangChain summarization strategies, while `transactions` acts as the definitive ledger for "handshakes" between lenders and borrowers.

### RAG and Agentic Workflow

The RAG pipeline solves the critical limitations of standard LLMs:

* **Vector Search:** `pgvector` allows for semantic similarity searches between games.
* **Tool Calling:** The agent utilizes custom tools (`search_local_games`, `get_account_info`) to fetch real-time data instead of relying on outdated training sets.

```python
# Conceptual Tool Calling implementation
def search_local_games(query: str, user_lat: float, user_lon: float):
    # PostGIS query to find games within a 10km radius
    return db.query("SELECT * FROM inventory WHERE ST_DWithin(...)")
```

---

## 3. Technical Specifications

To ensure high performance and scalability, the stack integrates modern infrastructure with production-ready tooling.

| Layer / Component | Technology | Technical Rationale |
| --- | --- | --- |
| **Backend** | Python / FastAPI | High-performance asynchronous framework for AI-intensive operations. |
| **AI Orchestration** | LangChain | Manages agentic logic, conversation memory, and tool integration. |
| **Database** | Supabase (PostGres) | Enterprise-grade relational infrastructure with PostGIS for spatial queries. |
| **Vector Store** | pgvector | Enables semantic search and context injection for the RAG pipeline. |
| **Frontend** | React / Vite | SPA framework for a reactive, dynamic chat experience. |
| **External API** | RAWG API | Provides verified metadata, preventing hallucinations regarding release dates and platforms. |

---

## 4. Code Quality & Agent Logic

The agentic logic is designed for complex flows, using:

* **Summarization Strategies:** To handle long context windows, the agent implements a mixed strategy: keeping the last 4-5 messages intact for natural flow while compressing older context.
* **Human-in-the-Loop:** Users can trigger profile updates or search expansions directly via chat, making the system highly interactive.

---

## 5. Project Structure

```text
netplay/
 ┣ src/
 ┃ ┣ components/        # Chat interface, cards for game results
 ┃ ┣ hooks/             # Agent tools and state management
 ┃ ┣ services/          # API integration (FastAPI/Supabase/RAWG)
 ┃ ┗ types/             # TypeScript contracts for game and user entities
 ┣ backend/
 ┃ ┣ agents/            # LangChain/LangGraph logic
 ┃ ┣ database/          # SQL schemas (PostGIS/Vector extensions)
 ┃ ┗ routes/            # FastAPI endpoints
 ┗ vite.config.ts       # Build and optimization settings
```

---

## 6. Next Steps and Future Improvements

* **LangGraph Integration:** Moving toward graph-based agent logic for more complex, multi-step transaction flows.
* **Visual Mapping:** Integrating the **Google Maps API** to display search results as interactive pins on a map.
* **Gamification:** Implementing a trophy and reputation system to further incentivize circular activity.
* **Automated Cataloging:** Enhancing the backend to automatically ingest and vectorize new items via the RAWG API as users register their collections.

---

### Contacts & Project Links

* **Diogo Medeiros:** ddmdros@proton.me | [GitHub](https://github.com/ddmdros) | [LinkedIn](https://www.linkedin.com/in/diogo-medeiros/) | [Portfolio](https://portifolio-tawny-xi-55.vercel.app/)
* **Stephanie Pinho:** [GitHub](https://github.com/stephanielumertz) | [LinkedIn](https://www.linkedin.com/in/stephanielumertz/)
* **Project Team Email:** steandydevs@gmail.com
* **Project Links:**
  * **Demo Deploy:** [Vercel](https://llm-project-tau.vercel.app/)
  * **Source Code:** [GitHub](https://github.com/steadydevs/llm_project)
