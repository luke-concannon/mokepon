'use client';

import { pokemonImages } from '@/data/pokemonImages';
import { usePokemonStore, usePokemonStoreActions } from '../_store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { LikesButton } from './LikesButton';

export function PokemonDetailDialog() {
  const { focusPokemon, pokemonDialogIsOpen } = usePokemonStore();
  const { closePokemonDialog, openPokemonDialog } = usePokemonStoreActions();

  const onOpenChange = (open: boolean) => {
    if (!open) {
      closePokemonDialog();
    } else if (focusPokemon) {
      openPokemonDialog(focusPokemon);
    }
  };

  if (!focusPokemon || !pokemonDialogIsOpen) return null;

  const { name, description, pokedex } = focusPokemon;
  const imageKey = name.toLowerCase().replace(' ', '-');
  const pokemonImage = pokemonImages[imageKey as keyof typeof pokemonImages];

  return (
    <Dialog open={pokemonDialogIsOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className=''
        onOpenAutoFocus={(e) => e.preventDefault()}
        hideClose
      >
        <DialogHeader className='flex gap-2 w-full justify-between flex-row'>
          <span className='flex flex-row gap-2 items-center'>
            <DialogDescription className='text-2xl'>
              #{pokedex}
            </DialogDescription>
            <DialogTitle className='text-2xl'>{name}</DialogTitle>
          </span>
          <LikesButton pokemon={focusPokemon} />
        </DialogHeader>

        <p>{description}</p>
        <div className='relative'>
          <Image
            src={pokemonImage}
            alt={name}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
