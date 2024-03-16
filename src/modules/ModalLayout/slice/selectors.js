import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectSlice = (state) => state?.modal || initialState;

export const selectModal = createSelector(
  [selectSlice],
  state => state,
);
