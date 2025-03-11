'use client';

import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { usePokemonStore, usePokemonStoreActions } from '../_store';
import type { PokemonWithLikes } from '@/db/schema';
import Fuse from 'fuse.js';
import { use, useEffect } from 'react';

const fuseOptions = {
  keys: ['name', 'evolvesFrom'],
  threshold: 0.2,
};

export function SearchDialog({
  allPokemon,
}: {
  allPokemon: PokemonWithLikes[];
}) {
  const { openSearch, searchQuery, pokemon } = usePokemonStore();
  const { setOpenSearch, setSearchQuery, setPokemon } =
    usePokemonStoreActions();

  const fuse = new Fuse(allPokemon, fuseOptions);

  const filterPokemon = (query: string) => {
    if (query.length === 0) {
      setPokemon(allPokemon);
    } else {
      const searchResults = fuse.search(query);
      setPokemon(searchResults.map(({ item }) => item));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterPokemon(query);
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
              value={searchQuery}
              onChange={handleSearch}
              placeholder='Search pokemon...'
              className='md:text-xl placeholder:text-xl h-12 font-bold'
            />
            {searchQuery.length > 0 && (
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
