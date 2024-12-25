import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { BattleScene } from './components/BattleScene';
import { fetchPokemon, getRandomPokemonId, preloadCommonPokemon } from './services/pokemonService';
import { Pokemon } from './types/pokemon';
import './App.css';

// Lazy load da documentação
const DevDocs = lazy(() => import('./components/DevDocs'));

// SVG da Pokébola como componente memo
const PokeballSVG = React.memo(() => (
  <svg width="100" height="100" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#ff1f1f" stroke="#000" strokeWidth="3"/>
    <rect x="0" y="48" width="100" height="4" fill="#000"/>
    <circle cx="50" cy="50" r="15" fill="#fff" stroke="#000" strokeWidth="3"/>
    <circle cx="50" cy="50" r="8" fill="#000"/>
  </svg>
));

// Componente de loading
const LoadingSpinner = () => (
  <div className="loading">
    <div className="loading-spinner">
      <PokeballSVG />
    </div>
    <p>Carregando...</p>
  </div>
);

// Componente de erro
const ErrorMessage = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="error">
    <p>{message}</p>
    <button onClick={onRetry}>Tentar Novamente</button>
  </div>
);

function App() {
  const [playerPokemon, setPlayerPokemon] = useState<Pokemon | null>(null);
  const [enemyPokemon, setEnemyPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDocs, setShowDocs] = useState(false);

  // Função memoizada para carregar Pokémon
  const loadPokemon = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [playerData, enemyData] = await Promise.all([
        fetchPokemon(getRandomPokemonId()),
        fetchPokemon(getRandomPokemonId())
      ]);

      setPlayerPokemon(playerData);
      setEnemyPokemon(enemyData);
    } catch (err) {
      console.error('Error loading Pokemon:', err);
      setError('Falha ao carregar os Pokémon. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Efeito para pré-carregar Pokémon comuns
  useEffect(() => {
    preloadCommonPokemon();
  }, []);

  // Efeito para carregar Pokémon iniciais
  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  // Handler memoizado para nova batalha
  const handleNewBattle = useCallback(() => {
    loadPokemon();
  }, [loadPokemon]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleNewBattle} />;
  }

  return (
    <div className="App">
      <nav className="app-nav">
        <button 
          className="nav-toggle pixel-button"
          onClick={() => setShowDocs(!showDocs)}
        >
          {showDocs ? 'Voltar para o Jogo' : 'Documentação'}
        </button>
      </nav>

      <Suspense fallback={<LoadingSpinner />}>
        {showDocs ? (
          <DevDocs />
        ) : (
          <>
            <div className="pokeball-decoration pokeball-top">
              <PokeballSVG />
            </div>
            <div className="pokeball-decoration pokeball-bottom">
              <PokeballSVG />
            </div>
            
            <h1>Pokémon Battle System</h1>
            {playerPokemon && enemyPokemon && (
              <>
                <BattleScene 
                  playerPokemon={playerPokemon}
                  enemyPokemon={enemyPokemon}
                />
                <button className="new-battle-button" onClick={handleNewBattle}>
                  Nova Batalha
                </button>
              </>
            )}
          </>
        )}
      </Suspense>
    </div>
  );
}

export default App;
