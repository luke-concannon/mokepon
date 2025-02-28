import { integer, pgTable, text, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { timestamps } from './columns.helpers';

export const typeEnum = pgEnum('type', [
  'grass',
  'poison',
  'fire',
  'flying',
  'water',
  'bug',
  'normal',
  'electric',
  'ground',
  'fairy',
  'fighting',
  'psychic',
  'rock',
  'steel',
  'ice',
  'ghost',
  'dragon',
  'dark',
]);

export const shapeEnum = pgEnum('shape', [
  'quadruped',
  'upright',
  'armor',
  'squiggle',
  'bug-wings',
  'wings',
  'humanoid',
  'legs',
  'blob',
  'heads',
  'tentacles',
  'arms',
  'fish',
  'ball',
  'unspecified',
]);

export const colourEnum = pgEnum('colour', [
  'green',
  'red',
  'blue',
  'white',
  'brown',
  'yellow',
  'purple',
  'pink',
  'gray',
  'black',
]);

export const habitatEnum = pgEnum('habitat', [
  'grassland',
  'mountain',
  'waters-edge',
  'forest',
  'rough-terrain',
  'cave',
  'urban',
  'sea',
  'rare',
  'unknown',
]);

export const profiles = pgTable('profiles', {
  userId: text('user_id').primaryKey(),
  name: text().notNull(),
  jobTitle: text('job_title').notNull(),
  ...timestamps,
});

export const pokemon = pgTable('pokemon', {
  pokedex: integer().primaryKey(),
  name: text().notNull(),
  description: text().notNull(),
  isBaby: boolean('is_baby').notNull(),
  isLegendary: boolean('is_legendary').notNull(),
  isMythical: boolean('is_mythical').notNull(),
  height: integer().notNull(),
  weight: integer().notNull(),
  experience: integer().notNull(),
  hp: integer().notNull(),
  attack: integer().notNull(),
  defense: integer().notNull(),
  specialAttack: integer('special_attack').notNull(),
  specialDefense: integer('special_defense').notNull(),
  speed: integer().notNull(),
  happiness: integer().notNull(),
  colour: colourEnum(),
  habitat: habitatEnum(),
  shape: shapeEnum(),
  type: typeEnum().array(),
  evolvesFrom: text('evolves_from'),
  likes: integer().default(0).notNull(),
  ...timestamps,
});

export type InsertProfile = typeof profiles.$inferInsert;
export type SelectProfile = typeof profiles.$inferSelect;

export type InsertPokemon = typeof pokemon.$inferInsert;
export type SelectPokemon = typeof pokemon.$inferSelect;
