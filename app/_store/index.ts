import { create } from 'zustand';

interface SearchStore {
  openSearch: boolean;
  setOpenSearch: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  openSearch: false,
  searchQuery: '',
  setOpenSearch: (open: boolean) => set({ openSearch: open }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));
