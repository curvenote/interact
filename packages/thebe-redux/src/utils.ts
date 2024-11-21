import type { PayloadAction } from '@reduxjs/toolkit';

export function activateReducerCase<S extends { [x: string]: any }>(
  state: S,
  action: PayloadAction<{ id: string; active: boolean }>,
) {
  const { id, active } = action.payload;
  if (id in state && state[id].active === active) return state;

  const deactivated = Object.fromEntries(
    Object.entries(state).map(([k, item]) => {
      if (item.active) {
        return [k, { ...item, active: false }];
      }
      return [k, item];
    }),
  );

  return {
    ...deactivated,
    [id]: {
      ...state[id],
      active,
    },
  };
}
