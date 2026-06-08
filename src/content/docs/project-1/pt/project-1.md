# Relatório Final do Projeto: Office Mayhem

**Instituto INFNET - Engenharia de Software** **Autor:** Diogo de Souza Medeiros

---

## 1. Apresentação

### Visão Geral

O **Office Mayhem** é um _web game_ interativo de estratégia e narrativa ambientado em um cenário corporativo caótico. O projeto utiliza referências temáticas de jogos, trazendo a personagem Mina como representante do setor de Recursos Humanos (RH) em meio ao ambiente de trabalho.

### Justificativa

O projeto demanda uma aplicação prática e aprofundada de desenvolvimento _frontend_ moderno, exigindo a orquestração de múltiplos estados de partida, roteamento dinâmico de cenas de interface e internacionalização completa em uma arquitetura fortemente componentizada.

### Idealização do projeto

A dinâmica principal envolve o usuário assumindo o papel de liderança para conter crises corporativas. O fluxo de usabilidade conta com:

- **Recrutamento:** Montagem de uma equipe ("Task Force") selecionando estrategicamente três especialistas (Brawlers) de diferentes classes.
- **Encontros (Crises):** Enfrentamento de problemas rotineiros (ex: incidentes no elevador corporativo), cabendo ao jogador analisar dados e tomar decisões.
- **Gerenciamento de Recursos:** Monitoramento da métrica "Caos no Escritório", que não deve atingir 100%.

---

## 2. Arquitetura de dados e fluxo do ecossistema

O ecossistema do Office Mayhem possui uma arquitetura centralizada na reatividade do _Client-Side_.

### Diagrama de Fluxo de Cenas

### Componentes do Sistema

1.  **Estado e Roteamento:** O `SceneManager` avalia uma variável de estado (`GameScene`) para renderizar módulos (START, INTRO_DIALOGUE, RECRUITING, ENCOUNTER, RESULT).
2.  **Gerenciamento de Conteúdo:** Dicionários estáticos tipados e arquivos `.json` despacham diálogos e atributos.
3.  **Identidade Visual:** CSS modularizado com uso intensivo de _keyframes_ e _gradientes radiais_ para uma experiência responsiva.

### Exemplo de Lógica: Motor do Jogo

```typescript
// Exemplo da estrutura do useGameEngine
export const useGameEngine = () => {
  const [chaos, setChaos] = useState(0);

  const handleChoice = (result: ChoiceResult) => {
    // Processamento de pontos de caos e progressão
    setChaos((prev) => prev + result.chaosValue);
  };

  return { chaos, handleChoice };
};
```
