'use client';

import { useState, useEffect } from 'react';
import { type MouseEvent } from 'react';
import { Search } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { usePokemonStore, usePokemonStoreActions } from '../_store';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';

export function AppSidebar() {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const { openSearch } = usePokemonStore();
  const { setOpenSearch } = usePokemonStoreActions();
  const [searchKeys, setSearchKeys] = useState<['meta', 'k'] | ['ctrl', 'k']>([
    'meta',
    'k',
  ]);

  useKeyboardShortcut(searchKeys, () => {
    setOpenSearch(!openSearch);
  });

  const handleMouseLeave = (e: MouseEvent) => {
    if (e.clientX <= 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const renderShortcut = (keys: string[]) => {
    if (!keys || keys.length === 0) return null;

    return (
      <div className='flex items-center gap-1'>
        {keys.map((key, index) => {
          if (index === 0) {
            return (
              <span key='modifier-and-key' className='flex items-center gap-1'>
                <kbd className='px-1.5 py-0.5 text-xs font-semibold text-muted-foreground bg-muted rounded border border-border'>
                  {isMac ? '⌘' : 'Ctrl'}
                </kbd>
                <span className='text-xs text-muted-foreground'>+</span>
                <kbd className='px-1.5 py-0.5 text-xs font-semibold text-muted-foreground bg-muted rounded border border-border'>
                  {key}
                </kbd>
              </span>
            );
          }
          return null;
        })}
      </div>
    );
  };

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/macintosh|mac os x|macos/.test(userAgent)) {
      setIsMac(true);
      setSearchKeys(['meta', 'k']);
    } else {
      setIsMac(false);
      setSearchKeys(['ctrl', 'k']);
    }
  }, []);

  return (
    <SidebarProvider
      open={open}
      onOpenChange={setOpen}
      className='fixed top-0 left-0 z-50 w-fit'
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Sidebar collapsible='icon' variant='sidebar'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setOpenSearch(true)}
                    className='flex justify-between w-full'
                  >
                    <div className='flex gap-2 items-center'>
                      <Search className='size-4' />
                      <span>Search</span>
                    </div>
                    {renderShortcut(['K'])}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton asChild>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
