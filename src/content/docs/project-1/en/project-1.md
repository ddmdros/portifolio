# Documentação Starr Corp: Caos no Escritório

**Autor:** Diogo de Souza Medeiros  
**Última modificação:** 08/06/2026  
**Principais tecnologias utilizadas:** React, Typescript

---

## 1. Apresentação

### Visão Geral

**Starr Corp: Caos no Escritório** é um _web game_ interativo de estratégia e narrativa ambientado em um cenário corporativo caótico. Neste projeto, Mina atua como representante do setor de RH e tenta conter as crises do ambiente de trabalho.

### Justificativa Arquitetural

O projeto foi desenvolvido como um _estudo de caso_ para colocar colocar em prática conhecimentos técnicos em **React 18, TypeScript 5, Vite e Node.js**. A aplicação exige a orquestração de múltiplos estados de partida, roteamento dinâmico de cenas e uma internacionalização complexa, culminando em um ambiente de _runtime_ web altamente modular e reativo que separa estritamente a lógica de simulação de negócios da renderização visual.

### Dinâmica e Fluxo de Usabilidade

Na dinâmica principal, o usuário assume o papel de liderança para recrutar e gerenciar uma crise. O fluxo idealizado conta com:

- **Recrutamento:** O jogador deve montar uma equipe e selecionar estrategicamente três especialistas de diferentes classes.
  ![Interface de Recrutamento](/assets/projects/project_1/p1_1.jpeg)
- **Encontros (Crises):** Enfrentamento de problemas rotineiros (ex: incidentes no elevador corporativo), cabendo ao jogador analisar dados e tomar decisões.
  ![Sala de Encontros](/assets/projects/project_1/p1_2.jpeg)
- **Gerenciamento de Recursos:** Monitoramento da métrica "Caos no Escritório", que dita o _game over_ caso alcance 100%.
  ![Gerenciamento de Caos](/assets/projects/project_1/p1_6_office_chaos.png)
- ***

## 2. Arquitetura de Dados e Controle de Estado

O ecossistema do Office Mayhem segue o Princípio de Responsabilidade Única (SRP), isolando a máquina de estados, utilitários determinísticos de pontuação e os componentes de apresentação.

### Motor Lógico e Roteamento de Cenas

1. **useGameEngine (Motor de Simulação):** Hook fundacional que atua como uma máquina de estados não-opinativa. Ele rastreia métricas do jogador (nível de caos, cena atual etc.), intercepta gatilhos de transição e compila os parâmetros brutos da _gameplay_ para a avaliação final.
2. **SceneManager (Orquestrador das cenas):** Atua como um roteador linear de alto desempenho. Ele avalia variáveis do tipo `GameState` (ex: `INTRO_DIALOGUE`, `ENCOUNTER`, `RESULT`) para renderizar módulos específicos. Essa arquitetura evita abstrações pesadas de roteamento de terceiros e elimina vazamentos de memória (_memory leaks_) e sobreposição de renderização.

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

## 3. Internacionalização e linguagem inclusiva

Um dos diferenciais técnicos do projeto é a sua arquitetura de internacionalização (i18n) voltada para produção (`useLanguage.ts`). Em vez de depender de dicionários rígidos, o motor de localização foi projetado com padrões profissionais da indústria de jogos para atender às complexidades gramaticais do português brasileiro e do inglês.

- **Interpolação dinâmica de tokens:** O sistema escaneia nós de tradução em busca de marcadores estruturais e injeta contextos de estado dinamicamente em tempo real (ex: trocando tempos verbais e pontuações).
- **Adaptação de gênero neutro:** A arquitetura garante a aplicação rigorosa de diretrizes de linguagem inclusiva. O _framework_ resolve dinamicamente a troca de sufixos de substantivos, adjetivos e _tags_ descritivas com base nas configurações de perfil, mantendo a naturalidade sintática sem duplicar os arquivos de ativos do dicionário.

---

## 4. Qualidade de Código e Ficha Técnica

Para manter os pacotes de distribuição leves e garantir a integridade do _runtime_, o código passa por fluxos rígidos de análise:

- **Contratos fortemente tipados (`game.ts`):** Todas as estruturas de personagens, relatórios de avaliação e estados de jogo estão amarradas a interfaces estritas, prevenindo incompatibilidades semânticas em tempo de compilação.
  ```text
  export interface Brawler {
  id: number;
  name: string;
  link: string;
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
  class: BrawlerClass;
  encounters: EncounterAction[];
  isUsed?: boolean;
  description?: string;
  description_ptbr?: string;
  className?: string;
  classColor?: string;
  iconUrl?: string;
  }
  ```
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

## 6. Gameplay loop

Confira, abaixo, um vídeo demonstrativo em que exibimos as principais funcionalidades do ciclo de jogabilidade de Starr Corp: Caos no Escritório:

<iframe src="https://www.youtube.com/embed/Axfj9Brnzhg" title="Gameplay Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 7. Próximos Passos e Melhorias Futuras

- **Escalabilidade de Backend:** Evoluir a atual camada estática (`api.ts`) para uma infraestrutura de banco de dados ativa, capaz de resgatar placares e gerenciar instâncias de sessão dos usuários.
- **Algoritmos Puros:** Expandir o módulo `evaluation.Utils.ts` com novas mecânicas de penalidade, garantindo que o cálculo de métricas finais permaneça computacionalmente barato e 100% testável de forma unitária.
- **Fidelidade Audiovisual:** Acréscimo de retornos sonoros para cliques na interface e melhoria da resposta vetorial na exibição de cartas durante a fase de recrutamento.
