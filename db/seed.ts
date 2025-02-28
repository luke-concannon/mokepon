import { db } from '@/db';
import { pokemon as pokemonRaw } from '@/data/pokemon.json';
import { reset } from 'drizzle-seed';
import { pokemon as pokemonTable, type InsertPokemon } from './schema';
import * as schema from './schema';

const pokemonSeed = pokemonRaw.map((pokemon: Pokemon) => {
  const {
    type,
    ability,
    evolutionURL,
    image,
    colour,
    shape,
    habitat,
    ...restPokemon
  } = pokemon;
  const pokemonDb: InsertPokemon = {
    ...restPokemon,
    type: type.map(({ type }) => type) as InsertPokemon['type'],
    colour: colour as InsertPokemon['colour'],
    habitat: habitat as InsertPokemon['habitat'],
    shape: shape as InsertPokemon['shape'],
  };
  return pokemonDb;
});

const main = async () => {
  await reset(db, schema);
  console.log('reset!');
  try {
    await db.insert(pokemonTable).values(pokemonSeed);
    console.log('seeded pokemon...', pokemonSeed);
  } catch (e) {
    console.log('error seeding pokemon', e);
  }
};

main();
