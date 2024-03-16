import { createSelector } from '@reduxjs/toolkit';
import { initialState } from '.';

const selectSlice = (state) => state?.survey || initialState;

export const selectSurvey = createSelector(
  [selectSlice],
  state => state,
);
