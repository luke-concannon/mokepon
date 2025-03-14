import type { PokemonWithLikes } from '@/db/schema';

export const checkIfUserLikesPokemon = (
  pokemon: PokemonWithLikes,
  user: { id: string }
) => {
  return pokemon.pokemonLikes.some(
    ({ profileId, pokemonId }) =>
      profileId === user.id && pokemonId === pokemon.pokedex
  );
};
