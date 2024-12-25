# Pokémon Battle System

Um sistema de batalha Pokémon moderno e interativo construído com React e TypeScript, apresentando uma interface elegante e responsiva inspirada nos jogos clássicos de Pokémon.

## Características

### Interface do Usuário
- Design moderno com tema escuro em tons de vermelho
- Efeitos de glassmorphism para uma aparência moderna
- Animações suaves e responsivas
- Pokébolas flutuantes decorativas no fundo
- Indicador visual do Pokémon do jogador com borda dourada pulsante
- Interface adaptativa para diferentes tamanhos de tela

### Sistema de Batalha
- Batalhas por turnos entre jogador e CPU
- Sistema de dano baseado em estatísticas dos Pokémon
- Movimentos com tipos e poderes específicos
- Indicadores de HP dinâmicos
- Log de batalha detalhado
- Chance de golpes críticos

### Detalhes dos Pokémon
- Exibição de estatísticas completas (HP, ATK, DEF, SPD)
- Tipos de Pokémon com cores correspondentes
- Sprites oficiais da PokeAPI
- Movimentos com tipos e poder de dano
- Barras de HP com cores dinâmicas baseadas no HP restante

### Recursos Técnicos
- Integração com PokeAPI
- Sistema de cache para dados dos Pokémon
- Componentes React otimizados com memoização
- Animações CSS personalizadas
- Tipagem completa com TypeScript
- Estilização modular com CSS
- Design responsivo

## Tecnologias Utilizadas

- React
- TypeScript
- PokeAPI
- CSS Modules
- Vite

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/pokemon-battle.git
```

2. Instale as dependências:
```bash
cd pokemon-battle
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Como Jogar

1. Ao iniciar, o jogo selecionará aleatoriamente um Pokémon para você e para o oponente
2. Seu Pokémon será exibido à esquerda com uma borda dourada pulsante
3. Escolha um dos quatro movimentos disponíveis para atacar
4. O tipo e poder de cada movimento são exibidos nos botões
5. Observe o log de batalha para acompanhar os eventos
6. Gerencie seus movimentos estrategicamente baseado no HP restante

## Personalização

O jogo possui variáveis CSS personalizáveis que podem ser ajustadas em `src/App.css`:

- `--primary-color`: Cor principal do tema
- `--background-start`: Cor inicial do gradiente
- `--background-end`: Cor final do gradiente
- `--secondary-color`: Cor secundária para destaques

## Desenvolvimento

### Estrutura do Projeto
```
pokemon-battle/
├── src/
│   ├── components/
│   │   ├── BattleScene.tsx
│   │   └── BattleScene.css
│   ├── services/
│   │   └── pokemonService.ts
│   ├── types/
│   │   └── pokemon.ts
│   ├── App.tsx
│   └── App.css
└── package.json
```

### Componentes Principais

- `BattleScene`: Gerencia a lógica e interface da batalha
- `PokemonCard`: Exibe informações detalhadas do Pokémon
- `MoveButtons`: Controla os botões de movimento
- `BattleLog`: Registra eventos da batalha

## Próximas Atualizações

- [ ] Sistema de tipos com vantagens/desvantagens
- [ ] Efeitos sonoros e músicas
- [ ] Animações de ataque
- [ ] Modo multiplayer
- [ ] Sistema de evolução
- [ ] Seleção de Pokémon inicial

## Contribuindo

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Agradecimentos

- [PokeAPI](https://pokeapi.co/) por fornecer os dados dos Pokémon
- Comunidade React por ferramentas e recursos incríveis
- Game Freak e Nintendo pela inspiração do Pokémon

---
Desenvolvido com ❤️ por [seu-nome]
