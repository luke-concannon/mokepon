'use client';

import { useOptimistic, startTransition, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PokemonWithLikes } from '@/db/schema';
import { likePokemon, unlikePokemon } from '../_actions';

interface LikesButtonProps {
  pokemon: PokemonWithLikes;
  userLikesPokemon: boolean;
}

export const LikesButton = ({
  pokemon,
  userLikesPokemon,
}: LikesButtonProps) => {
  const { pokedex, pokemonLikes } = pokemon;
  const [
    {
      userLikesPokemon: optimisticUserLikesPokemon,
      totalLikes: optimisticTotalLikes,
    },
    toggleOptimisticPokemonLike,
  ] = useOptimistic(
    {
      userLikesPokemon,
      totalLikes: pokemonLikes.length,
    },
    (currentState, newOptimisticPokemonLike: boolean) => {
      const newTotalLikes = newOptimisticPokemonLike
        ? currentState.totalLikes + 1
        : currentState.totalLikes - 1;
      return {
        userLikesPokemon: newOptimisticPokemonLike,
        totalLikes: newTotalLikes,
      };
    }
  );

  const togglePokemonLike = () => {
    startTransition(async () => {
      toggleOptimisticPokemonLike(!optimisticUserLikesPokemon);
      if (optimisticUserLikesPokemon) {
        await unlikePokemon(pokedex);
      } else {
        await likePokemon(pokedex);
      }
    });
  };

  return (
    <Button
      variant='outline'
      size='sm'
      className={cn(
        optimisticUserLikesPokemon
          ? 'bg-gradient-to-t from-red-200 to-red-100'
          : '',
        'relative cursor-pointer overflow-hidden transition-all duration-300'
      )}
      onClick={togglePokemonLike}
    >
      {optimisticUserLikesPokemon ? (
        <HeartSolid className='h-8 w-8 text-red-500' />
      ) : (
        <HeartIcon className='h-8 w-8 text-red-500' />
      )}
      <span>{optimisticTotalLikes}</span>
    </Button>
  );
};
