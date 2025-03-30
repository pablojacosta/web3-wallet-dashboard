import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TokenEvent } from '~/types';

interface EventStore {
  events: TokenEvent[];
  addEvent: (event: TokenEvent) => void;
  clearEvents: () => void;
}

const STORAGE_KEY = 'transaction-events-storage';

export const useEventStore = create<EventStore>()(
  persist(
    (set) => ({
      events: [],
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, event],
        })),
      clearEvents: () => set({ events: [] }),
    }),
    {
      name: STORAGE_KEY,
    },
  ),
);
