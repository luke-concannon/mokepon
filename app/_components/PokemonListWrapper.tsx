'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { PokemonWithLikes } from '@/db/schema';

const DynamicPokemonList = dynamic(() => import('./PokemonListClient'), {
  ssr: false,
  loading: () => (
    <div className='w-full h-screen flex items-center justify-center'>
      Loading Pokémon...
    </div>
  ),
});

interface PokemonListWrapperProps {
  userId: string;
  allPokemon: PokemonWithLikes[];
}

export function PokemonListWrapper({
  userId,
  allPokemon,
}: PokemonListWrapperProps) {
  return (
    <Suspense
      fallback={
        <div className='w-full h-screen flex items-center justify-center'>
          Loading Pokémon...
        </div>
      }
    >
      <DynamicPokemonList userId={userId} allPokemon={allPokemon} />
    </Suspense>
  );
}
