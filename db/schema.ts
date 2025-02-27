import {
  integer,
  pgTable,
  serial,
  text,
  uuid,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core';
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
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  age: integer().notNull(),
  email: text().notNull().unique(),
  ...timestamps,
});

export const pokemon = pgTable('pokemon', {
  id: serial().primaryKey(),
  pokedex: integer().notNull().unique(),
  name: text().notNull(),
  description: text().notNull(),
  isBaby: boolean().notNull(),
  isLegendary: boolean().notNull(),
  isMythical: boolean().notNull(),
  height: integer().notNull(),
  weight: integer().notNull(),
  experience: integer().notNull(),
  hp: integer().notNull(),
  attack: integer().notNull(),
  defense: integer().notNull(),
  specialAttack: integer().notNull(),
  specialDefense: integer().notNull(),
  speed: integer().notNull(),
  happiness: integer().notNull(),
  colour: colourEnum(),
  habitat: habitatEnum(),
  shape: shapeEnum(),
  type: typeEnum(),
  ...timestamps,
});

export type InsertProfile = typeof profiles.$inferInsert;
export type SelectProfile = typeof profiles.$inferSelect;

export type InsertPokemon = typeof pokemon.$inferInsert;
export type SelectPokemon = typeof pokemon.$inferSelect;
