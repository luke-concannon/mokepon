'use server';

import { db } from '@/db';
import { type SelectPokemon, pokemon as pokemonTable } from '@/db/schema';
import { eq } from 'drizzle-orm/expressions';
import { revalidatePath } from 'next/cache';

export const setPokemonLikesAction = async ({
  pokemon,
  action,
}: {
  pokemon: SelectPokemon;
  action: 'increment' | 'decrement';
}) => {
  const { pokedex, likes } = pokemon;
  try {
    const updatedLikes = action === 'increment' ? likes + 1 : likes - 1;

    await db
      .update(pokemonTable)
      .set({ likes: updatedLikes })
      .where(eq(pokemonTable.pokedex, pokedex));

    revalidatePath('/');
    return { success: true };
  } catch (e) {
    console.log('error incrementing likes', e);
    return { success: false };
  }
};
