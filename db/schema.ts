import {
  integer,
  pgTable,
  text,
  boolean,
  pgEnum,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { timestamps } from './columns.helpers';

// ENUMS
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

// TABLES
export const profiles = pgTable('profiles', {
  userId: text().primaryKey(),
  name: text().notNull(),
  jobTitle: text().notNull(),
  ...timestamps,
});

export const pokemon = pgTable('pokemon', {
  pokedex: integer().primaryKey(),
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
  type: typeEnum().array(),
  evolvesFrom: text(),
  ...timestamps,
});

export const pokemonLikes = pgTable(
  'pokemon_likes',
  {
    pokemonId: integer()
      .references(() => pokemon.pokedex)
      .notNull(),
    profileId: text()
      .references(() => profiles.userId)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.pokemonId, table.profileId] })]
);

// RELATIONS
export const profilesRelations = relations(profiles, ({ many }) => ({
  pokemonLikes: many(pokemonLikes),
}));

export const pokemonRelations = relations(pokemon, ({ many }) => ({
  pokemonLikes: many(pokemonLikes),
}));

export const pokemonLikesRelations = relations(pokemonLikes, ({ one }) => ({
  profile: one(profiles, {
    fields: [pokemonLikes.profileId],
    references: [profiles.userId],
  }),
  pokemon: one(pokemon, {
    fields: [pokemonLikes.pokemonId],
    references: [pokemon.pokedex],
  }),
}));

export type InsertProfile = typeof profiles.$inferInsert;
export type SelectProfile = typeof profiles.$inferSelect;

export type InsertPokemon = typeof pokemon.$inferInsert;
export type SelectPokemon = typeof pokemon.$inferSelect;

export type InsertPokemonLikes = typeof pokemonLikes.$inferInsert;
export type SelectPokemonLikes = typeof pokemonLikes.$inferSelect;

export interface PokemonWithLikes extends SelectPokemon {
  pokemonLikes: SelectPokemonLikes[];
}
