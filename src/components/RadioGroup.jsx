import PropTypes from "prop-types";

function RadioGroup({ handleChange, options, selectedValue }) {
	return (
		<fieldset className="flex gap-2 pt-2">
			{options.map((item, index) => (
				<div
					className={`flex w-full rounded-lg p-4 items-center gap-2 border ${
						selectedValue === item.value &&
						"border-green-700 bg-base-200"
					} h-12`}
					key={index}
				>
					<div className="flex items-center gap-2">
						<h2 className="text-3xl">
							<input
								type="radio"
								name={item.name}
								value={item.value}
								id={item.value}
								className="radio checked:bg-green-700"
								onChange={(e) => handleChange(e)}
								defaultChecked={item.isDefault}
							/>
						</h2>
						<label
							className={`pl-2 cursor-pointer ${
								selectedValue === item.value
									? " text-green-700 font-semibold"
									: " text-slate-500  "
							} peer-disabled:cursor-not-allowed peer-disabled:text-slate-400`}
							htmlFor={item.value}
						>
							{item.label}
						</label>
					</div>
				</div>
			))}
		</fieldset>
	);
}

RadioGroup.propTypes = {
	handleChange: PropTypes.func,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			value: PropTypes.any,
			isDefault: PropTypes.bool,
		})
	).isRequired,
	selectedValue: PropTypes.any,
};

export default RadioGroup;
