# NetPlay: assistente de games com tool calling

**Autores:** Diogo Medeiros, Stephanie Pinho

**Última modificação:** 05/11/2026

**Principais tecnologias:** Python, FastAPI, LangChain (`create_agent`), OpenAI `gpt-4o-mini`, API RAWG, React + TypeScript

**Código:** [github.com/ddmdros/Netplay](https://github.com/ddmdros/Netplay)

---

## 1. O que é

Um assistente de games em que um agente LangChain decide sozinho quando buscar dados reais de jogos na [API RAWG](https://rawg.io/apidocs): lançamento, estúdio, gênero, classificação etária e lojas. O agente fica atrás de uma API FastAPI, e a conversa acontece num chat em React.

<div class="my-8 text-center">
  <img src="/assets/projects/netplay/netplay_assistant.png" alt="Chat do NetPlay" class="rounded-lg max-h-[450px] mx-auto object-contain border border-white/10" />
  <p class="text-xs text-gray-400 mt-2 font-mono">O chat em React, como está no repositório</p>
</div>

A ideia de produto por trás é um marketplace P2P de jogos em mídia física. Essa parte ainda não existe em código e está em «Próximos passos», no fim da página.

## 2. Como funciona

```text
chat (React) -> POST /api/chat (FastAPI) -> agente (LangChain, gpt-4o-mini)
                                              |  chama a ferramenta quando precisa de dados
                                              v
                                   buscar_informacoes_de_jogos -> API RAWG
                                              |
                                              v
                                   resposta com os dados que a RAWG devolveu
```

- **Tool calling:** o modelo recebe a descrição da ferramenta e escolhe quando chamá-la. O prompt proíbe inventar dados de jogo, e a resposta sai do que a RAWG devolveu.
- **Contexto estruturado:** o cliente da RAWG busca os jogos e os detalhes de cada um e entrega ao modelo um texto com nome, gênero, estúdio, público recomendado, lojas e um trecho da descrição.
- **Histórico:** o front manda as últimas mensagens, e a API usa as 10 mais recentes.
- **Testes sem rede e sem chave:** a RAWG é simulada, um modelo falso que chama ferramentas passa pelo agente de verdade, da chamada da ferramenta até a resposta final, e a API é testada com o `TestClient` do FastAPI. O CI roda os testes, o lint e o build do front a cada push.

## 3. A revisão de novembro de 2026

A primeira versão (maio de 2026) usava `create_tool_calling_agent` e `AgentExecutor`, que saíram do LangChain na versão 1.x, e o backend não iniciava. A revisão:

- migrou o agente para `create_agent`;
- corrigiu os imports: a rota chamava uma função inexistente, e o agente importava a ferramenta do arquivo errado;
- tirou as ferramentas do marketplace, que dependiam de um banco cujo esquema nunca esteve no repositório;
- restringiu o CORS e acrescentou o histórico da conversa, os testes e o CI.

## 4. Próximos passos

O marketplace P2P, como foi desenhado:

- **Banco de dados:** Postgres com PostGIS para usuários, inventário, lista de desejos e transações, com o esquema e as migrações no repositório.
- **Ferramentas de localização para o agente:** achar cópias para troca ou aluguel num raio em volta do usuário e consultar a conta dele. As ferramentas ficam presas ao usuário logado no servidor e não recebem o id como argumento, para o modelo não conseguir consultar outra pessoa.
- **Login**, para a API saber quem é o usuário.
- **Busca semântica** no catálogo de jogos com pgvector.
- **Aprovação humana** antes de qualquer ação que muda dados, como um pedido de troca ou uma mudança de perfil.
- **Conversas longas:** resumir as mensagens antigas e manter as últimas intactas.
- **Mapa** com os resultados da busca e um sistema de reputação.

Telas planejadas para o app (ainda não estão no repositório):

<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
  <div class="text-center bg-white/5 p-2 rounded-xl border border-white/10">
    <img src="/assets/projects/netplay/netplay_profile.png" alt="Perfil e reputação" class="rounded-lg max-h-[350px] mx-auto object-contain" />
    <p class="text-xs text-gray-400 mt-2 font-mono">Perfil e reputação</p>
  </div>
  <div class="text-center bg-white/5 p-2 rounded-xl border border-white/10">
    <img src="/assets/projects/netplay/netplay_transactions.png" alt="Negociações e transações" class="rounded-lg max-h-[350px] mx-auto object-contain" />
    <p class="text-xs text-gray-400 mt-2 font-mono">Negociações e transações</p>
  </div>
  <div class="text-center bg-white/5 p-2 rounded-xl border border-white/10">
    <img src="/assets/projects/netplay/netplay_wishlist.png" alt="Lista de desejos" class="rounded-lg max-h-[350px] mx-auto object-contain" />
    <p class="text-xs text-gray-400 mt-2 font-mono">Lista de desejos</p>
  </div>
</div>

---

### Contatos & Links do Projeto

* **Diogo Medeiros:** ddmdros@proton.me | [GitHub](https://github.com/ddmdros) | [LinkedIn](https://www.linkedin.com/in/diogo-medeiros/) | [Portfólio](https://portifolio-tawny-xi-55.vercel.app/)
* **Stephanie Pinho:** [GitHub](https://github.com/stephanielumertz) | [LinkedIn](https://www.linkedin.com/in/stephanielumertz/)
* **E-mail da Dupla:** steandydevs@gmail.com
* **Links do Projeto:**
  * **Código Fonte:** [GitHub](https://github.com/ddmdros/Netplay)
