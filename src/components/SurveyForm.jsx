/* eslint-disable react/prop-types */
import {
  Button,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import FormTitle from "./FormComponents/FormTitle";
import { FormSlider } from "./FormComponents/FormSlider";
import { useDispatch, useSelector } from "react-redux";
import { useSurveySlice } from "../modules/Survey/slice";
import { selectSurvey } from "../modules/Survey/slice/selectors";
import { QUESTIONS } from "../utils/settings";



export function SurveyForm({ closeModal }) {
  const { handleSubmit, control } = useForm({
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const { actions } = useSurveySlice();
  const { surveyData } = useSelector(selectSurvey);
  const onSubmit = (data) => {
    closeModal();
    dispatch(actions.setSurveyData([...surveyData, data]));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardBody className="flex flex-col">
        <FormTitle title={"What were your thoughts?"} />
        <Typography
          className="mb-3 font-normal"
          variant="paragraph"
          color="gray"
        >
          Please click on the slider to indicate how well the following statement describe your thoughts that occurred immediately before the probe:(0,10)
        </Typography>
        {QUESTIONS.map(item => (
          <FormSlider
            control={control}
            inputName={item.value}
            labelName={item.question}
            key={item.value}
          />
        ))}

      </CardBody>
      <CardFooter className="pt-0 gap-1 flex justify-center">
        <Button
          type="submit"
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 bg-greenBg w-1/2"
          fullWidth
        >
          Submit
        </Button>
      </CardFooter>
    </form>
  );
}
