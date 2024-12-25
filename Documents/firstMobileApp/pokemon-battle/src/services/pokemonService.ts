import { Pokemon } from '../types/pokemon';

// Cache para armazenar os Pokémon já carregados
const pokemonCache = new Map<number, CacheItem>();

// Tempo de expiração do cache em milissegundos (5 minutos)
const CACHE_EXPIRATION = 5 * 60 * 1000;

interface CacheItem {
    data: Pokemon;
    timestamp: number;
}

interface MoveDetails {
    name: string;
    type: string;
    power: number;
}

const isCacheValid = (timestamp: number): boolean => {
    return Date.now() - timestamp < CACHE_EXPIRATION;
};

export const getRandomPokemonId = (): number => {
    return Math.floor(Math.random() * 151) + 1; // Limitando aos 151 Pokémon originais
};

const fetchMoveDetails = async (url: string): Promise<MoveDetails> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
        name: data.name.replace('-', ' '),
        type: data.type.name,
        power: data.power || Math.floor(Math.random() * 50) + 30,
    };
};

export const fetchPokemon = async (id: number): Promise<Pokemon> => {
    try {
        // Verifica o cache
        const cachedItem = pokemonCache.get(id);
        if (cachedItem && isCacheValid(cachedItem.timestamp)) {
            return cachedItem.data;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        // Buscar detalhes dos movimentos
        const movePromises = data.moves
            .slice(0, 4)
            .map((move: any) => fetchMoveDetails(move.move.url));
        
        const moves = await Promise.all(movePromises);

        // Transformar os dados da API no formato que precisamos
        const pokemon: Pokemon = {
            id: data.id,
            name: data.name,
            types: data.types.map((type: any) => type.type.name),
            stats: {
                hp: data.stats.find((stat: any) => stat.stat.name === 'hp').base_stat,
                attack: data.stats.find((stat: any) => stat.stat.name === 'attack').base_stat,
                defense: data.stats.find((stat: any) => stat.stat.name === 'defense').base_stat,
                speed: data.stats.find((stat: any) => stat.stat.name === 'speed').base_stat,
            },
            moves: moves.map(move => ({
                name: move.name,
                power: move.power,
                type: move.type,
            })),
            sprites: {
                front: data.sprites.front_default,
                back: data.sprites.back_default,
            },
        };

        // Atualiza o cache
        pokemonCache.set(id, {
            data: pokemon,
            timestamp: Date.now(),
        });

        return pokemon;
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
        throw new Error('Failed to fetch Pokemon. Please try again later.');
    }
};

// Função para pré-carregar alguns Pokémon comuns
export const preloadCommonPokemon = async () => {
    const commonIds = [1, 4, 7, 25]; // Bulbasaur, Charmander, Squirtle, Pikachu
    try {
        await Promise.all(commonIds.map(id => fetchPokemon(id)));
    } catch (error) {
        console.error('Error preloading Pokemon:', error);
    }
};

// Função para limpar o cache antigo
export const cleanupCache = () => {
    const now = Date.now();
    for (const [id, item] of pokemonCache.entries()) {
        if (!isCacheValid(item.timestamp)) {
            pokemonCache.delete(id);
        }
    }
};

// Limpar o cache a cada 5 minutos
setInterval(cleanupCache, CACHE_EXPIRATION);
