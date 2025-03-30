import { create } from 'zustand';
import { TokenEvent } from '~/types';

interface EventStore {
  events: TokenEvent[];
  addEvent: (event: TokenEvent) => void;
  clearEvents: () => void;
}

const initialState = {
  events: [],
};

export const useEventStore = create<EventStore>((set) => ({
  ...initialState,
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),
  clearEvents: () => set({ events: [] }),
}));
