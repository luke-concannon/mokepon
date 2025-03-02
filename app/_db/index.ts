import { db } from '@/db';

export const getPokemon = async () => {
  return await db.query.pokemon.findMany({
    with: {
      pokemonLikes: true,
    },
    limit: 30,
    orderBy: (pokemon, { asc }) => [asc(pokemon.pokedex)],
  });
};
