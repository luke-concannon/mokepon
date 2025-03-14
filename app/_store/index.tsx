'use client';

import { createContext, use, useState } from 'react';
import { createStore, useStore, type StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import type { PokemonWithLikesAndUserLike } from '@/app/_types';

const PokemonStoreContext = createContext<StoreApi<any> | null>(null);

interface PokemonStoreState {
  openSearch: boolean;
  focusPokemon: PokemonWithLikesAndUserLike | null;
  pokemonDialogIsOpen: boolean;
  pokemon: PokemonWithLikesAndUserLike[];
  actions: {
    setOpenSearch: (open: boolean) => void;
    setPokemon: (pokemon: PokemonWithLikesAndUserLike[]) => void;
    openPokemonDialog: (pokemon: PokemonWithLikesAndUserLike) => void;
    closePokemonDialog: () => void;
  };
}

interface PokemonStoreProviderProps {
  children: React.ReactNode | null;
  initState: {
    pokemon: PokemonWithLikesAndUserLike[];
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
          actions: {
            setOpenSearch: (open: boolean) => set({ openSearch: open }),
            openPokemonDialog: (pokemon: PokemonWithLikesAndUserLike) =>
              set({ focusPokemon: pokemon, pokemonDialogIsOpen: true }),
            closePokemonDialog: () =>
              set({ pokemonDialogIsOpen: false, focusPokemon: null }),
            setPokemon: (pokemon: PokemonWithLikesAndUserLike[]) =>
              set({ pokemon }),
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
