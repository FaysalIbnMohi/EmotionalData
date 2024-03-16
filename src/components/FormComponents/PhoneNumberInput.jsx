/* eslint-disable react/prop-types */
import { Controller } from "react-hook-form";
import ErrorText from "../ErrorText";
import FormLabel from "./FormLabel";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

export default function PhoneNumberInput({
  control,
  inputName,
  labelName,
  defaultValue = "",
  error,
  prefix = null,
  ...props
}) {

  return (
    <Controller
      control={control}
      name={inputName}
      defaultValue={defaultValue}
      render={({ field: { ref, ...field } }) => (
        <div className="form-control w-full">
          {labelName && (
            <FormLabel>
              {labelName}{" "}
              {props.required && (
                <span className="text-red-600">*</span>
              )}
            </FormLabel>
          )}
          <div className="relative">
            {prefix}
            <PhoneInput
              {...field}
              inputExtraProps={{
                ref,
                required: true,
                autoFocus: true
              }}
              country={"us"}
              onlyCountries={["us"]}
              countryCodeEditable={false}
              inputClass="input input-bordered"
            />
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
