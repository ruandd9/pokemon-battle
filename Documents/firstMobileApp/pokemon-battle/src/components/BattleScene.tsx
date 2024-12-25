import * as React from 'react';
import { Pokemon } from '../types/pokemon';
import './BattleScene.css';

interface BattleSceneProps {
    playerPokemon: Pokemon;
    enemyPokemon: Pokemon;
}

// Componente memoizado para exibir o HP
const HPBar = React.memo(({ current, max }: { current: number; max: number }) => {
    const percentage = (current / max) * 100;
    const barColor = percentage > 50 ? '#4CAF50' : percentage > 20 ? '#FFC107' : '#f44336';

    return (
        <div className="hp-bar">
            <div 
                className="hp-bar-fill"
                style={{ 
                    width: `${percentage}%`,
                    backgroundColor: barColor,
                }}
            />
        </div>
    );
});

// Componente memoizado para exibir os tipos do Pokémon
const TypeBadges = React.memo(({ types }: { types: string[] }) => (
    <div className="type-badges">
        {types.map(type => (
            <span key={type} className={`type-badge ${type}`}>
                {type}
            </span>
        ))}
    </div>
));

// Componente memoizado para o card do Pokémon
const PokemonCard = React.memo(({ pokemon, isPlayer, currentHP }: { pokemon: Pokemon; isPlayer: boolean; currentHP: number }) => (
    <div className={`pokemon-card ${isPlayer ? 'player' : 'enemy'}`}>
        <img 
            src={isPlayer ? pokemon.sprites.back : pokemon.sprites.front}
            alt={pokemon.name}
            className="pokemon-sprite"
        />
        <div className="pokemon-info">
            <h3>{pokemon.name}</h3>
            <TypeBadges types={pokemon.types} />
            <div className="pokemon-stats">
                <div className="hp-status">
                    HP: {currentHP}/{pokemon.stats.hp}
                    <HPBar current={currentHP} max={pokemon.stats.hp} />
                </div>
                <div className="stat">ATK: {pokemon.stats.attack}</div>
                <div className="stat">DEF: {pokemon.stats.defense}</div>
                <div className="stat">SPD: {pokemon.stats.speed}</div>
            </div>
        </div>
    </div>
));

// Componente memoizado para os botões de ataque
const MoveButtons = React.memo(({ 
    moves, 
    onMoveSelect,
    disabled,
    pokemonName,
    pokemonTypes
}: { 
    moves: Pokemon['moves']; 
    onMoveSelect: (move: Pokemon['moves'][0]) => void;
    disabled: boolean;
    pokemonName: string;
    pokemonTypes: string[];
}) => (
    <div className="moves-grid">
        <div className="current-pokemon-move">
            {pokemonName}'s moves ({pokemonTypes.join('/')})
        </div>
        {moves.map(move => (
            <button
                key={move.name}
                className="move-button"
                onClick={() => onMoveSelect(move)}
                disabled={disabled}
            >
                {move.name}
                <span className="move-power">PWR: {move.power}</span>
                <span className={`move-type ${move.type || pokemonTypes[0]}`}>
                    {move.type || pokemonTypes[0]}
                </span>
            </button>
        ))}
    </div>
));

// Componente principal da cena de batalha
export const BattleScene: React.FC<BattleSceneProps> = ({ playerPokemon, enemyPokemon }) => {
    const [battleLog, setBattleLog] = React.useState<string[]>([]);
    const [currentTurn, setCurrentTurn] = React.useState<'player' | 'enemy'>('player');
    const [playerHP, setPlayerHP] = React.useState(playerPokemon.stats.hp);
    const [enemyHP, setEnemyHP] = React.useState(enemyPokemon.stats.hp);

    // Cálculo memoizado do dano
    const calculateDamage = React.useMemo(() => (
        (attacker: Pokemon, defender: Pokemon, move: Pokemon['moves'][0]) => {
            const attackStat = attacker.stats.attack;
            const defenseStat = defender.stats.defense;
            const power = move.power;
            const effectiveness = Math.random() > 0.8 ? 1.5 : 1; // 20% chance de crítico
            
            return Math.floor((power * (attackStat / defenseStat) * effectiveness) / 2);
        }
    ), []);

    // Handler memoizado para seleção de movimento
    const handleMoveSelect = React.useCallback((move: Pokemon['moves'][0]) => {
        if (currentTurn !== 'player') return;

        // Calcula e aplica o dano ao inimigo
        const damage = calculateDamage(playerPokemon, enemyPokemon, move);
        const newEnemyHP = Math.max(0, enemyHP - damage);
        setEnemyHP(newEnemyHP);

        // Atualiza o log
        setBattleLog(prev => [...prev, `${playerPokemon.name} usou ${move.name} e causou ${damage} de dano!`]);

        // Verifica se o inimigo foi derrotado
        if (newEnemyHP <= 0) {
            setBattleLog(prev => [...prev, `${enemyPokemon.name} foi derrotado!`]);
            return;
        }

        // Turno do inimigo
        setCurrentTurn('enemy');
        setTimeout(() => {
            const enemyMove = enemyPokemon.moves[Math.floor(Math.random() * enemyPokemon.moves.length)];
            const enemyDamage = calculateDamage(enemyPokemon, playerPokemon, enemyMove);
            const newPlayerHP = Math.max(0, playerHP - enemyDamage);
            
            setPlayerHP(newPlayerHP);
            setBattleLog(prev => [...prev, `${enemyPokemon.name} usou ${enemyMove.name} e causou ${enemyDamage} de dano!`]);
            
            if (newPlayerHP <= 0) {
                setBattleLog(prev => [...prev, `${playerPokemon.name} foi derrotado!`]);
            } else {
                setCurrentTurn('player');
            }
        }, 1000);
    }, [currentTurn, enemyHP, playerHP, playerPokemon, enemyPokemon, calculateDamage]);

    // Renderização memoizada do log de batalha
    const battleLogElement = React.useMemo(() => (
        <div className="battle-log">
            {battleLog.map((log, index) => (
                <p key={index} className="log-entry">{log}</p>
            ))}
        </div>
    ), [battleLog]);

    return (
        <div className="battle-scene">
            <div className="pokemon-container">
                <PokemonCard pokemon={playerPokemon} isPlayer={true} currentHP={playerHP} />
                <PokemonCard pokemon={enemyPokemon} isPlayer={false} currentHP={enemyHP} />
            </div>

            <div className="battle-controls">
                <div className="moves-section">
                    <h3 className="moves-title">
                        {currentTurn === 'player' ? 'Escolha seu movimento!' : 'Aguarde o inimigo...'}
                    </h3>
                    <MoveButtons
                        moves={playerPokemon.moves}
                        onMoveSelect={handleMoveSelect}
                        disabled={currentTurn !== 'player' || playerHP <= 0 || enemyHP <= 0}
                        pokemonName={playerPokemon.name}
                        pokemonTypes={playerPokemon.types}
                    />
                </div>

                {battleLogElement}
            </div>
        </div>
    );
};

export default React.memo(BattleScene);
