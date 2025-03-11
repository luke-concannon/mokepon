'use client';

import { createContext, use, useState } from 'react';
import { createStore, useStore, type StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import type { PokemonWithLikes } from '@/db/schema';

const PokemonStoreContext = createContext<StoreApi<any> | null>(null);

interface PokemonStoreState {
  openSearch: boolean;
  searchQuery: string;
  focusPokemon: PokemonWithLikes | null;
  pokemon: PokemonWithLikes[];
  actions: {
    setOpenSearch: (open: boolean) => void;
    setSearchQuery: (query: string) => void;
    setFocusPokemon: (pokedex: PokemonWithLikes | null) => void;
    setPokemon: (pokemon: PokemonWithLikes[]) => void;
  };
}

interface PokemonStoreProviderProps {
  children: React.ReactNode | null;
  initState: {
    pokemon: PokemonWithLikes[];
  };
}

export const PokemonStore = ({
  children,
  initState,
}: PokemonStoreProviderProps) => {
  const [store] = useState(() =>
    createStore(
      devtools(
        (set) => ({
          ...initState,
          openSearch: false,
          focusPokemon: null,
          searchQuery: '',
          actions: {
            setOpenSearch: (open: boolean) => set({ openSearch: open }),
            setSearchQuery: (query: string) => set({ searchQuery: query }),
            setFocusPokemon: (pokemon: PokemonWithLikes | null) =>
              set({ focusPokemon: pokemon }),
            setPokemon: (pokemon: PokemonWithLikes[]) => set({ pokemon }),
          },
        }),
        { name: 'Store' }
      )
    )
  );

  return (
    <PokemonStoreContext.Provider value={store}>
      {children}
    </PokemonStoreContext.Provider>
  );
};

const usePokemonStoreContext = <T, U>(selector: (state: T) => U): U => {
  const PokemonStoreContextValue = use(PokemonStoreContext);
  if (!PokemonStoreContextValue)
    throw new Error('Missing PokemonStoreContext.Provider in the tree');

  return useStore(PokemonStoreContextValue, selector);
};

export const usePokemonStore = () =>
  usePokemonStoreContext(
    useShallow((state: PokemonStoreState) => {
      const { actions, ...restStore } = state;
      return { ...restStore };
    })
  );

export const usePokemonStoreActions = () =>
  usePokemonStoreContext((state: PokemonStoreState) => state.actions);
