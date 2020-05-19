import React, {useState, useEffect, useCallback} from "react";

import Dialpad from "components/dialpad/dialpad";
import ProgressBar from "components/progressBar/ProgressBar";
import mathGenerator from "services/math-generator";
import "./ArithmeticTest.css";
import Levelbar from "components/levelbar/level-bar";

export default function ArithmeticTest(props) {
  const [displayResult, setDisplayResult] = useState('');
  const [expression, setExpression] = useState();
  const [mathResult, setMathResult] = useState();
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [averageScore, setAverageScore] = useState(50);
  const [yourScore, setYourScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);

  const {seconds} = props;

  const renderStepms = 50;
  const percentageStep = renderStepms / (10.0 * seconds);

  const onCorrectAnswer = () => {
    setDisplayResult('correct');
    setTotalAnswers(answers => answers + 1);
    setCorrectAnswers(answers => answers + 1);
    displayNewMath();
  }

  //We need to use useCallback here, because onIncorrectAnswer is called from inside useEffect after the time is up
  const onIncorrectAnswer = useCallback(() => {
    setDisplayResult('incorrect');
    setTotalAnswers(answers => answers + 1);
    displayNewMath();
  }, [])

  useEffect(() => {
    if (progressPercentage >= 100) {
      onIncorrectAnswer();
      return;
    }
    const id = setInterval(
      () => setProgressPercentage((prevPercentage) => prevPercentage + percentageStep),
      renderStepms
    );
    return () => clearInterval(id);
  }, [progressPercentage, percentageStep, onIncorrectAnswer]);

  const displayNewMath = () => {
    const [expression, result] = mathGenerator();
    setExpression(expression);
    setMathResult(result);

    setProgressPercentage(0);
  }

  useEffect(() => {
    if (totalAnswers !== 0) {
      setYourScore(Math.floor(correctAnswers / totalAnswers * 100))
      setAverageScore(Math.floor(Math.random() * 50 + 25));
    }
  }, [correctAnswers, totalAnswers]);

  useEffect(() => {
    displayNewMath();
  }, []);

  const onButtonClick = (num) => {
    if (mathResult === num) {
      onCorrectAnswer();
    } else{
      onIncorrectAnswer();
    }
  }

  return (
    <div className="StressApp">
      <div className="stressBar">
        <Levelbar average_score={averageScore} your_score={yourScore} />
      </div>
      <div className="display arithmetic">{expression}</div>
      <ProgressBar percentage={progressPercentage} />
      <div className="lower-part">
        <div className="results">{displayResult}</div>
        <Dialpad className={`dialpad`} callback={(c) => onButtonClick(c)} />
      </div>
    </div>
  );
}

