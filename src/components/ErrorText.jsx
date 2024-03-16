/* eslint-disable react/prop-types */
function ErrorText({ styleClass, children }) {
	return (
		<span className={`text-center  text-error ${styleClass}`}>
			{children}
		</span>
	);
}

export default ErrorText;
