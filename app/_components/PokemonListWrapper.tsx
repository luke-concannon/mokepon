'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicPokemonList = dynamic(() => import('./PokemonListClient'), {
  ssr: false,
  loading: () => (
    <div className='w-full h-screen flex items-center justify-center'>
      Loading Pokémon...
    </div>
  ),
});

export function PokemonListWrapper() {
  return (
    <Suspense
      fallback={
        <div className='w-full h-screen flex items-center justify-center'>
          Loading Pokémon...
        </div>
      }
    >
      <DynamicPokemonList />
    </Suspense>
  );
}
