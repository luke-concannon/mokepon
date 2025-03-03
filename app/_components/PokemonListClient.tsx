// PokemonListClient.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { PokemonCard } from './PokemonCard';
import type { PokemonWithLikes } from '@/db/schema';

interface PokemonListClientProps {
  pokemonWithLikes: PokemonWithLikes[];
  userId: string;
}

function PokemonListClient({
  pokemonWithLikes,
  userId,
}: PokemonListClientProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  // Card dimensions
  const cardWidth = 256; // w-64 = 16rem = 256px
  const cardHeight = 384; // h-96 = 24rem = 384px
  const horizontalGap = 16; // gap-4 = 1rem = 16px
  const verticalGap = 16; // Same vertical gap as horizontal

  // Calculate cards per row based on available width
  const getCardsPerRow = () => {
    return Math.max(
      1,
      Math.floor(window.innerWidth / (cardWidth + horizontalGap))
    );
  };

  const [cardsPerRow, setCardsPerRow] = useState(getCardsPerRow());

  // Update cards per row on window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsPerRow(getCardsPerRow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total number of rows
  const rowCount = Math.ceil(pokemonWithLikes.length / cardsPerRow);

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => cardHeight + verticalGap,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  return (
    <div ref={listRef} className='w-full'>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const rowIndex = virtualRow.index;
          const startIndex = rowIndex * cardsPerRow;

          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${cardHeight}px`,
                transform: `translateY(${
                  virtualRow.start - virtualizer.options.scrollMargin
                }px)`,
                display: 'flex',
                justifyContent: 'center',
                gap: `${horizontalGap}px`,
                padding: '0',
                marginBottom: `${verticalGap}px`,
              }}
            >
              {Array.from({ length: cardsPerRow }).map((_, columnIndex) => {
                const pokemonIndex = startIndex + columnIndex;

                if (pokemonIndex >= pokemonWithLikes.length) {
                  return <div key={columnIndex} style={{ width: cardWidth }} />;
                }

                const pokemon = pokemonWithLikes[pokemonIndex];
                const userLikesPokemon = pokemon.pokemonLikes.some(
                  ({ profileId, pokemonId }) =>
                    profileId === userId && pokemonId === pokemon.pokedex
                );

                return (
                  <PokemonCard
                    key={pokemon.pokedex}
                    pokemon={pokemon}
                    userLikesPokemon={userLikesPokemon}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PokemonListClient;
