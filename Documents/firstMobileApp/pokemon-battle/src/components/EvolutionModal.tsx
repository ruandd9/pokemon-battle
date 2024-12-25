import React, { useState } from 'react';
import { Pokemon } from '../types/pokemon';
import './EvolutionModal.css';

interface EvolutionModalProps {
    pokemon: Pokemon;
    evolutions: Pokemon[];
    onClose: () => void;
}

export const EvolutionModal: React.FC<EvolutionModalProps> = ({ pokemon, evolutions, onClose }) => {
    const [showTips, setShowTips] = useState(true);

    const previousEvolutions = evolutions.filter(evo => {
        if (!pokemon.evolutionChain) return false;
        const findPositionInChain = (chain: any, id: number, level: number = 0): number => {
            if (chain.id === id) return level;
            for (const evolution of chain.evolvesTo) {
                const pos = findPositionInChain(evolution, id, level + 1);
                if (pos >= 0) return pos;
            }
            return -1;
        };
        
        const currentPos = findPositionInChain(pokemon.evolutionChain, pokemon.id);
        const evoPos = findPositionInChain(pokemon.evolutionChain, evo.id);
        return evoPos < currentPos;
    });

    const nextEvolutions = evolutions.filter(evo => {
        if (!pokemon.evolutionChain) return false;
        const findPositionInChain = (chain: any, id: number, level: number = 0): number => {
            if (chain.id === id) return level;
            for (const evolution of chain.evolvesTo) {
                const pos = findPositionInChain(evolution, id, level + 1);
                if (pos >= 0) return pos;
            }
            return -1;
        };
        
        const currentPos = findPositionInChain(pokemon.evolutionChain, pokemon.id);
        const evoPos = findPositionInChain(pokemon.evolutionChain, evo.id);
        return evoPos > currentPos;
    });

    const renderPokemonCard = (pokemonData: Pokemon, isCurrentPokemon: boolean = false) => (
        <div className={`evolution-option ${isCurrentPokemon ? 'current-pokemon' : ''}`}>
            <div className="pokemon-sprite-container">
                <img src={pokemonData.sprite} alt={pokemonData.name} className="pokemon-sprite" />
                {pokemonData.recommendation && (
                    <div className="recommendation-badge">
                        Recomendado
                    </div>
                )}
            </div>
            <p className="pokemon-name">{pokemonData.name}</p>
            <div className="pokemon-types">
                {pokemonData.types.map((type, typeIndex) => (
                    <span key={typeIndex} className={`type-badge ${type}`}>{type}</span>
                ))}
            </div>
            <div className="pokemon-stats">
                <p>HP: {pokemonData.stats.hp}</p>
                <p>Ataque: {pokemonData.stats.attack}</p>
                <p>Defesa: {pokemonData.stats.defense}</p>
            </div>
            {showTips && pokemonData.moves && (
                <div className="pokemon-moves">
                    <h4>Ataques:</h4>
                    <ul>
                        {pokemonData.moves.map((move, index) => (
                            <li key={index}>{move.name} - Poder: {move.power}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

    return (
        <div className="evolution-modal-overlay" onClick={onClose}>
            <div className="evolution-modal" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <button className="toggle-tips-button" onClick={() => setShowTips(!showTips)}>
                    {showTips ? 'Ocultar Dicas' : 'Mostrar Dicas'}
                </button>
                
                <h2>Linha Evolutiva de {pokemon.name}</h2>
                
                {previousEvolutions.length > 0 && (
                    <div className="evolution-section">
                        <h3>Evoluções Anteriores</h3>
                        <div className="evolution-options">
                            {previousEvolutions.map((evolution, index) => (
                                <div key={index}>
                                    {renderPokemonCard(evolution)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {renderPokemonCard(pokemon, true)}

                {nextEvolutions.length > 0 && (
                    <div className="evolution-section">
                        <h3>Próximas Evoluções</h3>
                        <div className="evolution-options">
                            {nextEvolutions.map((evolution, index) => (
                                <div key={index}>
                                    {renderPokemonCard(evolution)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {evolutions.length === 0 && (
                    <div className="evolution-section">
                        <p style={{ textAlign: 'center', padding: '2rem' }}>
                            Este Pokémon não possui evoluções disponíveis.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
