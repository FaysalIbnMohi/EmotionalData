/**
 *
 * Auth
 *
 */
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useAuthSlice } from "./slice";
import { Input } from "../../components/FormComponents";
import { MdOutlineEmail, MdOutlineVerifiedUser, MdNumbers } from "react-icons/md";
import { loginSchema } from "./schema";
import _ from "lodash";

function Auth() {
	const { actions } = useAuthSlice();
	const { handleSubmit, control, formState } = useForm({
		mode: "onSubmit",
		resolver: yupResolver(loginSchema),
	});

	const { errors } = formState;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = (data) => {
		dispatch(actions.setInitialUserData(data));
		navigate("/survey");
	};

	return (
		<div className="h-screen bg-base-200 flex items-center">
			<div className="mx-auto w-full shadow-xl h-full">
				<div className="bg-base-100 flex h-full w-full">
					<div className="shrink-0 w-full max-w-lg shadow-2xl py-24 px-10">
						<h2 className="text-4xl font-semibold mb-2 text-center">
							Getting Started
						</h2>
						<form onSubmit={handleSubmit(handleLogin)}>
							<Input
								inputName="username"
								labelName={"Name"}
								placeholder="Enter Your Name"
								control={control}
								error={_.get(errors, "username")}
								prefix={
									<MdOutlineVerifiedUser
										className="absolute top-4 left-2"
										size={18}
									/>
								}
							/>
							<Input
								inputName="email"
								labelName={"Email"}
								placeholder="Enter Your Email"
								control={control}
								error={_.get(errors, "email")}
								email
								prefix={
									<MdOutlineEmail
										className="absolute top-4 left-2"
										size={18}
									/>
								}
							/>
							<Input
								labelName="Age"
								inputName={"age"}
								placeholder="Enter Age"
								control={control}
								error={_.get(errors, "age")}
								prefix={
									<MdNumbers
										className="absolute top-4 left-2"
										size={18}
									/>
								}
							/>
							<div className="form-control mt-6">
								<button
									className="btn btn-primary"
									type="submit"
								>
									Next
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}
export default memo(Auth);
