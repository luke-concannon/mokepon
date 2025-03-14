'use client';

import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { usePokemonStore, usePokemonStoreActions } from '../_store';
import type { PokemonWithLikesAndUserLike } from '@/app/_types';
import Fuse from 'fuse.js';

const fuseOptions = {
  keys: ['name', 'evolvesFrom'],
  threshold: 0.2,
};

export function SearchDialog({
  allPokemon,
}: {
  allPokemon: PokemonWithLikesAndUserLike[];
}) {
  const { openSearch, pokemon } = usePokemonStore();
  const { setOpenSearch, setPokemon } = usePokemonStoreActions();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const searchQuery = searchParams.get('search');
  const { replace } = useRouter();
  const fuse = new Fuse(allPokemon, fuseOptions);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('search', value);
      const searchResults = fuse.search(value);
      setPokemon(searchResults.map(({ item }) => item));
    } else {
      params.delete('search');
      setPokemon(allPokemon);
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Dialog open={openSearch} onOpenChange={setOpenSearch}>
      <DialogContent
        className=''
        onOpenAutoFocus={(e) => e.preventDefault()}
        hideClose
      >
        <DialogHeader>
          <DialogTitle className='sr-only'>Search</DialogTitle>
          <DialogDescription className='sr-only'>
            Search for a pokemon
          </DialogDescription>
          <div className='relative'>
            <Input
              autoFocus
              defaultValue={searchQuery ?? ''}
              onChange={handleSearch}
              placeholder='Search pokemon...'
              className='md:text-xl placeholder:text-xl h-12 font-bold'
            />
            {!!searchQuery?.length && (
              <p className='absolute right-4 transform translate-y-1/2 bottom-1/2 text-pink-400 font-bold text-xs font-sans '>
                {pokemon.length} pokemon
              </p>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
