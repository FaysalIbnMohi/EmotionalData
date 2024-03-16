/* eslint-disable react/prop-types */
import { useState } from "react";
import { Controller } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import ErrorText from "../ErrorText";
import FormLabel from "./FormLabel";

export default function Input({
	control,
	inputName,
	labelName,
	placeholder = "",
	defaultValue = "",
	password = false,
	email = false,
	error,
	customStyle = {},
	callback = () => { },
	prefix = null,
	...props
}) {
	let type = "text";
	if (password) {
		type = "password";
	} else if (email) {
		type = "email";
	} else {
		type = "text";
	}

	const [passwordVisible, setPasswordVisible] = useState();
	return (
		<Controller
			control={control}
			name={inputName}
			defaultValue={defaultValue}
			render={({ field: { onChange, value, name } }) => (
				<div className="form-control">
					{labelName && <FormLabel>
						{labelName}{" "}
						{props.required && (
							<span className="text-red-600">*</span>
						)}
					</FormLabel>
					}
					<div className="relative">
						{prefix}
						{password ? (
							<>
								<input
									value={value}
									onChange={(v) => {
										onChange(v.target.value.trimStart());
										callback();
									}}
									className={`${error?.message ? "input-error" : ""
										} input input-bordered w-full ${prefix ? "pl-8" : "pl-4"
										}`}
									placeholder={placeholder}
									name={name}
									type={passwordVisible ? "text" : "password"}
									autoComplete={"new-password"}
									{...props}
								/>
								{passwordVisible ? (
									<IoEyeOffOutline
										onClick={() =>
											setPasswordVisible(
												(state) => !state
											)
										}
										className="absolute right-3 top-4 cursor-pointer"
									/>
								) : (
									<IoEyeOutline
										onClick={() =>
											setPasswordVisible(
												(state) => !state
											)
										}
										className="absolute right-3 top-4 cursor-pointer"
									/>
								)}
							</>
						) : (
							<input
								value={value}
								onChange={(v) => {
									onChange(v.target.value.trimStart());
									callback();
								}}
								className={`${error?.message ? "input-error" : ""
									} input input-bordered w-full ${prefix ? "pl-8" : "pl-4"
									}`}
								placeholder={placeholder}
								name={name}
								type={type}
								style={customStyle}
								autoComplete={"new-password"}
								{...props}
							/>
						)}
						{error?.message && (
							<ErrorText styleClass="mt-1">
								{error?.message}
							</ErrorText>
						)}
					</div>
				</div>
			)}
		/>
	);
}
