// import qs from "qs";
import React, {useEffect, useReducer, useRef} from "react";
// import {useHistory} from "react-router-dom";
// import {useLocation, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

import Dialpad from "components/dialpad/dialpad";
import ProgressBar from "components/progress-bar/progress-bar";
import Levelbar from "components/level-bar/level-bar";
import {mainReducer, getInitialState, RESULT_CORRECT, RESULT_WRONG, RESULT_TIMEOUT} from "./logic";
import "./arithmetic-test.scss";

function displayResult(result, t) {
  switch (result) {
    case RESULT_CORRECT:
      return t("arithmeticTest.correct");
    case RESULT_WRONG:
      return t("arithmeticTest.wrong");
    case RESULT_TIMEOUT:
      return t("arithmeticTest.timeout");
    default:
      return "";
  }
}

export default function ArithmeticTest(props) {
  // const location = useLocation();
  // const history = useHistory();
  const {t} = useTranslation();

  // const settings = qs.parse(location.search, {allowDots: true, ignoreQueryPrefix: true});

  const [state, dispatch] = useReducer(mainReducer, getInitialState(props.settings));
  const soundCorrectAnswer = useRef(null);
  const soundWrongAnswer = useRef(null);
  const soundBackground = useRef(null);

  //if componnet is loaded start the test by showing the first question
  useEffect(() => {
    dispatch({type: "newQuestion"});
  }, []);

  // Pushes end of test page when time is over
  useEffect(() => {
    const id = setTimeout(() => {
      // history.push("/end");
      props.onFinished();
    }, state.testTotalTime * 1000);
    return () => clearTimeout(id);
  }, [state.testTotalTime, props]);

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
  }, [state.waitTime, state.waiting]);

  //This effect controls the sounds
  useEffect(() => {
    if (state.enableSound) {
      if (!state.isControl) {
        if (state.waiting) {
          soundBackground.current.pause();
          soundBackground.current.currentTime = 0;
          switch (state.result) {
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
      } else {
        if (state.waiting) {
          switch (state.result) {
            case RESULT_CORRECT:
              soundCorrectAnswer.current.play();
              break;
            case RESULT_WRONG:
            case RESULT_TIMEOUT:
              soundWrongAnswer.current.play();
              break;
            default:
          }
        }
      }
    }
  }, [state.enableSound, state.waiting, state.result, state.isControl]);

  const onButtonClick = (num) => {
    dispatch({type: "userInput", input: num});
  };

  return (
    <div className="StressApp">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="stressBar">
              {!state.isControl && <Levelbar average_score={state.averageScore} your_score={state.yourScore} />}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="display arithmetic">{state.expression}</div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 ">
            <div className="progressBar">
              {!state.isControl && <ProgressBar percentage={state.progressPercentage} />}
            </div>
          </div>
        </div>

        <div className="lower-part">
          <div className="col-6">
            <div>
              <div className="results">{displayResult(state.result, t)}</div>
              <div className="recorded">
                <div className="recorded-text">{t("recorded")}</div>
                <div className="rounded-circle"></div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="dial">
              <Dialpad className={`dialpad`} callback={(c) => onButtonClick(c)} />
            </div>
          </div>
        </div>

        <audio ref={soundCorrectAnswer} src="/sound/correct_answer_sound.wav" />
        <audio ref={soundWrongAnswer} src="/sound/wrong_answer_sound.wav" />
        {!state.isControl && <audio ref={soundBackground} src="/sound/time_lapsing_sound.wav" />}
      </div>
    </div>
  );
}
