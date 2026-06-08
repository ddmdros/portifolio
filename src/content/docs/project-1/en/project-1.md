# Relatório Final do Projeto: Office Mayhem

**Instituto INFNET - Engenharia de Software** **Autor:** Diogo de Souza Medeiros

---

## 1. Apresentação

### Visão Geral

O **Office Mayhem** é um _web game_ interativo de estratégia e narrativa ambientado em um cenário corporativo caótico. O projeto utiliza referências temáticas de jogos táticos e de gerenciamento, trazendo a personagem Mina como representante do setor de Recursos Humanos (RH) tentando conter as crises do ambiente de trabalho.

### Justificativa Arquitetural

O projeto foi desenvolvido como um _Case Study_ de arquitetura técnica proprietária, utilizando um ecossistema moderno composto por **React 18, TypeScript 5, Vite e Node.js**. A aplicação exige a orquestração de múltiplos estados de partida, roteamento dinâmico de cenas e uma internacionalização complexa, culminando em um ambiente de _runtime_ web altamente modular e reativo que separa estritamente a lógica de simulação de negócios da renderização visual.

### Dinâmica e Fluxo de Usabilidade

A dinâmica principal envolve o usuário assumindo o papel de liderança. O fluxo idealizado conta com:

- **Recrutamento:** Montagem de uma equipe ("Task Force") selecionando estrategicamente três especialistas (Brawlers) de diferentes classes.
  ![Interface de Recrutamento](/assets/projects/project_1/p1_1.jpeg)
- **Encontros (Crises):** Enfrentamento de problemas rotineiros (ex: incidentes no elevador corporativo), cabendo ao jogador analisar dados e tomar decisões.
  ![Sala de Encontros](/assets/projects/project_1/p1_2.jpeg)
- **Gerenciamento de Recursos:** Monitoramento da métrica "Caos no Escritório", que dita o _game over_ caso alcance 100%.

---

## 2. Arquitetura de Dados e Controle de Estado

O ecossistema do Office Mayhem segue o Princípio de Responsabilidade Única (SRP), isolando a máquina de estados, utilitários determinísticos de pontuação e os componentes de apresentação.

### Motor Lógico e Roteamento de Cenas

1. **useGameEngine (Motor de Simulação):** Hook fundacional que atua como uma máquina de estados não-opinativa. Ele rastreia métricas do jogador (HP, multiplicadores de dano), intercepta gatilhos de transição e compila os parâmetros brutos da _gameplay_ para a avaliação final.
2. **SceneManager (Orquestrador de Views):** Atuando como um roteador linear de alta performance, ele avalia variáveis do tipo `GameState` (ex: `MENU`, `ENCOUNTER`, `RESULTS`) para renderizar módulos específicos. Essa arquitetura evita abstrações pesadas de roteamento de terceiros, eliminando vazamentos de memória (_memory leaks_) e sobreposição de renderização.

```typescript
// Exemplo de abstração do motor de simulação (useGameEngine)
export const useGameEngine = () => {
  const [chaos, setChaos] = useState(0);

  const handleChoice = (result: ChoiceResult) => {
    // Processamento de pontos de caos e progressão de forma determinística
    setChaos((prev) => prev + result.chaosValue);
  };

  return { chaos, handleChoice };
};
```

---

## 3. Localização Avançada e Linguagem Inclusiva

Um dos diferenciais técnicos do projeto é a sua arquitetura de internacionalização (i18n) voltada para produção (`useLanguage.ts`). Em vez de depender de dicionários rígidos, o motor de localização foi projetado com padrões profissionais da indústria de jogos para atender às complexidades gramaticais do Português Brasileiro e do Inglês.

- **Interpolação Dinâmica de Tokens:** O sistema escaneia nós de tradução em busca de marcadores estruturais, injetando contextos de estado dinamicamente em tempo real (ex: trocando tempos verbais e pontuações).
- **Adaptação de Gênero Neutro:** A arquitetura garante a aplicação rigorosa de diretrizes de linguagem inclusiva. O _framework_ resolve dinamicamente a troca de sufixos de substantivos, adjetivos e _tags_ descritivas com base nas configurações de perfil, mantendo a naturalidade sintática sem duplicar os arquivos de ativos do dicionário.

---

## 4. Qualidade de Código e Ficha Técnica

Para manter os pacotes de distribuição leves e garantir a integridade do _runtime_, o código passa por fluxos rígidos de análise:

- **Contratos Fortemente Tipados (`game.ts`):** Todas as estruturas de personagens, relatórios de avaliação e estados de jogo estão amarradas a interfaces estritas, prevenindo incompatibilidades semânticas em tempo de compilação.
- **Análise Estática (Fallow):** A base de código utiliza o Fallow (ferramenta baseada em Rust) para auditorias em profundidade, identificando dependências circulares entre _hooks_ e garantindo a eliminação de _dead code_ durante refatorações.

| Camada / Componente     | Tecnologia      | Justificativa Técnica                                                                             |
| :---------------------- | :-------------- | :------------------------------------------------------------------------------------------------ |
| **Frontend**            | React 18 / Vite | Base sólida de SPA com otimização severa de _bundle_ e _hot-reload_ instantâneo.                  |
| **Segurança e Tipagem** | TypeScript 5    | Contratos de dados estritos (`game.ts`) para atributos e validação em compilação.                 |
| **Controle Lógico**     | Custom Hooks    | Desacoplamento da manipulação de estados iterativos (pontos, arrays de escolhas).                 |
| **Estilização**         | CSS3 Modular    | Uso nativo e extensivo de _keyframes_ e propriedades lógicas sem _overhead_ de pré-processadores. |

---

## 5. Estrutura do Projeto

A arquitetura do projeto segue um padrão de organização modular achatado (_flat directory pattern_), prevenindo dependências relativas profundas e separando a lógica de negócio dos arquivos de conteúdo estático:

```text
portifolio/
 ┣ public/assets/       # Ativos estáticos servidos na raiz (Imagens)
 ┣ src/
 ┃ ┣ components/        # Componentes de UI modulares e consolidados
 ┃ ┣ content/           # Núcleo de conteúdo e dicionários estáticos
 ┃ ┃ ┣ docs/            # Arquivos Markdown (documentação detalhada)
 ┃ ┃ ┣ pages/           # Lógica de processamento e renderização de docs
 ┃ ┃ ┗ ProjectsData.ts  # Metadados tipados do portfólio
 ┃ ┣ hooks/             # Motores de estado (SceneManager, useGameEngine)
 ┃ ┣ i18n/              # Configuração, mensagens e regras de localização
 ┃ ┣ types/             # Interfaces e contratos globais (TypeScript)
 ┃ ┗ utils/             # Algoritmos puros de avaliação e pontuação
 ┗ vite.config.ts       # Configurações de empacotamento e ambiente
```

---

## 6. Próximos Passos e Melhorias Futuras

- **Escalabilidade de Backend:** Evoluir a atual camada estática (`api.ts`) para uma infraestrutura de banco de dados ativa, capaz de resgatar placares e gerenciar instâncias de sessão dos usuários.
- **Algoritmos Puros:** Expandir o módulo `evaluation.Utils.ts` com novas mecânicas de penalidade, garantindo que o cálculo de métricas finais permaneça computacionalmente barato e 100% testável de forma unitária.
- **Fidelidade Audiovisual:** Acréscimo de retornos sonoros para cliques na interface e melhoria da resposta vetorial na exibição de cartas durante a fase de recrutamento.
