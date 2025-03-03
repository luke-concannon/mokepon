// PokemonListWrapper.tsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { PokemonWithLikes } from '@/db/schema';

// Dynamically import the actual list component with SSR disabled
const DynamicPokemonList = dynamic(() => import('./PokemonListClient'), {
  ssr: false,
  loading: () => (
    <div className='w-full h-screen flex items-center justify-center'>
      Loading Pokémon...
    </div>
  ),
});

interface PokemonListWrapperProps {
  pokemonWithLikes: PokemonWithLikes[];
  userId: string;
}

export function PokemonListWrapper({
  pokemonWithLikes,
  userId,
}: PokemonListWrapperProps) {
  return (
    <Suspense
      fallback={
        <div className='w-full h-screen flex items-center justify-center'>
          Loading Pokémon...
        </div>
      }
    >
      <DynamicPokemonList pokemonWithLikes={pokemonWithLikes} userId={userId} />
    </Suspense>
  );
}
