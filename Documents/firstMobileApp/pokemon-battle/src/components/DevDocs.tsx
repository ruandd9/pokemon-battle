import * as React from 'react';
import './DevDocs.css';

interface Section {
    title: string;
    content: string[];
    code?: string;
}

const DevDocs: React.FC = () => {
    const [activeSection, setActiveSection] = React.useState<string>('overview');

    const sections: Record<string, Section> = {
        overview: {
            title: 'Visão Geral',
            content: [
                'Pokémon Battle System é um projeto React que simula batalhas Pokémon em tempo real.',
                'O sistema utiliza a PokeAPI para obter dados dos Pokémon e implementa mecânicas de batalha baseadas nos jogos originais.',
                'Desenvolvido com TypeScript e React, o projeto demonstra boas práticas de desenvolvimento e padrões de design modernos.'
            ]
        },
        architecture: {
            title: 'Arquitetura',
            content: [
                'O projeto segue uma arquitetura modular com componentes React reutilizáveis.',
                'Gerenciamento de estado local com React Hooks.',
                'Serviços separados para chamadas à API e lógica de negócios.',
                'Sistema de tipos TypeScript para maior segurança e manutenibilidade.'
            ],
            code: `
// Exemplo de estrutura de arquivos
src/
  ├── components/
  │   ├── BattleScene/
  │   ├── EvolutionModal/
  │   └── DevDocs/
  ├── services/
  │   └── pokemonService.ts
  ├── types/
  │   └── pokemon.ts
  ├── hooks/
  └── utils/
            `
        },
        components: {
            title: 'Componentes Principais',
            content: [
                'BattleScene: Gerencia a interface e lógica da batalha',
                'EvolutionModal: Controla o sistema de evolução dos Pokémon',
                'PokemonCard: Exibe informações e status dos Pokémon',
                'MovesList: Lista e gerencia os ataques disponíveis'
            ]
        },
        api: {
            title: 'Integração com API',
            content: [
                'Utiliza a PokeAPI (pokeapi.co) para dados dos Pokémon',
                'Implementa cache local para melhor performance',
                'Gerenciamento de erros e estados de carregamento'
            ],
            code: `
// Exemplo de chamada à API
const fetchPokemon = async (id: number) => {
    try {
        const response = await fetch(
            \`https://pokeapi.co/api/v2/pokemon/\${id}\`
        );
        return await response.json();
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
        throw error;
    }
};
            `
        },
        battle: {
            title: 'Sistema de Batalha',
            content: [
                'Cálculo de dano baseado em tipos e estatísticas',
                'Sistema de turnos alternados',
                'Animações e efeitos visuais',
                'Sistema de evolução integrado'
            ]
        },
        setup: {
            title: 'Configuração do Projeto',
            content: [
                '1. Clone o repositório',
                '2. Instale as dependências com npm install',
                '3. Execute npm run dev para iniciar o servidor de desenvolvimento',
                '4. Acesse http://localhost:5173'
            ],
            code: `
# Comandos de instalação
git clone [url-do-repositorio]
cd pokemon-battle
npm install
npm run dev
            `
        }
    };

    return (
        <div className="dev-docs">
            <header className="dev-docs-header">
                <h1>Documentação para Desenvolvedores</h1>
                <p>Pokémon Battle System - Guia Técnico</p>
            </header>

            <nav className="dev-docs-nav">
                {Object.keys(sections).map((key) => (
                    <button
                        key={key}
                        className={`nav-button ${activeSection === key ? 'active' : ''}`}
                        onClick={() => setActiveSection(key)}
                    >
                        {sections[key].title}
                    </button>
                ))}
            </nav>

            <main className="dev-docs-content">
                <section className="content-section">
                    <h2>{sections[activeSection].title}</h2>
                    <div className="content-text">
                        {sections[activeSection].content.map((text, index) => (
                            <p key={index}>{text}</p>
                        ))}
                    </div>
                    {sections[activeSection].code && (
                        <pre className="code-block">
                            <code>{sections[activeSection].code}</code>
                        </pre>
                    )}
                </section>
            </main>

            <footer className="dev-docs-footer">
                <p>Desenvolvido com ❤️ por Ruano</p>
                <p>Contribuições são bem-vindas!</p>
            </footer>
        </div>
    );
};

export default DevDocs;
