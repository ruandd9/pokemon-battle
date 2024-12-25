import { Pokemon } from '../types/pokemon';

export const charizard: Pokemon = {
    id: 6,
    name: 'Charizard',
    types: ['fire', 'flying'],
    stats: {
        hp: 78,
        attack: 84,
        defense: 78,
        speed: 100
    },
    moves: [
        {
            name: 'Flamethrower',
            type: 'fire',
            power: 90,
            accuracy: 100,
            pp: 15
        },
        {
            name: 'Air Slash',
            type: 'flying',
            power: 75,
            accuracy: 95,
            pp: 15
        },
        {
            name: 'Dragon Claw',
            type: 'dragon',
            power: 80,
            accuracy: 100,
            pp: 15
        },
        {
            name: 'Fire Blast',
            type: 'fire',
            power: 110,
            accuracy: 85,
            pp: 5
        }
    ],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
};

export const blastoise: Pokemon = {
    id: 9,
    name: 'Blastoise',
    types: ['water'],
    stats: {
        hp: 79,
        attack: 83,
        defense: 100,
        speed: 78
    },
    moves: [
        {
            name: 'Hydro Pump',
            type: 'water',
            power: 110,
            accuracy: 80,
            pp: 5
        },
        {
            name: 'Ice Beam',
            type: 'ice',
            power: 90,
            accuracy: 100,
            pp: 10
        },
        {
            name: 'Surf',
            type: 'water',
            power: 90,
            accuracy: 100,
            pp: 15
        },
        {
            name: 'Flash Cannon',
            type: 'steel',
            power: 80,
            accuracy: 100,
            pp: 10
        }
    ],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png'
};
