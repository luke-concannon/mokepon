'use client';

import { startTransition, useOptimistic } from 'react';
import { Button } from '@/components/ui/button';
import { HeartIcon } from '@heroicons/react/24/solid';
import { SelectPokemon } from '../db/schema';
import { setPokemonLikesAction } from './_actions';

export function LikesButton({ pokemon }: { pokemon: SelectPokemon }) {
  const { likes } = pokemon;
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes,
    (state, optimisticAction: { action: 'increment' | 'decrement' }) => {
      const { action } = optimisticAction;
      if (action === 'increment') {
        return state + 1;
      }
      if (action === 'decrement') {
        return state - 1;
      }
      return state;
    }
  );

  const incrementLikes = () => {
    startTransition(async () => {
      setOptimisticLikes({ action: 'increment' });
      await setPokemonLikesAction({
        pokemon,
        action: 'increment',
      });
    });
  };

  return (
    <Button
      onClick={incrementLikes}
      variant='outline'
      className='group cursor-pointer  p-0 w-full'
    >
      <HeartIcon className='w-10 group-hover:scale-110 transition-all group-active:animate-ping h-10 shrink-0 text-red-600' />
      {optimisticLikes}
    </Button>
  );
}
