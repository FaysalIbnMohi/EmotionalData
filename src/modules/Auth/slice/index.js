/* eslint-disable no-unused-vars */
import { createSlice } from "../../../utils/@reduxjs/toolkit";
import {
	useInjectReducer,
	useInjectSaga,
} from "../../../utils/redux-injectors";
import { authSaga } from "./saga";

export const initialState = {
	userData: null
};

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setInitialUserData(state, action) {
			state.userData = action.payload;
		},
	},
});

export const { actions: authActions } = slice;

export const useAuthSlice = () => {
	useInjectReducer({ key: slice.name, reducer: slice.reducer });
	useInjectSaga({ key: slice.name, saga: authSaga });
	return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAuthSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
