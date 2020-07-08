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
    finalQuestionTime: 0,
    seconds: settings.answerTimeout,
    waitTime: settings.waitTime,
    averageScore: 50,
    yourScore: 0,
    waiting: true,
    enableSound: settings.enableSound,
    isControl: settings.isControl,
    testTotalTime: settings.testTotalTime,
    difficulty: settings.difficulty,
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

    case "firstQuestion": {
      const finalQuestionTime = new Date();
      finalQuestionTime.setSeconds(finalQuestionTime.getSeconds() + state.seconds);
      const mathQuestions = mathGenerator(state.difficulty);
      const expression = mathQuestions[0][0];
      const result = mathQuestions[0][1];
      let counter = 1;
      return {
        ...state,
        waiting: false,
        expression: expression,
        mathResult: result,
        progressPercentage: 0,
        finalQuestionTime: finalQuestionTime,
        result: RESULT_NONE,
        mathQuestions: mathQuestions,
        counter: counter,
      };
    }

    case "newQuestion": {
      const finalQuestionTime = new Date();
      finalQuestionTime.setSeconds(finalQuestionTime.getSeconds() + state.seconds);
      const expression = state.mathQuestions[state.counter][0];
      const result = state.mathQuestions[state.counter][1];
      return {
        ...state,
        waiting: false,
        expression: expression,
        mathResult: result,
        progressPercentage: 0,
        finalQuestionTime: finalQuestionTime,
        result: RESULT_NONE,
        counter: state.counter + 1,
      };
    }
    case "updateProgressPercentage": {
      return {
        ...state,
        progressPercentage: 100 - ((state.finalQuestionTime - new Date()) / (state.seconds * 1000)) * 100,
      };
    }
    default: {
      return state;
    }
  }
}
