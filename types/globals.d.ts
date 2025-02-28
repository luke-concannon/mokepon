export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
    };
  }
}
interface PokemonType {
  type: string;
  url: string;
}

interface PokemonAbility {
  ability: string;
  url: string;
}

interface Pokemon {
  pokedex: number;
  name: string;
  height: number;
  weight: number;
  experience: number;
  type: PokemonType[];
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  ability: PokemonAbility[];
  evolutionURL: string;
  happiness: number;
  colour: string;
  habitat: string;
  shape: string;
  description: string;
  image: string;
  isBaby: boolean;
  isLegendary: boolean;
  isMythical: boolean;
}
