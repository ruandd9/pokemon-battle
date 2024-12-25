export type PokemonType = 
    | 'normal' 
    | 'fire' 
    | 'water' 
    | 'electric' 
    | 'grass' 
    | 'ice' 
    | 'fighting' 
    | 'poison' 
    | 'ground' 
    | 'flying' 
    | 'psychic' 
    | 'bug' 
    | 'rock' 
    | 'ghost' 
    | 'dragon'
    | 'dark' 
    | 'steel' 
    | 'fairy';

export interface Move {
    name: string;
    type: PokemonType;
    power: number;
    accuracy: number;
    pp: number;
}

export interface Stats {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
}

export interface EvolutionChainNode {
    id: number;
    name: string;
    evolvesTo: EvolutionChainNode[];
}

export interface Sprites {
    front_default: string;
    front_shiny?: string;
    back_default: string;
    back_shiny?: string;
}

export interface Pokemon {
    id: number;
    name: string;
    types: string[];
    stats: {
        hp: number;
        attack: number;
        defense: number;
        speed: number;
    };
    moves: {
        name: string;
        power: number;
        type?: string;
    }[];
    sprites: {
        front: string;
        back: string;
    };
    evolutionIds?: number[];
    evolutionChain?: EvolutionChainNode;
    currentHp: number;
    maxHp: number;
}
