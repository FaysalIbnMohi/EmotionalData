import { createSlice } from '../../../utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from '../../../utils/redux-injectors';
import { surveySaga } from './saga';

export const initialState = {
  surveyData: []
};

const slice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setSurveyData(state, action) {
      state.surveyData = action.payload;
    },
  },
});

export const { actions } = slice;

export const useSurveySlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: surveySaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useSurveySlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */