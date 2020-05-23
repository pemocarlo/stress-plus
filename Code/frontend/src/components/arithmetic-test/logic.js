import mathGenerator from "services/math-generator";

export const RESULT_NONE = 0;
export const RESULT_CORRECT = 1;
export const RESULT_WRONG = 2;
export const RESULT_TIMEOUT = 3;

export function getInitialState(settings) {
  return {
    result: RESULT_NONE,
    expression: "",
    mathResult: "",
    progressPercentage: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    finalTime: 0,
    seconds: settings.answerTimeout,
    waitTime: settings.waitTime,
    averageScore: 50,
    yourScore: 0,
    waiting: true,
  };
}

export function mainReducer(state, action) {
  switch (action.type) {
    case "userInput":
      if (state.mathResult === action.input) {
        return {
          ...state,
          waiting: true,
          result: RESULT_CORRECT,
          correctAnswers: state.correctAnswers + 1,
          totalAnswers: state.totalAnswers + 1,
          yourScore: Math.floor(
            ((state.correctAnswers + 1) / (state.totalAnswers + 1)) * 100
          ),
        };
      } else {
        return {
          ...state,
          waiting: true,
          result: RESULT_WRONG,
          incorrectAnswers: state.incorrectAnswers + 1,
          totalAnswers: state.totalAnswers + 1,
          yourScore: Math.floor(
            (state.correctAnswers / (state.totalAnswers + 1)) * 100
          ),
        };
      }
    case "timeout": {
      return {
        ...state,
        waiting: true,
        result: RESULT_TIMEOUT,
        incorrectAnswers: state.incorrectAnswers + 1,
        totalAnswers: state.totalAnswers + 1,
        yourScore: Math.floor(
          (state.correctAnswers / (state.totalAnswers + 1)) * 100
        ),
      };
    }
    case "newQuestion":
      const finalTime = new Date();
      finalTime.setSeconds(finalTime.getSeconds() + state.seconds);
      const [expression, result] = mathGenerator();
  
      return {
        ...state,
        waiting: false,
        expression: expression,
        mathResult: result,
        progressPercentage: 0,
        averageScore: Math.floor(Math.random() * 50 + 25),
        finalTime: finalTime,
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
