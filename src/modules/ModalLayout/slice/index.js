/* eslint-disable no-unused-vars */
import { createSlice } from "../../../utils/@reduxjs/toolkit";
import { useInjectReducer } from "../../../utils/redux-injectors";

export const initialState = {
	title: "", // current  title state management
	isOpen: false, // modal state management for opening closing
	bodyType: "", // modal content management
	size: "md", // modal content management
	extraObject: {},
	modalLoading: false,
};

const slice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, action) => {
			console.log(action);
			const { title, bodyType, extraObject, size } = action.payload;
			state.isOpen = true;
			state.bodyType = bodyType;
			state.title = title;
			state.size = size || "md";
			state.extraObject = extraObject;
		},
		closeModal: (state, action) => {
			state.isOpen = false;
			state.bodyType = "";
			state.title = "";
			state.extraObject = {};
			state.modalLoading = false;
		},
		setModalLoading: (state, action) => {
			state.modalLoading = action.payload;
		},
	},
});

export const { actions } = slice;

export const useModalSlice = () => {
	useInjectReducer({ key: slice.name, reducer: slice.reducer });
	return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useModalSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
