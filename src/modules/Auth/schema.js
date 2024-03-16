import * as yup from "yup";

const shape = {
	username: yup.string().required(),
	email: yup.string().email().required(),
};
export const loginSchema = yup.object(shape);
