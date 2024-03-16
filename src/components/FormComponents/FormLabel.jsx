import PropTypes from "prop-types";

function FormLabel({ children }) {
	return (
		<div className="label">
			<p className="label-text font-medium mt-2">{children}</p>
		</div>
	);
}

FormLabel.propTypes = {
	children: PropTypes.any,
};

export default FormLabel;
