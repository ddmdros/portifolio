# agent-harness: case study

**Author:** Diogo Medeiros

**Last modified:** Nov 5, 2026

**Main technologies:** Python (standard library only), Claude Code, Google Antigravity (Gemini), GitHub Actions

**Code:** [github.com/ddmdros/agent-harness](https://github.com/ddmdros/agent-harness)

---

## 1. Context

I have been a game translator for six years. In 2026, I started using coding agents (Claude Code and Antigravity) to translate and review games for real clients. The gain came fast, and so did the risk: an agent with terminal access can write anywhere. A localization project holds the client delivery, reference material (glossary, translation memory), logs, and drafts, and each needs a different rule.

This repository is the **generic core** of the harness I use in production, only on projects whose contract allows the tool. It contains no real work data: the demo is a made-up RPG.

## 2. The problem

- **A prompt is not a guard.** "Never edit the glossary" in a prompt is a suggestion; the model can forget it, misread it, or find another route (a `sed -i`, a Python script).
- **Two tools, two protocols.** Claude Code and Antigravity have different hook formats for the same rules.
- **Loops with nobody watching.** A confirmation prompt stalls an agent that runs on its own.
- **Invisible decisions.** The agent picks a file name, a format, what to leave out, and nobody reviews it.
- **Real cost.** The token count a subagent reports at the end is not what it actually spent.

## 3. What I built

| Piece | What it does |
|---|---|
| Write-zone map (`.agents/tree.toml`) | Every path falls into a zone: `free`, `deliver`, `append`, `ask`, `script`, or `blocked`. The last matching zone wins; anything outside the map is blocked. |
| One hook for both tools (`pre_tool_use.py`) | Normalizes the Claude Code and Antigravity events, runs the guards, and replies in each tool's protocol. |
| Tree guard | Applies the map to file tools and, best effort, to the terminal: redirections, `rm`, `mv`, `sed -i`, PowerShell, and Python in `-c` or heredocs. |
| Git guard | No `--no-verify` or `git add -f`; push only to a repository with an allowed visibility. |
| Unattended mode | With `HARNESS_UNATTENDED=1`, every "ask" becomes a "deny" with instructions, and the loop keeps going. |
| Decision queue (`pending.py`) | The agent logs every decision it made by inference; I approve or reject it later, by id. |
| Runs and merge (`runs.py`, `merge_reviews.py`) | Each worker writes its run to a new file; a **fixed rule in code** merges the translator and the reviewers and shows me only the segments that need a decision. |
| Cost per agent (`session_cost.py`) | Sums input, cache, and output tokens from the transcripts, per agent and subagent. |

```text
agent tool call
  -> pre_tool_use.py (normalizes the Claude Code or Antigravity event)
  -> tree_guard + git_guard
  -> strongest decision: deny > ask > allow   (unattended: ask becomes deny)
  -> audit log
  -> reply in the tool's protocol
```

## 4. Decisions that matter

1. **Hooks enforce, prompts inform.** A rule that cannot fail becomes code; the prompt only explains why.
2. **A fixed rule instead of an LLM judge.** Merging reviews with another model costs tokens and is not reproducible. With a fixed priority (game mechanics and glossary beat style), the result is the same every time and fits in a test.
3. **Unattended, "ask" becomes "deny".** An agent that stops and logs the question beats a stalled loop or an unowned write.
4. **The human sits at the right point.** The agent translates and the reviewers propose, but I make the final call on every sensitive segment.

Each decision has a record in [`docs/decisions/`](https://github.com/ddmdros/agent-harness/tree/main/docs/decisions); the production harness has more than 50 ADRs.

## 5. Results

- My throughput went from **300 to about 900 words per hour** (40k words in Sep–Oct 2026, excluding what the translation memory already covered), with human review kept on every delivery.
- The same rules apply to Claude and Gemini, from a single source in `.agents/`.
- The open core has automated tests and CI on Linux and Windows, with Python 3.11 to 3.13. The Windows CI caught a real race in the decision queue's file lock, which I fixed in the open core.

## 6. Limits

- The terminal guard reads the command **text**: paths built at runtime are not resolved. It is a strong seatbelt, not a sandbox.
- It errs on the safe side: a commit message that mentions `--no-verify` is denied.
- The per-agent cost only reads Claude Code transcripts.

## 7. What I learned

- A good agent in production is less about the prompt and more about what surrounds it: permissions, logs, review, and measurement.
- Measure before claiming: throughput, cost, and reviewer edit rate tell different stories, and you need all three.
- Writing decisions down (ADRs) changed how I work with agents: they read the same rules I do.
