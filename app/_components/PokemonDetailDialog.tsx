'use client';

import { pokemonImages } from '@/data/pokemonImages';
import { usePokemonStore } from '../_store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function PokemonDetailDialog() {
  const { focusPokemon } = usePokemonStore();

  if (!focusPokemon) return null;

  const { name, description, pokedex } = focusPokemon;
  const imageKey = name.toLowerCase().replace(' ', '-');
  const pokemonImage = pokemonImages[imageKey as keyof typeof pokemonImages];

  // const userLikesPokemon = singlePokemon.pokemonLikes.some(
  //   ({ profileId, pokemonId }) =>
  //     profileId === userId &&
  //     pokemonId === singlePokemon.pokedex
  // );

  return (
    <Dialog open={!!focusPokemon} onOpenChange={() => !!focusPokemon}>
      <DialogContent
        className=''
        onOpenAutoFocus={(e) => e.preventDefault()}
        hideClose
      >
        <DialogHeader>
          <DialogTitle className='sr-only'>Poopies</DialogTitle>
          <DialogDescription className='sr-only'>
            Search for a pokemon
          </DialogDescription>
          <div className='relative'></div>
        </DialogHeader>
      </DialogContent>
    </Dialog>

    // <Card className='w-64 h-96 shrink-0 relative'>
    //   <CardHeader>
    //     <div className='inline-flex justify-between items-center'>
    //       <CardTitle>{name}</CardTitle>
    //       <div className='text-xs'>#{pokedex}</div>
    //     </div>
    //     <CardDescription className='line-clamp-3'>
    //       {description}
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent className='flex flex-1 justify-center items-start relative'>
    //     {!!pokemonImage && (
    //       <Image
    //         priority
    //         src={pokemonImage}
    //         alt={name}
    //         placeholder='blur'
    //         style={{
    //           objectFit: 'cover',
    //         }}
    //       />
    //     )}
    //   </CardContent>
    //   <CardFooter className='absolute bottom-0 left-0 p-2 w-full flex'>
    //     <LikesButton pokemon={pokemon} userLikesPokemon={userLikesPokemon} />
    //   </CardFooter>
    // </Card>
  );
}
