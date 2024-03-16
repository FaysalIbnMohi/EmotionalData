import {
	Button,
	DialogBody,
	DialogFooter,
	Typography,
} from "@material-tailwind/react";
import FormTitle from "./FormComponents/FormTitle";

/* eslint-disable react/prop-types */
function ConfirmationModalBody({ extraObject, closeModal }) {
	const { message, header, type } = extraObject;

	return (
		<>
			<FormTitle title={header} type={type} />
			<DialogBody divider className="grid place-items-center gap-4">
				<Typography className="text-center font-normal">
					{message}
				</Typography>
			</DialogBody>
			<DialogFooter className="space-x-2">
				<Button variant="text" color="blue-gray" onClick={closeModal}>
					close
				</Button>
				<Button variant="gradient" onClick={closeModal}>
					Ok, Got it
				</Button>
			</DialogFooter>
		</>
	);
}

export default ConfirmationModalBody;
