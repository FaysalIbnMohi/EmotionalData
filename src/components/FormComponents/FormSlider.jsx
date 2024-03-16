/* eslint-disable react/prop-types */
import { Slider, Typography } from "@material-tailwind/react";
import { Controller } from "react-hook-form";
import FormLabel from "./FormLabel";

export function FormSlider({
  labelName,
  control,
  inputName,
  defaultValue = 0,
  callback = () => { },
  ...props
}) {
  return (
    <Controller
      control={control}
      name={inputName}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, name } }) => (
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
            <div className="w-full flex gap-3 items-center">
              <Slider
                onChange={(v) => {
                  onChange(v.target.value);
                  callback();
                }}
                value={value}
                name={name}
                step={10}
                defaultValue={0}
                {...props}
              />
              <Typography color="black" className="font-medium">{value / 10}</Typography>
            </div>
          </div>
        </div>
      )}
    />
  );
}