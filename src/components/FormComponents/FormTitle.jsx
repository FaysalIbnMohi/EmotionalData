import PropTypes from "prop-types";
import { MESSAGE_TYPE } from "../../utils/settings";

function FormTitle({ title, type = MESSAGE_TYPE.SUCCESS }) {
	return (
		<p
			className={`font-semibold text-xl m-4 uppercase ${
				type === MESSAGE_TYPE.ERROR ? "text-error" : "text-greenBg"
			} text-center`}
		>
			{title}
		</p>
	);
}

FormTitle.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
};

export default FormTitle;
