'use client';

import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useSearchStore } from '../_store';

export function SearchDialog() {
  const { openSearch, setOpenSearch, searchQuery, setSearchQuery } =
    useSearchStore();

  return (
    <Dialog open={openSearch} onOpenChange={setOpenSearch}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} hideClose>
        <DialogHeader>
          <DialogTitle className='sr-only'>Search</DialogTitle>
          <DialogDescription className='sr-only'>
            Search for a pokemon
          </DialogDescription>
          <Input
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search pokemon...'
            className='md:text-xl placeholder:text-xl h-12 font-bold'
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
