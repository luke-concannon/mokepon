'use client';

import { useRef, useState, useEffect } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { PokemonCard } from './PokemonCard';
import { usePokemonStore } from '../_store';
import type { PokemonWithLikes } from '@/db/schema';

interface PokemonListClientProps {
  userId: string;
  allPokemon: PokemonWithLikes[];
}

function PokemonListClient({ userId, allPokemon }: PokemonListClientProps) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { pokemon } = usePokemonStore();

  // Card dimensions
  const cardWidth = 256; // w-64 = 16rem = 256px
  const cardHeight = 384; // h-96 = 24rem = 384px
  const horizontalGap = 16; // gap-4 = 1rem = 16px
  const verticalGap = 16; // Same vertical gap as horizontal
  const padding = 40; // p-10 = 2.5rem = 40px
  const sidebarPadding = 56; // Additional pl-[56px] for sidebar
  const totalLeftPadding = padding + sidebarPadding; // Combined left padding

  // Calculate cards per row based on available width
  const getCardsPerRow = () => {
    if (!containerRef.current) return 1;
    // Account for padding on all sides with extra on the left
    const containerWidth =
      containerRef.current.clientWidth - padding - totalLeftPadding - padding;
    return Math.max(
      1,
      Math.floor((containerWidth + horizontalGap) / (cardWidth + horizontalGap))
    );
  };

  const [cardsPerRow, setCardsPerRow] = useState(1); // Start with 1 and update after mount

  // Update cards per row on mount and window resize
  useEffect(() => {
    setCardsPerRow(getCardsPerRow());

    const handleResize = () => {
      setCardsPerRow(getCardsPerRow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total number of rows
  const rowCount = Math.ceil(pokemon.length / cardsPerRow);

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => cardHeight + verticalGap,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  // Maintain scroll position
  useEffect(() => {
    const handleBeforeUnload = () => {
      const scrollPosition = window.scrollY || 0;
      sessionStorage.setItem('scrollPosition', scrollPosition.toString());
    };

    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem('scrollPosition');
      if (savedPosition) {
        const scrollY = parseInt(savedPosition, 10);
        window.scrollTo(0, scrollY);
        virtualizer.scrollToOffset(scrollY); // Sync virtualizer with scroll position
      }
    };

    // Save scroll position before unload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Restore scroll position on mount
    restoreScrollPosition();

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [virtualizer]);

  return (
    <div ref={containerRef} className='w-full p-10 pl-[96px]'>
      {/* pl-[96px] = p-10 (40px) + pl-[56px] = 96px total left padding */}
      <div
        ref={listRef}
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const rowIndex = virtualRow.index;
          const startIndex = rowIndex * cardsPerRow;
          const itemsInRow = Math.min(cardsPerRow, pokemon.length - startIndex);

          // Calculate the width needed for this row's cards
          const rowWidth =
            itemsInRow * cardWidth + (itemsInRow - 1) * horizontalGap;

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
                flexWrap: 'nowrap',
                justifyContent: 'center', // Center the row
                padding: '0',
                marginBottom: `${verticalGap}px`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: `${horizontalGap}px`,
                  width: `${rowWidth}px`, // Set exact width for the row content
                  flexShrink: 0,
                }}
              >
                {Array.from({ length: itemsInRow }).map((_, columnIndex) => {
                  const pokemonIndex = startIndex + columnIndex;
                  const singlePokemon = pokemon[pokemonIndex];
                  const serverPokemon = allPokemon.find(
                    ({ pokedex }) => pokedex === singlePokemon.pokedex
                  );
                  if (!serverPokemon) return null;
                  const userLikesPokemon = serverPokemon.pokemonLikes.some(
                    ({ profileId, pokemonId }) =>
                      profileId === userId &&
                      pokemonId === serverPokemon.pokedex
                  );

                  return (
                    <div
                      key={singlePokemon.pokedex}
                      style={{
                        width: `${cardWidth}px`,
                        flexShrink: 0,
                      }}
                    >
                      <PokemonCard
                        pokemon={serverPokemon}
                        userLikesPokemon={!!userLikesPokemon}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PokemonListClient;
