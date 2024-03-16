import { useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { MODAL_BODY_TYPES, QUESTIONS } from '../../utils/settings';
import { useModalSlice } from '../ModalLayout/slice';
import ModalLayout from '../ModalLayout';
import { selectSurvey } from './slice/selectors';
import { Button, Typography } from '@material-tailwind/react';
import FormTitle from '../../components/FormComponents/FormTitle';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

export function Survey() {
  const [playing, setPlaying] = useState(true);
  const dispatch = useDispatch();
  const modalActions = useModalSlice();
  const { surveyData } = useSelector(selectSurvey);
  const keyValueQuestions = QUESTIONS.reduce((obj, item) => {
    obj[item.value] = item.question;
    return obj;
  }, {});

  const handleProgress = (progress) => {
    console.log('onProgress', progress);
    if (progress.playedSeconds >= 21.8 && progress.playedSeconds <= 22.5) {
      setPlaying(false);
      dispatch(
        modalActions.actions.openModal({
          title: "",
          bodyType:
            MODAL_BODY_TYPES.SURVEY_FORM,
          // size: 'xs'
        }),
      );
    }
    if (progress.playedSeconds >= 113.8 && progress.playedSeconds <= 114.5) {
      setPlaying(false);
      dispatch(
        modalActions.actions.openModal({
          title: "",
          bodyType:
            MODAL_BODY_TYPES.SURVEY_FORM,
          // size: 'xs'
        }),
      );
    }
    if (progress.playedSeconds >= 171.8 && progress.playedSeconds <= 172.5) {
      setPlaying(false);
      dispatch(
        modalActions.actions.openModal({
          title: "",
          bodyType:
            MODAL_BODY_TYPES.SURVEY_FORM,
          // size: 'xs'
        }),
      );
    }
    if (progress.playedSeconds >= 419.8 && progress.playedSeconds <= 420.5) {
      setPlaying(false);
      dispatch(
        modalActions.actions.openModal({
          title: "",
          bodyType:
            MODAL_BODY_TYPES.SURVEY_FORM,
          // size: 'xs'
        }),
      );
    }
    if (progress.playedSeconds >= 496.8 && progress.playedSeconds <= 497.5) {
      setPlaying(false);
      dispatch(
        modalActions.actions.openModal({
          title: "",
          bodyType:
            MODAL_BODY_TYPES.SURVEY_FORM,
          // size: 'xs'
        }),
      );
    }
  };

  const addSurveyData = async (e) => {
    e.preventDefault();
    const surveys = Object.keys(keyValueQuestions).map(question => ({
      question: keyValueQuestions[question],
      value: surveyData.map(item => {
        let valueArr = [];
        Object.keys(item).forEach(key => {
          if (key === question) valueArr.push(Number(item[key]) / 10);
        });
        return valueArr;
      }).flat()
    }));
    console.log({ surveys, db });
    try {
      const docRef = await addDoc(collection(db, "surveyData"), {
        survey: { data: JSON.stringify(surveys) },
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className='mt-8 p-16 h-[80vh]'>
      <ReactPlayer
        className='react-player'
        url='https://www.youtube.com/watch?v=y2KVTqwUweQ'
        width='100%'
        height='100%'
        playing={playing}
        controls
        onProgress={handleProgress}
      />
      <ModalLayout />

      <FormTitle title={"Submitted Data"} />
      <div className='p-3'>
        {Object.keys(keyValueQuestions).map(question => (
          <div className='flex items-center' key={question}>
            <Typography>{keyValueQuestions[question]}: {" "}</Typography>
            {surveyData?.map(item =>
              Object.keys(item).map(key => key === question && (
                <div key={key}>
                  {Number(item[key]) / 10}{", "}
                </div>
              )))
            }
          </div>
        ))}
      </div>
      <Button onClick={addSurveyData}>Add to DB</Button>
    </div>
  );
}
