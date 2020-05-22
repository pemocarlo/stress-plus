import React, {useEffect, useReducer} from "react";
import {useLocation} from "react-router-dom";

import Dialpad from "components/dialpad/dialpad";
import ProgressBar from "components/progressBar/ProgressBar";
import mathGenerator from "services/math-generator";
import "./ArithmeticTest.css";
import Levelbar from "components/levelbar/level-bar";

function setupNewQuestion(state) {
  const finalTime = new Date();
  finalTime.setSeconds(finalTime.getSeconds() + state.seconds);
  const [expression, result] = mathGenerator();

  return {
    expression: expression,
    mathResult: result,
    progressPercentage: 0,
    averageScore: Math.floor(Math.random() * 50 + 25),
    finalTime: finalTime,
  };
}

function mainReducer(state, action) {
  switch (action.type) {
    case "correct":
      return {
        ...state,
        ...setupNewQuestion(state),
        displayResult: "Correct",
        correctAnswers: state.correctAnswers + 1,
        totalAnswers: state.totalAnswers + 1,
        yourScore: Math.floor(
          ((state.correctAnswers + 1) / (state.totalAnswers + 1)) * 100
        ),
      };
    case "incorrect":
      return {
        ...state,
        ...setupNewQuestion(state),
        displayResult: "Incorrect",
        incorrectAnswers: state.incorrectAnswers + 1,
        totalAnswers: state.totalAnswers + 1,
        yourScore: Math.floor(
          (state.correctAnswers / (state.totalAnswers + 1)) * 100
        ),
      };
    case "firstUpdate":
      return {
        ...state,
        ...setupNewQuestion(state),
      };
    case "updateProgressPercentage":
      return {
        ...state,
        progressPercentage:
          100 - ((state.finalTime - new Date()) / (state.seconds * 1000)) * 100,
      };
    default:
      return state;
  }
}

export default function ArithmeticTest() {
  const location = useLocation();
  const initialState = {
    displayResult: "",
    expression: "",
    mathResult: "",
    progressPercentage: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    finalTime: 0,
    seconds: location.state.seconds,
    averageScore: 50,
    yourScore: 0,
  };

  const [state, dispatch] = useReducer(mainReducer, initialState);

  useEffect(() => {
    dispatch({type: "firstUpdate"});
  }, []);

  useEffect(() => {
    if (state.progressPercentage >= 100) {
      dispatch({type: "incorrect"});
      return;
    }
    const renderStepProgressms = 50;
    setTimeout(() => {
      dispatch({type: "updateProgressPercentage"});
    }, renderStepProgressms);
  }, [state.progressPercentage]);

  const onButtonClick = (num) => {
    if (state.mathResult === num) {
      dispatch({type: "correct"});
    } else {
      dispatch({type: "incorrect"});
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
        <div className="results">{state.displayResult}</div>
        <Dialpad className={`dialpad`} callback={(c) => onButtonClick(c)} />
      </div>
    </div>
  );
}
