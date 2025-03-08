import { useEffect } from 'react';

export function useKeyboardShortcut(keys: string[], callback: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const pressedKeys = new Set<string>();

      if (event.metaKey) pressedKeys.add('meta');
      if (event.ctrlKey) pressedKeys.add('ctrl');
      if (event.shiftKey) pressedKeys.add('shift');
      if (event.altKey) pressedKeys.add('alt');
      pressedKeys.add(event.key.toLowerCase());

      const allKeysPressed = keys.every((key) => pressedKeys.has(key));

      if (allKeysPressed) {
        event.preventDefault();
        callback();
      }
    };

    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [keys, callback]);
}
