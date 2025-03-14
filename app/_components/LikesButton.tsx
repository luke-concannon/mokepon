'use client';

import { startTransition } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { likePokemon, unlikePokemon } from '../_actions';
import type { PokemonWithLikesAndUserLike } from '@/app/_types';
import { usePokemonStoreActions } from '../_store';

interface LikesButtonProps {
  pokemon: PokemonWithLikesAndUserLike;
}

export const LikesButton = ({ pokemon }: LikesButtonProps) => {
  const { toggleUserLikesPokemon } = usePokemonStoreActions();

  const togglePokemonLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleUserLikesPokemon(pokemon.pokedex);
    startTransition(async () => {
      if (pokemon.userLikesPokemon) {
        const response = await unlikePokemon(pokemon.pokedex);
        if (!response.success) {
          toggleUserLikesPokemon(pokemon.pokedex);
        }
      } else {
        const response = await likePokemon(pokemon.pokedex);
        if (!response.success) {
          toggleUserLikesPokemon(pokemon.pokedex);
        }
      }
    });
  };

  return (
    <Button
      variant='outline'
      size='sm'
      className={cn(
        pokemon.userLikesPokemon
          ? 'bg-gradient-to-t from-red-200 to-red-100'
          : '',
        'relative min-w-16 cursor-pointer overflow-hidden transition-all duration-300'
      )}
      onClick={togglePokemonLike}
    >
      {pokemon.userLikesPokemon ? (
        <HeartSolid className='h-8 w-8 text-red-500' />
      ) : (
        <HeartIcon className='h-8 w-8 text-red-500' />
      )}
      <span>{pokemon.pokemonLikes.length}</span>
    </Button>
  );
};
