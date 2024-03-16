import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectSlice = (state) => state?.auth || initialState;

export const selectAuth = createSelector(
  [selectSlice],
  state => state,
);
