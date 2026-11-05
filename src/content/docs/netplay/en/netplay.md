# NetPlay: a games assistant with tool calling

**Authors:** Diogo Medeiros, Stephanie Pinho

**Last modified:** Nov 5, 2026

**Main technologies:** Python, FastAPI, LangChain (`create_agent`), OpenAI `gpt-4o-mini`, RAWG API, React + TypeScript

**Code:** [github.com/ddmdros/Netplay](https://github.com/ddmdros/Netplay)

---

## 1. What it is

A games assistant in which a LangChain agent decides on its own when to fetch real game data from the [RAWG API](https://rawg.io/apidocs): release date, studio, genre, age rating and stores. The agent sits behind a FastAPI service, and the conversation happens in a React chat.

<div class="my-8 text-center">
  <img src="/assets/projects/netplay/netplay_assistant.png" alt="NetPlay chat" class="rounded-lg max-h-[450px] mx-auto object-contain border border-white/10" />
  <p class="text-xs text-gray-400 mt-2 font-mono">The React chat, as it is in the repository</p>
</div>

The product idea behind it is a P2P marketplace for physical game media. That part does not exist in code yet and is listed under "Next steps", at the end of the page.

## 2. How it works

```text
chat (React) -> POST /api/chat (FastAPI) -> agent (LangChain, gpt-4o-mini)
                                              |  calls the tool when it needs data
                                              v
                                   buscar_informacoes_de_jogos -> RAWG API
                                              |
                                              v
                                   answer built from what RAWG returned
```

- **Tool calling:** the model receives the tool's description and chooses when to call it. The prompt forbids making up game data, and the answer comes from what RAWG returned.
- **Structured context:** the RAWG client fetches the games and each one's details and gives the model a text with the name, genre, studio, recommended audience, stores and an excerpt of the description.
- **History:** the front end sends the latest messages, and the API uses the 10 most recent.
- **Tests with no network and no keys:** RAWG is mocked, a fake model that calls tools goes through the real agent, from the tool call to the final answer, and the API is tested with FastAPI's `TestClient`. CI runs the tests, the lint and the front-end build on every push.

## 3. The November 2026 revision

The first version (May 2026) used `create_tool_calling_agent` and `AgentExecutor`, which were removed from LangChain in version 1.x, and the backend did not start. The revision:

- migrated the agent to `create_agent`;
- fixed the imports: the route called a function that did not exist, and the agent imported the tool from the wrong file;
- removed the marketplace tools, which depended on a database whose schema was never in the repository;
- restricted CORS and added the conversation history, the tests and CI.

## 4. Next steps

The P2P marketplace, as designed:

- **Database:** Postgres with PostGIS for users, inventory, wishlists and transactions, with the schema and migrations in the repository.
- **Location tools for the agent:** find copies for trade or rent within a radius of the user, and read the user's account. The tools are bound to the logged-in user on the server and do not take an id as an argument, so the model cannot query another person.
- **Login,** so the API knows who the user is.
- **Semantic search** over the game catalog with pgvector.
- **Human approval** before any action that changes data, such as a trade request or a profile update.
- **Long conversations:** summarize older messages and keep the last few intact.
- **A map** of the search results and a reputation system.

Screens planned for the app (not in the repository yet):

<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
  <div class="text-center bg-white/5 p-2 rounded-xl border border-white/10">
    <img src="/assets/projects/netplay/netplay_profile_en.png" alt="Profile and reputation" class="rounded-lg max-h-[350px] mx-auto object-contain" />
    <p class="text-xs text-gray-400 mt-2 font-mono">Profile and reputation</p>
  </div>
  <div class="text-center bg-white/5 p-2 rounded-xl border border-white/10">
    <img src="/assets/projects/netplay/netplay_transactions_en.png" alt="Trades and transactions" class="rounded-lg max-h-[350px] mx-auto object-contain" />
    <p class="text-xs text-gray-400 mt-2 font-mono">Trades and transactions</p>
  </div>
  <div class="text-center bg-white/5 p-2 rounded-xl border border-white/10">
    <img src="/assets/projects/netplay/netplay_settings_en.png" alt="Settings" class="rounded-lg max-h-[350px] mx-auto object-contain" />
    <p class="text-xs text-gray-400 mt-2 font-mono">Settings</p>
  </div>
</div>

---

### Contacts & Project Links

* **Diogo Medeiros:** ddmdros@proton.me | [GitHub](https://github.com/ddmdros) | [LinkedIn](https://www.linkedin.com/in/diogo-medeiros/) | [Portfolio](https://portifolio-tawny-xi-55.vercel.app/)
* **Stephanie Pinho:** [GitHub](https://github.com/stephanielumertz) | [LinkedIn](https://www.linkedin.com/in/stephanielumertz/)
* **Project Team Email:** steandydevs@gmail.com
* **Project Links:**
  * **Source Code:** [GitHub](https://github.com/ddmdros/Netplay)
