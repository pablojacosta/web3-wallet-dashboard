import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TokenEvent } from '~/types';
import { EVENTS_STORAGE_KEY } from '~/utils';

interface EventStore {
  events: TokenEvent[];
  addEvent: (event: TokenEvent) => void;
  clearEvents: () => void;
}

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
      name: EVENTS_STORAGE_KEY,
    },
  ),
);
