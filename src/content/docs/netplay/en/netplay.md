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

### App Interfaces & Screenshots

Here is a visual showcase of the mobile application interfaces:

<div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
  <div class="text-center bg-white/5 p-2 rounded-xl border border-white/10">
    <img src="/assets/projects/netplay/netplay_chat_en.png" alt="AI Chat Agent" class="rounded-lg max-h-[350px] mx-auto object-contain" />
    <p class="text-xs text-gray-400 mt-2 font-mono">AI Chat Agent</p>
  </div>
  <div class="text-center bg-white/5 p-2 rounded-xl border border-white/10">
    <img src="/assets/projects/netplay/netplay_profile_en.png" alt="User Profile" class="rounded-lg max-h-[350px] mx-auto object-contain" />
    <p class="text-xs text-gray-400 mt-2 font-mono">Profile & Stats</p>
  </div>
  <div class="text-center bg-white/5 p-2 rounded-xl border border-white/10">
    <img src="/assets/projects/netplay/netplay_transactions_en.png" alt="Transactions Ledger" class="rounded-lg max-h-[350px] mx-auto object-contain" />
    <p class="text-xs text-gray-400 mt-2 font-mono">Deals & Handshakes</p>
  </div>
  <div class="text-center bg-white/5 p-2 rounded-xl border border-white/10">
    <img src="/assets/projects/netplay/netplay_settings_en.png" alt="Account Settings" class="rounded-lg max-h-[350px] mx-auto object-contain" />
    <p class="text-xs text-gray-400 mt-2 font-mono">Settings & Language</p>
  </div>
</div>

---

## 2. Data Architecture and AI Integration

The ecosystem is structured into three main layers of data, ensuring both semantic intelligence and spatial precision.

### The Ecosystem Flow

1. **Identity & Knowledge Layer:** Managed via **Supabase (PostgreSQL)**. `users` holds reputation and spatial data (PostGIS), while `game_catalog` acts as the universal library for semantic understanding.
2. **Marketplace Layer:** `user_inventory` and `user_wishlist` map the supply and demand, linking users to specific physical media copies.
3. **Intelligence & Transaction Layer:** `chat_memory` maintains basic conversation context (with summarization planned for future releases), while `transactions` acts as the definitive ledger for "handshakes" between lenders and borrowers.

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

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-accent/30 hover:shadow-[0_0_15px_rgba(52,211,153,0.05)] transition-all duration-300">
    <div class="flex items-center justify-between gap-2 mb-3">
      <span class="text-xs font-bold text-accent uppercase tracking-wider">Backend</span>
      <span class="bg-white/10 text-white text-xs px-2.5 py-0.5 rounded-full font-mono shrink-0">Python / FastAPI</span>
    </div>
    <p class="text-sm text-gray-300 leading-relaxed">High-performance asynchronous framework for AI-intensive operations.</p>
  </div>
  
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-accent/30 hover:shadow-[0_0_15px_rgba(52,211,153,0.05)] transition-all duration-300">
    <div class="flex items-center justify-between gap-2 mb-3">
      <span class="text-xs font-bold text-accent uppercase tracking-wider">AI Orchestration</span>
      <span class="bg-white/10 text-white text-xs px-2.5 py-0.5 rounded-full font-mono shrink-0">LangChain</span>
    </div>
    <p class="text-sm text-gray-300 leading-relaxed">Manages agentic logic, conversation memory, and tool integration.</p>
  </div>

  <div class="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-accent/30 hover:shadow-[0_0_15px_rgba(52,211,153,0.05)] transition-all duration-300">
    <div class="flex items-center justify-between gap-2 mb-3">
      <span class="text-xs font-bold text-accent uppercase tracking-wider">Database</span>
      <span class="bg-white/10 text-white text-xs px-2.5 py-0.5 rounded-full font-mono shrink-0">Supabase</span>
    </div>
    <p class="text-sm text-gray-300 leading-relaxed">Enterprise-grade relational database with PostGIS for spatial queries.</p>
  </div>

  <div class="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-accent/30 hover:shadow-[0_0_15px_rgba(52,211,153,0.05)] transition-all duration-300">
    <div class="flex items-center justify-between gap-2 mb-3">
      <span class="text-xs font-bold text-accent uppercase tracking-wider">Vector Store</span>
      <span class="bg-white/10 text-white text-xs px-2.5 py-0.5 rounded-full font-mono shrink-0">pgvector</span>
    </div>
    <p class="text-sm text-gray-300 leading-relaxed">Enables semantic similarity search and context injection for RAG pipeline.</p>
  </div>

  <div class="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-accent/30 hover:shadow-[0_0_15px_rgba(52,211,153,0.05)] transition-all duration-300">
    <div class="flex items-center justify-between gap-2 mb-3">
      <span class="text-xs font-bold text-accent uppercase tracking-wider">Frontend</span>
      <span class="bg-white/10 text-white text-xs px-2.5 py-0.5 rounded-full font-mono shrink-0">React / Vite</span>
    </div>
    <p class="text-sm text-gray-300 leading-relaxed">SPA framework for a reactive, dynamic chatbot interface.</p>
  </div>

  <div class="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-accent/30 hover:shadow-[0_0_15px_rgba(52,211,153,0.05)] transition-all duration-300">
    <div class="flex items-center justify-between gap-2 mb-3">
      <span class="text-xs font-bold text-accent uppercase tracking-wider">External API</span>
      <span class="bg-white/10 text-white text-xs px-2.5 py-0.5 rounded-full font-mono shrink-0">RAWG API</span>
    </div>
    <p class="text-sm text-gray-300 leading-relaxed">Provides verified game metadata, preventing model hallucinations.</p>
  </div>
</div>

---

## 4. Code Quality & Agent Logic

The agentic logic is designed for focused query resolution, utilizing:

* **LangChain Tool Calling:** The agent dynamically binds user intents to specific tools to retrieve live database records.
* **Structured Memory:** Standard session storage holds the active conversation window.

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
* **Summarization Strategies:** Implementing dynamic summarization to handle long conversation windows, keeping the last 4-5 messages intact while compressing older history.
* **Human-in-the-Loop:** Integrating user approval flows (like confirmation prompts) for critical actions like profile updates or transaction executions.
* **Visual Mapping:** Integrating the **Google Maps API** to display search results as interactive pins on a map.
* **Gamification:** Implementing a trophy and reputation system to further incentivize circular activity.
* **Automated Cataloging:** Enhancing the backend to automatically ingest and vectorize new items via the RAWG API as users register their collections.

---

### Contacts & Project Links

* **Project Link:** https://llm-project-tau.vercel.app/
* **Diogo Medeiros:** ddmdros@proton.me | [GitHub](https://github.com/ddmdros) | [LinkedIn](https://www.linkedin.com/in/diogo-medeiros/) | [Portfolio](https://portifolio-tawny-xi-55.vercel.app/)
* **Stephanie Pinho:** [GitHub](https://github.com/stephanielumertz) | [LinkedIn](https://www.linkedin.com/in/stephanielumertz/)
* **Project Team Email:** steandydevs@gmail.com
* **Project Links:**
  * **Demo Deploy:** [Vercel](https://llm-project-tau.vercel.app/)
  * **Source Code:** [GitHub](https://github.com/steadydevs/llm_project)
