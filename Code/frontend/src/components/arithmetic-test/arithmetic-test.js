import React, {useEffect, useReducer, useRef} from "react";
import {useLocation} from "react-router-dom";

import Dialpad from "components/dialpad/dialpad";
import ProgressBar from "components/progress-bar/progress-bar";
import Levelbar from "components/level-bar/level-bar";
import {mainReducer, getInitialState, RESULT_CORRECT, RESULT_WRONG, RESULT_TIMEOUT} from "./logic";
import "./arithmetic-test.css";

function displayResult(result) {
  switch(result) {
    case RESULT_CORRECT:
      return "Correct";
    case RESULT_WRONG:
      return "Incorrect";
    case RESULT_TIMEOUT:
      return "Timeout";
    default:
      return "";
  }
}

export default function ArithmeticTest() {
  const location = useLocation();

  const [state, dispatch] = useReducer(mainReducer, getInitialState(location.state));
  const soundCorrectAnswer = useRef(null);
  const soundWrongAnswer = useRef(null);
  const soundBackground = useRef(null);

  //if componnet is loaded start the test by showing the first question
  useEffect(() => {
    dispatch({type: "newQuestion"});
  }, []);

  //Handles the periodic update for the progress bar and fires the timeout action
  useEffect(() => {
    if (state.waiting) {
      return;
    }
    if (state.progressPercentage >= 100) {
      dispatch({type: "timeout"});
      return;
    }
    const renderStepProgressms = 50;
    const id = setTimeout(() => {
      dispatch({type: "updateProgressPercentage"});
    }, renderStepProgressms);
    return () => clearTimeout(id);
  }, [state.progressPercentage, state.waiting]);

  //Handles the waiting between two math questions
  useEffect(() => {
    if (!state.waiting) {
      return;
    }
    const id = setTimeout(() => {
      dispatch({type: "newQuestion"});
    }, state.waitTime * 1000);
    return () => clearTimeout(id);
  }, [state.waitTime, state.waiting])

  //This effect controls the sounds
  useEffect(() => {
    if (state.enableSound) {
      if (state.waiting) {
        soundBackground.current.pause();
        soundBackground.current.currentTime = 0;
        switch(state.result) {
          case RESULT_CORRECT:
            soundCorrectAnswer.current.play();
            break;
          case RESULT_WRONG:
          case RESULT_TIMEOUT:
            soundWrongAnswer.current.play();
            break;
          default:
        }
      } else {
        soundBackground.current.play();
      }
    }
  }, [state.enableSound, state.waiting, state.result]);

  const onButtonClick = (num) => {
    if (!state.waiting) {
      dispatch({type: "userInput", input: num});
    }
  };

  return (
    <div className="StressApp">
      <div className="stressBar">
        <Levelbar
          average_score={state.averageScore}
          your_score={state.yourScore}
        />
      </div>
      <div className="display arithmetic">{state.expression}</div>
      <ProgressBar percentage={state.progressPercentage} />
      <div className="lower-part">
        <div className="results">{displayResult(state.result)}</div>
        <Dialpad className={`dialpad`} callback={(c) => onButtonClick(c)} />
      </div>
      <audio ref={soundCorrectAnswer} src='/sound/correct_answer_sound.wav' />
      <audio ref={soundWrongAnswer} src='/sound/wrong_answer_sound.wav' />
      <audio ref={soundBackground} src='/sound/time_lapsing_sound.wav' />
    </div>
  );
}
