'use server';

import { db } from '@/db';
import {
  PokemonWithLikes,
  pokemonLikes as pokemonLikesTable,
} from '@/db/schema';
import { eq, and } from 'drizzle-orm/expressions';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import { unauthorized } from 'next/navigation';

export const likePokemon = async (pokedex: PokemonWithLikes['pokedex']) => {
  const { userId } = await auth();
  if (!userId) unauthorized();

  try {
    await db.insert(pokemonLikesTable).values({
      pokemonId: pokedex,
      profileId: userId,
    });
    revalidatePath('/');
    return { success: true };
  } catch (e) {
    console.log('error liking pokemon', e);
    return { success: false };
  }
};

export const unlikePokemon = async (pokedex: PokemonWithLikes['pokedex']) => {
  const { userId } = await auth();
  if (!userId) unauthorized();
  try {
    await db
      .delete(pokemonLikesTable)
      .where(
        and(
          eq(pokemonLikesTable.pokemonId, pokedex),
          eq(pokemonLikesTable.profileId, userId)
        )
      );

    revalidatePath('/');
    return { success: true };
  } catch (e) {
    console.log('error unliking pokemon', e);
    return { success: false };
  }
};
