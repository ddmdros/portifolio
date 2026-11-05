# agent-harness: estudo de caso

**Autor:** Diogo Medeiros

**Última modificação:** 05/11/2026

**Principais tecnologias:** Python (só a biblioteca padrão), Claude Code, Google Antigravity (Gemini), GitHub Actions

**Código:** [github.com/ddmdros/agent-harness](https://github.com/ddmdros/agent-harness)

---

## 1. Contexto

Sou tradutor de jogos há seis anos. Em 2026, comecei a usar agentes de código (Claude Code e Antigravity) para traduzir e revisar jogos para clientes reais. O ganho veio rápido, mas também o risco: um agente com acesso ao terminal escreve em qualquer lugar. Num projeto de localização convivem a entrega do cliente, o material de referência (glossário, memória de tradução), os registros e os rascunhos, e cada um precisa de uma regra diferente.

Este repositório é o **núcleo genérico** do harness que uso em produção, só em projetos cujo contrato permite a ferramenta. Ele não tem nenhum dado de trabalho real: a demo é um RPG inventado.

## 2. O problema

- **Prompt não é trava.** «Nunca edite o glossário» no prompt é uma sugestão; o modelo pode esquecer, entender errado ou achar outro caminho (um `sed -i`, um script Python).
- **Duas ferramentas, dois protocolos.** Claude Code e Antigravity têm formatos de hook diferentes para as mesmas regras.
- **Loop sem ninguém olhando.** Um pedido de confirmação trava um agente que roda sozinho.
- **Decisões invisíveis.** O agente escolhe um nome de arquivo, um formato, o que deixar de fora, e ninguém revisa.
- **Custo real.** O número de tokens que um subagente informa no fim não é o que ele gastou.

## 3. O que construí

| Peça | O que faz |
|---|---|
| Mapa de zonas de escrita (`.agents/tree.toml`) | Cada caminho cai numa zona: `free`, `deliver`, `append`, `ask`, `script` ou `blocked`. Vale a última zona que casa; o que está fora do mapa é bloqueado. |
| Um hook para as duas ferramentas (`pre_tool_use.py`) | Normaliza o evento do Claude Code e do Antigravity, roda as travas e responde no protocolo de cada uma. |
| Trava da árvore | Aplica o mapa às ferramentas de arquivo e, no melhor esforço, ao terminal: redirecionamentos, `rm`, `mv`, `sed -i`, PowerShell e Python em `-c` ou heredoc. |
| Trava do git | Nada de `--no-verify` nem `git add -f`; push só para repositório com visibilidade permitida. |
| Modo sem supervisão | Com `HARNESS_UNATTENDED=1`, todo «pedir confirmação» vira «negar» com instruções, e o loop segue. |
| Fila de decisões (`pending.py`) | O agente anota cada decisão que tomou por inferência; eu aprovo ou recuso depois, pelo id. |
| Rodadas e junção (`runs.py`, `merge_reviews.py`) | Cada worker grava sua rodada num arquivo novo; uma **regra fixa em código** junta tradutor e revisores e me mostra só os segmentos que pedem decisão. |
| Custo por agente (`session_cost.py`) | Soma entrada, cache e saída dos transcripts, por agente e subagente. |

```text
chamada de ferramenta do agente
  -> pre_tool_use.py (normaliza o evento do Claude Code ou do Antigravity)
  -> tree_guard + git_guard
  -> decisão mais forte: negar > pedir > seguir   (sem supervisão: pedir vira negar)
  -> registro de auditoria
  -> resposta no protocolo da ferramenta
```

## 4. Decisões que importam

1. **Hooks garantem, prompts explicam.** A regra que não pode falhar vira código; o prompt só diz o porquê.
2. **Uma regra fixa no lugar de um juiz LLM.** Juntar revisões com outro modelo custa tokens e não é reprodutível. Com prioridade fixa (mecânica do jogo e glossário vencem estilo), o resultado é o mesmo toda vez e cabe num teste.
3. **Sem supervisão, «pedir» vira «negar».** Melhor um agente que para e anota a dúvida do que um loop travado ou uma escrita sem dono.
4. **O humano fica no ponto certo.** O agente traduz e os revisores propõem, mas a decisão final de cada segmento sensível é minha.

Cada decisão tem um registro em [`docs/decisions/`](https://github.com/ddmdros/agent-harness/tree/main/docs/decisions); no harness de produção são mais de 50 ADRs.

## 5. Resultado

- Minha produtividade foi de **300 para cerca de 900 palavras por hora** (40 mil palavras em set–out/2026, sem contar o que a memória de tradução já cobria), sem tirar a revisão humana de nenhuma entrega.
- As mesmas regras valem para Claude e Gemini, a partir de uma fonte única em `.agents/`.
- O núcleo aberto tem testes automatizados e CI em Linux e Windows, com Python 3.11 a 3.13. O CI do Windows achou uma corrida real na trava de arquivo da fila de decisões, que corrigi no núcleo aberto.

## 6. Limites

- A trava do terminal lê o **texto** do comando: caminhos montados em tempo de execução não são resolvidos. É um cinto de segurança forte, não uma sandbox.
- Ela erra para o lado seguro: uma mensagem de commit que cita `--no-verify` é negada.
- O custo por agente só lê transcripts do Claude Code.

## 7. O que aprendi

- Agente bom em produção é menos sobre o prompt e mais sobre o que está **em volta** dele: permissões, registros, revisão e medida.
- Medir antes de afirmar: produtividade, custo e taxa de edição do revisor contam histórias diferentes, e é preciso olhar as três.
- Escrever as decisões (ADRs) mudou a forma como trabalho com os agentes: eles leem as mesmas regras que eu.
