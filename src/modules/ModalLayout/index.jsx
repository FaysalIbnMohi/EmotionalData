import { useSelector, useDispatch } from "react-redux";
import { MODAL_BODY_TYPES } from "../../utils/settings";
import { selectModal } from "./slice/selectors";
import { useModalSlice } from "./slice";
import { Card, Dialog } from "@material-tailwind/react";
import { SurveyForm } from "../../components/SurveyForm";

function ModalLayout() {
	const { isOpen, bodyType, size, extraObject } = useSelector(selectModal);
	const { actions } = useModalSlice();
	const dispatch = useDispatch();

	const handleCloseModal = (e) => {
		if (extraObject?.isRedirect) {
			window.location.href = "/";
		}
		else {
			dispatch(actions.closeModal(e));
			dispatch(actions.setModalLoading(true));
		}
	};
	console.log({ size });
	return (
		<Dialog
			size={size}
			open={isOpen}
			handler={handleCloseModal}
			className="bg-transparent shadow-none overflow-y-auto"
		>
			<Card className="mx-auto w-full overflow-y-auto h-[95vh]">
				<button
					className="btn btn-sm btn-circle absolute right-2 top-2"
					onClick={handleCloseModal}
				>
					✕
				</button>
				{/* Loading modal body according to different modal type */}
				{
					{
						[MODAL_BODY_TYPES.SURVEY_FORM]: (
							<SurveyForm
								closeModal={handleCloseModal}
								extraObject={extraObject}
							/>
						),
					}[bodyType]
				}
			</Card>
		</Dialog>
	);
}

export default ModalLayout;
