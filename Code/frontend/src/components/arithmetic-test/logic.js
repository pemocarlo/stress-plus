import mathGenerator from "services/math-generator";

export const RESULT_NONE = 0;
export const RESULT_CORRECT = 1;
export const RESULT_WRONG = 2;
export const RESULT_TIMEOUT = 3;

export function getInitialState(settings) {
  // console.log(settings);
  return {
    result: RESULT_NONE,
    expression: "",
    mathResult: "",
    progressPercentage: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    finalTime: 0,
    seconds: parseInt(settings.answerTimeout),
    waitTime: parseInt(settings.waitTime),
    averageScore: 50,
    yourScore: 0,
    waiting: true,
    enableSound: settings.enableSound === "true",
    enableControl: settings.enableControl === "true",
    availableConditions: settings.availableConditions,
    currentConditionIndex: 0,
    currentCondition: Object.keys(settings.availableConditions)[0],
    currentConditionTime: parseInt(Object.values(settings.availableConditions)[0]),
    difficulty: parseInt(settings.difficulty),
  };
}

export function mainReducer(state, action) {
  switch (action.type) {
    case "userInput": {
      if (state.waiting) {
        //Do not accept user input when waiting
        return state;
      }
      if (state.mathResult === action.input) {
        return {
          ...state,
          waiting: true,
          result: RESULT_CORRECT,
          correctAnswers: state.correctAnswers + 1,
          totalAnswers: state.totalAnswers + 1,
          averageScore: Math.floor(Math.random() * 50 + 25),
          yourScore: Math.floor(((state.correctAnswers + 1) / (state.totalAnswers + 1)) * 100),
        };
      } else {
        return {
          ...state,
          waiting: true,
          result: RESULT_WRONG,
          incorrectAnswers: state.incorrectAnswers + 1,
          totalAnswers: state.totalAnswers + 1,
          averageScore: Math.floor(Math.random() * 50 + 25),
          yourScore: Math.floor((state.correctAnswers / (state.totalAnswers + 1)) * 100),
        };
      }
    }
    case "timeout": {
      return {
        ...state,
        waiting: true,
        result: RESULT_TIMEOUT,
        incorrectAnswers: state.incorrectAnswers + 1,
        totalAnswers: state.totalAnswers + 1,
        averageScore: Math.floor(Math.random() * 50 + 25),
        yourScore: Math.floor((state.correctAnswers / (state.totalAnswers + 1)) * 100),
      };
    }
    case "newQuestion": {
      const finalTime = new Date();
      finalTime.setSeconds(finalTime.getSeconds() + state.seconds);
      const [expression, result] = mathGenerator(state.difficulty);

      return {
        ...state,
        waiting: false,
        expression: expression,
        mathResult: result,
        progressPercentage: 0,
        finalTime: finalTime,
        result: RESULT_NONE,
      };
    }
    case "updateProgressPercentage": {
      return {
        ...state,
        progressPercentage: 100 - ((state.finalTime - new Date()) / (state.seconds * 1000)) * 100,
      };
    }
    case "newCondition": {
      const finalTime = new Date();
      finalTime.setSeconds(finalTime.getSeconds() + state.seconds);
      const [expression, result] = mathGenerator();
      return {
        ...state,
        currentConditionIndex: state.currentConditionIndex + 1,
        currentCondition: Object.keys(state.availableConditions)[state.currentConditionIndex + 1],
        currentConditionTime: Object.values(state.availableConditions)[state.currentConditionIndex + 1],
        waiting: false,
        expression: expression,
        mathResult: result,
        finalTime: finalTime,
        result: RESULT_NONE,
        progressPercentage: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        totalAnswers: 0,
        yourScore: 0,
      };
    }
    default: {
      return state;
    }
  }
}
